import { SET_SESSION, REMOVE_SESSION } from "./types";
import AuthServices from "@/services/auth"

export async function removeSession({commit}) {
  commit(REMOVE_SESSION);
}

export async function login({commit}, params) {
  const {data} = await AuthServices.login(params);
  const token = data.data.token;
  commit(SET_SESSION, token);
  return data;
}

// eslint-disable-next-line no-unused-vars
export async function register({commit}, params) {
  const {data} = await AuthServices.register(params);
  return data;
}