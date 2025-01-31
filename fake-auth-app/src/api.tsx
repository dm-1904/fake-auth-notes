import { Type } from "./types";

export type RequestType = {
  fetchAllItems: () => Promise<Type[]>;
  postItem: (note: Omit<Type, "id">) => Promise<Type>;
  deleteItem: (id: number) => Promise<void>;
  patchItem: (id: number, updatedItem: Partial<Type>) => Promise<Type | null>;
};

const API_URL = "http://localhost:3000";

export const Requests = {
  // should return a promise with all info in the database
  fetchAllItems: () => {
    return fetch(`${API_URL}/types`)
      .then((res) => {
        if (res.ok) {
          return res.json() as Promise<Type[]>;
        }
        throw new Error(`HTTP Request failed with status ${res.status}`);
      })
      .catch((error: Error) => {
        console.error("Error fetching items", error);
        throw new Error(
          `Fetching all items failed with error: ${error.message}`
        );
      });
  },
  // should create an item in the database from a partial item object
  // and return a promise with the result
  postItem: (note: Omit<Type, "id">) => {
    return fetch(`${API_URL}/types`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`HTTP POST failed with status ${res.status}`);
      })
      .catch((error: Error) => {
        console.error("Error posting item", error);
        throw new Error(`Posting item failed with error: ${error.message}`);
      });
  },
  // should delete an item from the database
  deleteItem: (id: number): Promise<void> => {
    return fetch(`${API_URL}/item/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to delete item with status ${res.status}`);
        }
      })
      .catch((error: Error) => {
        console.error("Error deleting item", error);
        throw new Error(`Deleting item failed with error: ${error.message}`);
      });
  },
  patchItem: (id: number, updatedItem: Partial<Type>): Promise<Type | null> => {
    return fetch(`${API_URL}/item/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    })
      .then((res) => {
        if (res.ok) {
          return res.json() as Promise<Type>;
        }
        throw new Error(`Failed to PATCH item with status ${res.status}`);
      })
      .catch((error) => {
        console.error("Error patching item", error);
        throw new Error(`Failed to PATCH item with error: ${error.message}`);
      });
  },
};
