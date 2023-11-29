import AccountService from "@/services/account";

// eslint-disable-next-line no-unused-vars
export async function changePassword({commit}, params) {
  const {data} = await AccountService.changePassword(params);
  return data;
}