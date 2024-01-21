import { SET_BALANCE } from "./types"

const state = {
    balance: 0
}

const mutations = {
    [SET_BALANCE](state, accoutInfo) {
        const { balance } = accoutInfo;
        state.balance = balance;
    }
}

import * as actions from "./actions"
import * as getters from "./getters"

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}