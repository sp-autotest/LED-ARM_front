import * as mutation_types from "./mutation_types";

export default {
    [mutation_types.M_ORDERS]( state, payload ) {
        state.orders = payload;
    },
    [mutation_types.M_PASSENGERS]( state, payload ) {
        state.passengers = payload;
    },
    [mutation_types.M_TO_ORDER]( state, payload ) {
        state.current_order = payload;
    },
    [mutation_types.M_GLOBAL_SEARCH_SAVE]( state, payload ) {
        state.global_search.data = payload.data.data;
        state.global_search.field = payload.field;
        state.global_search.value = payload.value;
    },
    [mutation_types.M_ORDERS_RELOAD]( state, payload ) {
        state.orders_reload = payload
    },
};
