import { SET_SESSION, REMOVE_SESSION } from "./types";
import AuthServices from "@/services/auth"

export async function removeSession({commit}) {
  commit(REMOVE_SESSION);
}

export async function login({commit}, params) {
  const data = AuthServices.login(params);
  commit(SET_SESSION, data);
  return data;
}