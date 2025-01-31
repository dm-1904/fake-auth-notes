import { createContext, ReactNode, useEffect, useState } from "react";
import { ActiveTab, Type } from "./types";
import { Requests } from "./api";
import toast from "react-hot-toast";

type TItemContext = {
  allItems: Type[];
  setAllItems: (itemsList: Type[]) => void;
  activeTab: ActiveTab;
  setActiveTab: (name: ActiveTab) => void;
  isLoading: boolean;
  setIsLoading: (arg: boolean) => void;
  handleTabChange: (tab: ActiveTab) => void;
  fetchAndSetAllItems: () => Promise<void>;
  handleCreateItem: (itemData: Partial<Type>) => Promise<Type>;
  itemsList: Record<ActiveTab, Type[]>;
  handleTrashClick: (id: string) => void;
  handleFavoriteClick: (id: string, isFavorite: boolean) => Promise<void>;
};

export const ItemContext = createContext({} as TItemContext);
const { fetchAllItems, postItem, deleteItem, patchItem } = Requests;

export const ItemsProvider = ({ children }: { children: ReactNode }) => {
  const [allItems, setAllItems] = useState<Type[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAndSetAllItems = async () => {
    return fetchAllItems().then((items) => {
      setAllItems(items);
    });
  };

  useEffect(() => {
    fetchAndSetAllItems().catch((error) => {
      console.error("Failed to fetch items:", error);
    });
  }, []);

  const handleTabChange = (tabName: ActiveTab) => {
    const newTabValue = activeTab === tabName ? "all" : tabName;
    setActiveTab(newTabValue);
  };

  const handleCreateItem = (itemData: Partial<Type>) => {
    const { name, password } = itemData;
    setIsLoading(true);
    const newItem = {
      name,
      password,
    };
    return postItem(newItem as Omit<Type, "id">)
      .then(async (data: Type) => {
        await fetchAndSetAllItems().catch((error) => {
          console.error("Failed to fetch and set all items:", error);
        });
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        toast.success(`✅ ${name} has been added! `);
        return data;
      })
      .catch((error) => {
        toast.error(`🚫 Something went wrong 🚫`);
        throw error;
      })
      .finally(() => setIsLoading(false));
  };

  const handleFavoriteClick = async (
    id: string,
    isFavorite: boolean
  ): Promise<void> => {
    const item = allItems.find((item) => item.id === Number(id));
    if (!item) return;

    const updatedItem = { ...item, isFavorite };

    try {
      await patchItem(item.id, updatedItem);
      await fetchAndSetAllItems();
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  const handleTrashClick = (id: string): void => {
    try {
      deleteItem(Number(id))
        .then(() => fetchAndSetAllItems())
        .catch((error) => {
          console.error("Failed to delete item:", error);
        });
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const itemsList: Record<ActiveTab, Type[]> = {
    all: allItems,
    createItem: [],
    favorited: [],
    unfavorited: [],
  };

  return (
    <ItemContext.Provider
      value={{
        allItems,
        setAllItems,
        activeTab,
        setActiveTab,
        handleTabChange,
        isLoading,
        setIsLoading,
        fetchAndSetAllItems,
        handleCreateItem,
        itemsList,
        handleTrashClick,
        handleFavoriteClick,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
