/* eslint-disable no-unused-vars */
import AccountService from "@/services/account";
import { SET_BALANCE } from "./types";

export async function changePassword({commit}, params) {
  const {data} = await AccountService.changePassword(params);
  return data;
}

export async function getInfo({commit}) {
  const {data} = await AccountService.getInfo();
  const accoutInfo = data.data;
  commit(SET_BALANCE, accoutInfo);
  return data;
}