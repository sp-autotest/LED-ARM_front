export  default {
    getfeesData: (state) => {
        return state.fees;
    },
    getOrder: (state) => {
        return state.current_order;
    },
    getOrders: (state) => {
        return state.orders;
    },
    getPassengers: (state) => {
        return state.passengers;
    },
    getCompanies: (state) => {
        return (state.orders) ? state.orders.companies : [];
    },
    getFeesById: (state) => (id) => {
        if(state.fees) {
            let data = {};
            state.fees.feesplaces.filter((val) => {
                if(val.id == id) {
                    data = val;
                }
            });
            return data;
        } else {
            return {};
        }
    },
    getGlobalSearch: (state) => {
        return state.global_search;
    },
    getReload: (state) => {
        return state.orders_reload;
    },
    getOrderId: (state) => {
        return state.current_order.id;
    },
}