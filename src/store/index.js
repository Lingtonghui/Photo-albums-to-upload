import Vue from "vue";
import Vuex from "vuex";
import { apiLogin, apiGetPhotos } from "../api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || "",
    photos: []
  },
  mutations: {
    login(state, payload) {
      state.token = payload.token;
      // console.log(state.token,'token');
      localStorage.setItem("token", state.token);
    },
    updatePhotos(state, payload) {
      state.photos = payload.photos;
    }
  },
  actions: {
    async login({ commit }, payload) {
      const { username, password } = payload;
      const res = await apiLogin({ username, password });
      const token = res.data.data.token;
      commit("login", { token });
    },

    async updatePhotos({ commit }) {
      const res = await apiGetPhotos();
      commit("updatePhotos", {
        photos: res.data.data.photos
      });
    }
  },
  modules: {}
});
