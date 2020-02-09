import * as types from "./types";
import * as mutation_types from "./mutation_types";
import {
    GetCompany,
    AddCompany,
    EditCompany,
    GetManager,
    GetEmployees,
    GetGroups,
    AddEmployess,
    GetHistory,
    EditCountPlaces,
    EditEmployees,
    GetPhoto,
    AddEmail,
    GetEmails,
    SavePhoto,
    RemoveEmail,
    DeletePhoto,
    MailingStatusChange
} from "./api/methods";

export default {
    [types.A_GET_COMPANY] (context, payload) {
        return new Promise((resolve) => {
            GetCompany(payload).then(res => {
                resolve(res)
                context.commit(mutation_types.M_GET_COMPANY, res.data.companies);
            })
        })
    },
    [types.A_SET_CURRENT_COMPANY] (context, payload) {
        context.commit(mutation_types.M_SET_CURRENT_COMPANY, payload);
    },
    [types.A_ADD_COMPANY] (context, payload) {
        return new Promise((resolve) => {
            AddCompany(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.A_EDIT_COMPANY] (context, payload) {
        return new Promise((resolve) => {
            EditCompany(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.A_GET_MANAGERS] (context, payload) {
        return new Promise((resolve) => {
            GetManager(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.A_GET_EMPLOYEES] (context) {
        return new Promise((resolve) => {
            GetEmployees().then(res => {
                resolve(res)
            })
        })
    },
    [types.A_GET_GROUPS] (context) {
        return new Promise((resolve) => {
            GetGroups().then(res => {
                resolve(res)
            })
        })
    },
    [types.A_ADD_EMPLOYEES] (context, payload) {
        return new Promise((resolve) => {
            AddEmployess(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.A_GET_HISTORY] (context, payload) {
        return new Promise((resolve) => {
            GetHistory(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.A_EDIT_COUNT_PLACES] (context, payload) {
        return new Promise((resolve) => {
            EditCountPlaces(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.A_EDIT_EMPLOYEES] (context, payload) {
        return new Promise((resolve) => {
            EditEmployees(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.A_GET_PHOTO] (context, payload) {
        return new Promise((resolve) => {
            GetPhoto(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.A_ADD_EMAIL] (context, payload) {
        return new Promise((resolve) => {
            AddEmail(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.GET_EMAILS] (context) {
        return new Promise((resolve) => {
            GetEmails().then(res => {
                resolve(res)
            })
        })
    },
    [types.A_SAVE_PHOTO] (context, payload) {
        return new Promise((resolve) => {
            SavePhoto(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.REMOVE_EMAILS] (context, payload) {
        return new Promise((resolve) => {
            RemoveEmail(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.A_DELETE_PHOTO] (context, payload) {
        return new Promise((resolve) => {
            DeletePhoto(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.A_SET_CURRENT_EMPLOYEES] (context, payload) {
        context.commit(mutation_types.M_SET_CURRENT_EMPLOYEES, payload);
    },
    [types.A_MAILING_STATUS_CHANGE] (context, payload) {
        return new Promise((resolve) => {
            MailingStatusChange(payload).then(res => {
                resolve(res)
            })
        })
    },
};
