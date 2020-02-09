import * as mutation_types from "./mutation_types";

export default {
    [mutation_types.M_MENU_SHOW](state) {
        state.menuShow = !state.menuShow;
    },
};
