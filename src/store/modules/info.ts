import type { Module, Store } from 'vuex'
import { IRootState } from '@/store'
import { getUserInfo, UserInfoType } from '@/http/modules'
import { delCookie, getCookie } from '@/common/utils'
import { isEmptyObj } from '@/common/is'

export interface InfoState {
  user: UserInfoType
}

const info: Module<InfoState, IRootState> = {
  namespaced: true,
  state: {
    user: {} as UserInfoType
  },
  mutations: {
    SET_USER: (state, user: UserInfoType) => {
      state.user = user
    }
  },
  actions: {
    async getUser({ dispatch }) {
      if (getCookie('token')) {
        const { code, data } = await getUserInfo()
        if (code === 10000) {
          dispatch('setUser', data.user_info)
        }
      }
    },
    setUser({ commit }, data = {}) {
      commit('SET_USER', data)
    },
    logout({ dispatch }) {
      delCookie({ name: 'token' })
      dispatch('setUser')
    }
  },
  getters: {
    user: (state) => state.user,
    isLogin: (state) => !isEmptyObj(state.user)
  }
}
export default info

export type InfoStore<S = InfoState> = Store<S>
