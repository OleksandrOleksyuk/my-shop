import { AuthState } from "@/services/auth/useAuth";

export const selectAuthError = (state: AuthState) => state.error;
export const selectAuthToken = (state: AuthState) => state.token;
export const selectAuthIsLogged = (state: AuthState) => state.isLogged;
