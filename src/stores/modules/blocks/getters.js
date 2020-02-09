export  default {
    getBlocks: (state) => {
        return (state.blocks) ? state.blocks.schedules : [];
    },
    getAirlines(state) {
        return state.airlines;
    },
    getCurrencyById: (state) => (id) => {
        if(state.currencies) {
            let data = {};
            state.currencies.filter((val) => {
                if(val.id == id) {
                    data = val;
                }
            });
            return data;
        } else {
            return {};
        }
    },
    getBlockById: (state) => (id) => {
        if(state.blocks) {
            let data = {};
            state.blocks.places.filter((val) => {
                if(val.id == id) {
                    data = val;
                }
            });
            return data;
        } else {
            return {};
        }
    },
    getScheduleById: (state) => (id) => {
        if(state.blocks) {
            let data = {};
            state.blocks.schedules.filter((val) => {
                if(val.id == id) {
                    data = val;
                }
            });
            return data;
        } else {
            return {};
        }
    },
    getCurrentOrder: (state) => {
        return state.current_order
    },
}