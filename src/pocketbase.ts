import Pocketase from "pocketbase";

export const pb = new Pocketase(import.meta.env.VITE_POCKET_BASE_URL);
