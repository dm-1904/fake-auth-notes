import { useContext } from "react";
import { ItemContext } from "./ItemContextProvider";

export const useItems = () => useContext(ItemContext);
