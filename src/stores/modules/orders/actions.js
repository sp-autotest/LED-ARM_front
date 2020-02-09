import * as types from "./types";
import * as mutation_types from "./mutation_types";
import {
    Orders,
    EditOrderStatus,
    ExchangeOrder,
    ExchangeOrderInfo,
} from "./api/methods";

export default {
    [types.A_ORDERS] (context, payload) {
        return new Promise((resolve) => {
            Orders(payload).then(res => {
                context.commit(mutation_types.M_ORDERS, res.data);
                resolve(res.data)
            })
        })
    },
    [types.A_ORDERS_CHANGE] (context, payload) {
        context.commit(mutation_types.M_PASSENGERS, payload);
    },
    [types.A_TO_ORDER] (context, payload) {
        let passenger = [];
        let helper = [] //check passenger duplicat
        payload.services.filter( val => {
            function getId(element) {
                return element == val.passenger.id;
            }
            if (!helper.some(getId)){
                helper.push(val.passenger.id)
                passenger.push(val.passenger)
            }
        })
        console.log(payload.services);
        console.log(passenger);
        context.commit(mutation_types.M_PASSENGERS, passenger);
        context.commit(mutation_types.M_TO_ORDER, payload)
    },
    [types.A_GLOBAL_SEARCH_SAVE] (context, payload) {
        context.commit(mutation_types.M_GLOBAL_SEARCH_SAVE, payload)
    },
    [types.A_ORDERS_RELOAD] (context, payload) {
        context.commit(mutation_types.M_ORDERS_RELOAD, payload)
    },
    [types.A_ORDER_STATUS] (context, payload) {
        return new Promise((resolve) => {
            EditOrderStatus(payload).then(res => {
                // context.commit(mutation_types.M_ORDERS, res.data);
                resolve(res)
            })
        })
    },
    [types.A_EXCHANGE_ORDER] (context, payload) {
        return new Promise((resolve) => {
            ExchangeOrder(payload).then(res => {
                // context.commit(mutation_types.M_ORDERS, res.data);
                resolve(res)
            })
        })
    },
    [types.A_EXCHANGE_ORDER_INFO] (context, payload) {
        return new Promise((resolve) => {
            ExchangeOrderInfo(payload).then(res => {
                resolve(res)
            })
        })
    },
};
