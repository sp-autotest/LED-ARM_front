import * as mutation_types from "./mutation_types";

export default {
    [mutation_types.M_MENU_SHOW](state) {
        state.menuShow = !state.menuShow;
    },
    [mutation_types.M_GET_COMPANY](state, payload) {
        state.companies = payload;
    },
    [mutation_types.M_SET_CURRENT_COMPANY](state, payload) {
        state.current_company = payload;
    },
    [mutation_types.M_SET_CURRENT_EMPLOYEES](state, payload) {
        state.current_employees = payload;
    },
};
