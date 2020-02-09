import * as types from "./types";
import * as mutation_types from "./mutation_types";
import {
    GetReports,
    SandReports,
    FormReports,
    UnloadReports,
} from "./api/methods";

export default {
    [types.A_GET_REPORTS] (context) {
        return new Promise((resolve) => {
            GetReports().then(res => {
                resolve(res)
            })
        })
    },
    [types.A_FORM_REPORTS] (context, payload) {
        return new Promise((resolve) => {
            FormReports(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.A_SAND_REPORTS] (context, payload) {
        return new Promise((resolve) => {
            SandReports(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.A_UNLOAD_REPORTS] (context, payload) {
        return new Promise((resolve) => {
            UnloadReports(payload).then(res => {
                resolve(res)
            })
        })
    },
};
