import * as mutation_types from "./mutation_types";

export default {
    [mutation_types.M_LOGIN_SUCCESS](state, payload) {
        state.token = payload.success.token;
        state.user = payload.user;
        state.isAuthenticated = true;
        localStorage.setItem("isAuthenticated", true);
    },
    [mutation_types.M_LOGOUT](state) {
        state.isAuthenticated = false;
        localStorage.removeItem("isAuthenticated");
    },
};
