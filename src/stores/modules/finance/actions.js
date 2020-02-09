import * as types from "./types";
import * as mutation_types from "./mutation_types";
import {
    GetFinance,
    GetPayment,
    GetInvoices,
    SetBill,
    SetPayment,
} from "./api/methods";

export default {
    [types.A_GET_FINANCE] (context) {
        return new Promise((resolve) => {
            GetFinance().then(res => {
                resolve(res)
            })
        })
    },
    [types.A_GET_PAYMENT] (context, payload) {
        return new Promise((resolve) => {
            GetPayment(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.A_GET_INVOICES] (context, payload) {
        return new Promise((resolve) => {
            GetInvoices(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.A_SET_BILL] (context, payload) {
        return new Promise((resolve) => {
            SetBill(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.A_SET_PAYMENTS] (context, payload) {
        return new Promise((resolve) => {
            SetPayment(payload).then(res => {
                resolve(res)
            })
        })
    },
};
