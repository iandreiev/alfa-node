import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import VueAxios from "vue-axios"
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)
Vue.use(VueAxios, axios);

Vue.axios.defaults.baseURL = "http://localhost:4000/"

export default new Vuex.Store({
    state:{
        user:{},
        auth: false
    },
    actions:{},
    mutations:{
        SAVE_USER(state,user){
            state.user = user
            state.auth = true
        },
        LOGOUT(state){
            state.user = []
            state.auth = false
        }
    },
    modules:{},
    plugins: [createPersistedState()]
})