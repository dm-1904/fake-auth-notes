import { Type } from "./types";

const API_URL = "http://localhost:3000";

export const registerUser = ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<Type> => {
  return fetch(`${API_URL}/app-users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
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
};
