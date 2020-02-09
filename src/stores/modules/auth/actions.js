import * as types from "./types";
import * as mutation_types from "./mutation_types";
import {Sign_In} from "./api/methods";

export default {
    [types.A_LOGIN] ( context, payload ) {
        return new Promise((resolve, reject) => {
            Sign_In(payload).then(res => {
                localStorage.setItem('token', res.data.success.token)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                context.commit(mutation_types.M_LOGIN_SUCCESS, res.data);
                resolve(res);
            })
        })
    },
    [types.A_LOGOUT] (context) {
        context.commit(mutation_types.M_LOGOUT);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
};
