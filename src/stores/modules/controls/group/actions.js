import * as types from "./types";
import * as mutation_types from "./mutation_types";
import {
    GetGroup,
    GetPermission,
    addGroup,
    deleteGroup,
    GetPermissionByGroup,
    permissionUpdate,
} from "./api/methods";

export default {
    [types.A_GET_GROUP] (context) {
        return new Promise((resolve) => {
            GetGroup().then(res => {
                resolve(res)
            })
        })
    },
    [types.A_GET_PERMISSION] (context) {
        return new Promise((resolve) => {
            GetPermission().then(res => {
                resolve(res)
            })
        })
    },
    [types.A_ADD_GROUP] (context, payload) {
        return new Promise((resolve) => {
            addGroup(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.A_DELETE_GROUP] (context, payload) {
        return new Promise((resolve) => {
            deleteGroup(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.A_GETPERMISSION_BY_GROUP] (context, payload) {
        return new Promise((resolve) => {
            GetPermissionByGroup(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.A_UPDATE_PERMISSION] (context, payload) {
        return new Promise((resolve) => {
            permissionUpdate(payload).then(res => {
                resolve(res)
            })
        })
    }
};
