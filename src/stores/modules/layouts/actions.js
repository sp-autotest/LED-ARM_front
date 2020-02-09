import * as types from "./types";
import * as mutation_types from "./mutation_types";
import {GlobalSearch} from "./api/methods";

export default {
    [types.A_MENU_SHOW] ( context) {
        context.commit(mutation_types.M_MENU_SHOW)
    },
    [types.GLOBAL_SEARCH] (context, payload) {
        return new Promise((resolve) => {
            GlobalSearch(payload).then(res => {
                resolve(res)
            })
        })
    },
};
