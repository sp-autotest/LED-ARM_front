import * as types from "./types";
import * as mutation_types from "./mutation_types";

export default {
    [types.A_SET_LANG] ( context, payload ) {
        context.commit(mutation_types.M_SET_LANG, payload);
    },
    [types.A_SET_KEY] ( context ) {
        context.commit(mutation_types.M_SET_KEY);
    },
};
