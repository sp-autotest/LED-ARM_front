import * as types from "./types";
import * as mutation_types from "./mutation_types";
import {
    ServiceSearch,
    GetBcTypes,
    GetManagers,
    GetCountries,
    Booking,
    Crane,
    PrintPayment,
    SavePassenger,
} from "./api/methods";

export default {
    [types.A_SEARCH_CRANE](context, payload) {
        return new Promise((resolve, reject) => {
            Crane(payload.crane)
                .then(res => {
                    console.log(res);
                    let newArr = [];
                    if (res.data.data.request.tiketway == "ROUND_TRIP") { //crane rt
                        if (res.data.data.result[1].length > 1 && res.data.data.result[0].length > 1) { //crane return to - many and back - many
                            for (let i = 0; i < res.data.data.result[0].length; i++) {
                                for (let j = 0; j < res.data.data.result[1].length; j++) {
                                    let a = new Date(res.data.data.result[0][i].arrivalDateTime.value).getTime();
                                    let b = new Date(res.data.data.result[1][j].departureDateTime.value).getTime();
                                    if (((b - a) / 100 * 12) > 0) {
                                        newArr.push(
                                            {
                                                tuda: {
                                                    ...res.data.data.result[0][i]
                                                },
                                                obratno: {
                                                    ...res.data.data.result[1][j]
                                                }
                                            })
                                    }
                                }
                            }
                        } else if (res.data.data.result[0].length) { //crane return to - many and back - one
                            for (let i = 0; i < res.data.data.result[0].length; i++) {
                                newArr.push(
                                    {
                                        tuda: {
                                            ...res.data.data.result[0][i]
                                        },
                                        obratno: {
                                            ...res.data.data.result[1]
                                        }
                                    })
                            }
                        } else if (res.data.data.result[1].length) { //crane return to - one and back - many
                            for (let i = 0; i < res.data.data.result[1].length; i++) {
                                newArr.push(
                                    {
                                        tuda: {
                                            ...res.data.data.result[0]
                                        },
                                        obratno: {
                                            ...res.data.data.result[1][i]
                                        }
                                    })
                            }
                        }else { //crane return to - one and back - one
                            newArr.push(
                                {
                                    tuda: {
                                        ...res.data.data.result[0]
                                    },
                                    obratno: {
                                        ...res.data.data.result[1]
                                    }
                                })
                        }
                    } else { //crane ow
                        if (res.data.data.result.length > 1) {
                            console.log(111);
                            let key = Object.keys(res.data.data.result)
                            for (let i = 0; i < res.data.data.result.length; i++) {
                                newArr.push({
                                    tuda: {
                                        ...res.data.data.result[i]
                                    }
                                });
                            }
                        } else {
                            newArr.push({
                                tuda: {
                                    ...res.data.data.result[0]
                                }
                            });
                        }
                    }
                    context.commit(mutation_types.M_SEARCH_CRANE, newArr);
                    console.log(newArr);
                    resolve(newArr)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    [types.A_SEARCH](context, payload) {
        console.log(payload)
        return new Promise((resolve, reject) => {
            if (payload.multisegment) {
                let newArr = [];
                let result = [];
                for (let j = 0; j < payload.data.length; j++) {
                    ServiceSearch(payload.data)
                        .then(res => {
                            if (typeof res.data.segments[0][j] != 'undefined') {
                                newArr.push({
                                    tuda: {
                                        ...res.data.segments[0][j],
                                        ...{size_fees_inscribed: res.data.fee.size_fees_inscribed}
                                    }
                                });
                                result.push(res.data.segments)
                            }
                        })
                }
                context.commit(mutation_types.M_SEARCH_MULTISEGMENT, newArr);
                resolve(result)
            }else {
                ServiceSearch(payload.data)
                    .then(res => {
                        console.log(res)
                        let newArr = [];
                        for (let i = 0; i < res.data.segments.length; i++) {
                            if (typeof res.data.segments[i][1] != "undefined") {
                                newArr.push(
                                    {
                                        tuda: {
                                            ...res.data.segments[i][0],
                                            ...{size_fees_inscribed: res.data.fee.size_fees_inscribed}
                                        },
                                        obratno: {
                                            ...res.data.segments[i][1]
                                        }
                                    }
                                )
                            } else {
                                if(payload.data.length != 2) {
                                    console.log(res.data)
                                    console.log("res.data")
                                    if(res.data.fee) {
                                        newArr.push({
                                            tuda: {
                                                ...res.data.segments[0][0],
                                                ...{size_fees_inscribed: res.data.fee.size_fees_inscribed}
                                            }
                                        });
                                    } else {
                                        newArr.push({
                                            tuda: {
                                                ...res.data.segments[0][0],
                                            }
                                        });
                                    }

                                }
                            }
                        }
                        context.commit(mutation_types.M_SEARCH, newArr);
                        console.log(res.data.fee.size_fees_inscribed);
                        console.log(payload.data);
                        console.log(newArr);
                        resolve(res.data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            }
        })
    },
    [types.A_GET_BCTYPES](context, payload) {
        return new Promise((resolve) => {
            GetBcTypes().then(res => {
                context.commit(mutation_types.M_GET_BCTYPES, res.data.bctypes);
                resolve(res.data.bctypes)
            })
        })
    },
    [types.A_SAVE_BOOKING_DATA](context, payload) {
        return new Promise((resolve) => {
            context.commit(mutation_types.M_SAVE_BOOKING_DATA, payload);
            resolve(payload)
        })
    },
    [types.A_GET_MANAGERS](context, payload) {
        return new Promise((resolve) => {
            GetManagers().then(res => {
                context.commit(mutation_types.M_GET_MANAGERS, res.data);
                resolve(res.data)
            })
        })
    },
    [types.A_GET_COUNTRIES](context, payload) {
        return new Promise((resolve) => {
            GetCountries().then(res => {
                context.commit(mutation_types.M_GET_COUNTRIES, res.data);
                resolve(res.data)
            })
        })
    },
    [types.A_SAVE_SEND_DATA](context, payload) {
        return new Promise((resolve) => {
            let flight = []
            if (payload.flightData2){
                flight.push({flight_id: payload.flightData.id});
                flight.push({flight_id: payload.flightData2});
            } else{
                flight.push({flight_id: payload.flightData.id});
            }
            let data = {
                data: payload,
                flight: flight
            }
            context.commit(mutation_types.M_SAVE_SEND_DATA, data);
            resolve(payload);
        })
    },

    [types.A_SAVE_SEND_DATA_CRANE](context, payload) {
        return new Promise((resolve) => {
            context.commit(mutation_types.M_SAVE_SEND_DATA_CRANE, payload);
            resolve(payload);
        })
    },

    [types.A_SAVE_SEND_DATA_COMPANY](context, payload) {
        return new Promise((resolve) => {
            context.commit(mutation_types.M_SAVE_SEND_DATA_COMPANY, payload);
            resolve(payload);
        })
    },
    [types.A_SAVE_SEND_DATA_PASSENGERS](context, payload) {
        return new Promise((resolve) => {
            context.commit(mutation_types.M_SAVE_SEND_DATA_PASSENGERS, payload);
            resolve(payload);
        })
    },
    [types.A_BOOKING](context, payload) {
        return new Promise((resolve) => {
            Booking(payload).then(res => {
                context.commit(mutation_types.M_BOOKING, res.data);
                resolve(res.data)
            })
        })
    },
    [types.A_CREATE_SHOW_MORE](context, payload) {
        context.commit(mutation_types.M_CREATE_SHOW_MORE, payload);
    },
    [types.A_CHANGE_SHOW_MORE](context, payload) {
        context.commit(mutation_types.M_CHANGE_SHOW_MORE, payload);
    },
    [types.A_CHANGE_SHOW_MORE_CRANE](context, payload) {
        context.commit(mutation_types.M_CHANGE_SHOW_MORE_CRANE, payload);
    },
    [types.A_CLEAR_SEARCH_RESULT](context, payload) {
        context.commit(mutation_types.M_CLEAR_SEARCH_RESULT, payload);
    },
    [types.A_PRINT_PAYMENT](context, payload) {
        return new Promise((resolve) => {
            PrintPayment(payload).then(res => {
                // context.commit(mutation_types.M_BOOKING, res.data);
                resolve(res)
            })
        })
    },
    [types.SAVE_PASSENGER](context, payload) {
        return new Promise((resolve) => {
            SavePassenger(payload).then(res => {
                resolve(res)
            })
        })
    },
};
