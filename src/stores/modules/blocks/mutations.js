import * as mutation_types from "./mutation_types";

export default {
    [mutation_types.M_BLOCKS]( state, payload ) {
        state.blocks = payload;
    },
    [mutation_types.M_ADD_BLOCKS]( state, payload ) {
        state.blocks.push(payload.place);
    },
    [mutation_types.M_EDIT_BLOCKS]( state, payload ) {
        state.blocks.filter((val, key) => {
            if(val.id == payload.id) {
                state.blocks[key] = payload;
            }
        })
    },
    [mutation_types.M_COMPANIES](state, payload) {
        state.airlines = payload
    },
    [mutation_types.M_ADD_SCHEDULE]( state, payload ) {
        state.schedule.push(payload.place);
    },
    [mutation_types.M_EDIT_SCHEDULE]( state, payload ) {
        state.blocks.schedules.filter((val, key) => {
            if(val.id == payload.schedules.id) {
                state.blocks.schedules[key] = payload.schedules;
            }
        })
    },
    [mutation_types.M_GENERATE_BLOCK]( state, payload ) {
        state.generate_block = payload;
    },
    [mutation_types.M_CURRENCIES]( state, payload ) {
        state.currencies = payload;
    },
    [mutation_types.M_SET_CURRENT_ORDER]( state, payload ) {
        state.current_order = payload;
    },
};
