import * as types from "./types";
import * as mutation_types from "./mutation_types";
import {
    GetConversations,
    GetMessages,
    SendMessage,
    GetUsers,
    CreateConversation,
} from "./api/methods";

export default {
    [types.A_GET_CONVERSATIONS] (context) {
        return new Promise((resolve) => {
            GetConversations().then(res => {
                resolve(res)
            })
        })
    },
    [types.A_GET_MESSAGES] (context, payload) {
        return new Promise((resolve) => {
            GetMessages(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.A_SEND_MESSAGES] (context, payload) {
        return new Promise((resolve) => {
            SendMessage(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.A_GET_USERS] (context) {
        return new Promise((resolve) => {
            GetUsers().then(res => {
                resolve(res)
            })
        })
    },
    [types.A_CREATE_CONVERSATION] (context, payload) {
        return new Promise((resolve) => {
            CreateConversation(payload).then(res => {
                resolve(res)
            })
        })
    },
};
