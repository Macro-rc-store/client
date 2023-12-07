/* eslint-disable no-unused-vars */
import AccountService from "@/services/account";

export async function changePassword({commit}, params) {
  const {data} = await AccountService.changePassword(params);
  return data;
}

export async function getInfo({commit}) {
  const {data} = await AccountService.getInfo();
  return data;
}