import * as types from "./types";
import * as mutation_types from "./mutation_types";
import {
    AddFees,
    Fees,
    EditFees,
    GetCities,
    Passenger,
    PassengerEdit,
    PassengerSearch,
    Airlines,
    AddAirlines,
    EditAirlines,
    CCA,
    Provider,
    AddProvider,
    EditProvider,
    ProviderAccount,
    AddProviderAccount,
    EditProviderAccount,
    BCType,
    AddBCType,
    EditBCType,
    AddCurrency,
    EditCurrency,
    FareFamily,
    AddServiceClass,
    EditServiceClass,
    CountryCityAirport,
    AddCountry,
    EditCountry,
    AddCity,
    EditCity,
    AddAirport,
    EditAirport,
    EditTimeLimit,
    GetFees,
    AddFeesControls,
    EsitFeesControls,
} from "./api/methods";

export default {
    [types.A_FEES] (context, payload) {
        return new Promise((resolve) => {
            Fees(payload).then(res => {
                context.commit(mutation_types.M_FEES, res.data);
                resolve(res.data)
            })
        })
    },
    [types.A_ADD_FEES] (context, payload) {
        return new Promise((resolve, reject) => {
            AddFees(payload).then(res => {
                resolve(res)
                console.log(res)
                context.commit(mutation_types.M_ADD_FEES, res.data);
            })
        })
    },
    [types.A_EDIT_FEES] (context, payload) {
        return new Promise(function(resolve, reject) {
            EditFees(payload).then(res => {
                if(res.status == 200) {
                    context.commit(mutation_types.M_EDIT_FEES, res.data.feesplace);
                    resolve(true);
                } else {
                    reject(false);
                }
            })
        })
    },
    [types.A_GET_CITIES] (context, payload) {
        return new Promise(function(resolve, reject) {
            GetCities(payload).then(res => {
                if(res.status == 200) {
                    resolve(res);
                }
            })
        })
    },

    [types.A_PASSENGER] (context, payload) {
        return new Promise((resolve) => {
            Passenger(payload).then(res => {
                context.commit(mutation_types.M_PASSENGER, res);
                resolve(res)
            })
        })
    },
    [types.A_PASSENGER_EDIT] (context, payload) {
        context.commit(mutation_types.M_PASSENGER_EDIT, payload);
    },
    [types.A_PASSENGERS_ADD_EDIT] (context, payload) {
        return new Promise((resolve) => {
            PassengerEdit(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.A_PASSENGER_SEARCH] (context, payload) {
        return new Promise((resolve) => {
            PassengerSearch(payload).then(res => {
                resolve(res)
            })
        })
    },

    [types.A_AIRLINES] (context, payload) {
        return new Promise((resolve) => {
            Airlines().then(res => {
                context.commit(mutation_types.M_AIRLINES, res);
                resolve(res)
            })
        })
    },

    [types.A_ADD_AIRLINES] (context, payload) {
        return new Promise((resolve) => {
            AddAirlines(payload).then(res => {
                resolve(res)
            })
        })
    },

    [types.A_EDIT_AIRLINES] (context, payload) {
        return new Promise((resolve) => {
            EditAirlines(payload).then(res => {
                resolve(res)
            })
        })
    },

    [types.A_CCA] (context, payload) {
        return new Promise((resolve) => {
            CCA(payload).then(res => {
                // context.commit(mutation_types.M_PASSENGER, res);
                resolve(res)
            })
        })
    },

    [types.A_PROVIDER] (context, payload) {
        return new Promise((resolve) => {
            Provider().then(res => {
                context.commit(mutation_types.M_PROVIDER, res);
                resolve(res)
            })
        })
    },

    [types.A_ADD_PROVIDER] (context, payload) {
        return new Promise((resolve) => {
            AddProvider(payload).then(res => {
                // context.commit(mutation_types.M_PASSENGER, res);
                resolve(res)
            })
        })
    },

    [types.A_EDIT_PROVIDER] (context, payload) {
        return new Promise((resolve) => {
            EditProvider(payload).then(res => {
                // context.commit(mutation_types.M_PASSENGER, res);
                resolve(res)
            })
        })
    },

    [types.A_PROVIDER_ACCOUNT] (context, payload) {
        return new Promise((resolve) => {
            ProviderAccount(payload).then(res => {
                context.commit(mutation_types.M_PROVIDER_ACCOUNT, res);
                resolve(res)
            })
        })
    },

    [types.A_ADD_PROVIDER_ACCOUNT] (context, payload) {
        return new Promise((resolve) => {
            AddProviderAccount(payload).then(res => {
                resolve(res)
            })
        })
    },

    [types.A_EDIT_PROVIDER_ACCOUNT] (context, payload) {
        return new Promise((resolve) => {
            EditProviderAccount(payload).then(res => {
                resolve(res)
            })
        })
    },

    [types.A_BC_TYPE] (context, payload) {
        return new Promise((resolve) => {
            BCType().then(res => {
                context.commit(mutation_types.M_BC_TYPE, res);
                resolve(res)
            })
        })
    },

    [types.A_ADD_BC_TYPE] (context, payload) {
        return new Promise((resolve) => {
            AddBCType(payload).then(res => {
                // context.commit(mutation_types.M_PASSENGER, res);
                resolve(res)
            })
        })
    },

    [types.A_EDIT_BC_TYPE] (context, payload) {
        return new Promise((resolve) => {
            EditBCType(payload).then(res => {
                resolve(res)
            })
        })
    },

    [types.A_ADD_CURRENCY] (context, payload) {
        return new Promise((resolve) => {
            AddCurrency(payload).then(res => {
                // context.commit(mutation_types.M_PASSENGER, res);
                resolve(res)
            })
        })
    },

    [types.A_EDIT_CURRENCY] (context, payload) {
        return new Promise((resolve) => {
            EditCurrency(payload).then(res => {
                // context.commit(mutation_types.M_PASSENGER, res);
                resolve(res)
            })
        })
    },

    [types.A_FARE_FAMILY] (context, payload) {
        return new Promise((resolve) => {
            FareFamily().then(res => {
                context.commit(mutation_types.M_FARE_FAMILY, res);
                resolve(res)
            })
        })
    },

    [types.A_ADD_SERVICE_CLASS] (context, payload) {
        return new Promise((resolve) => {
            AddServiceClass(payload).then(res => {
                resolve(res)
            })
        })
    },

    [types.A_EDIT_SERVICE_CLASS] (context, payload) {
        return new Promise((resolve) => {
            EditServiceClass(payload).then(res => {
                resolve(res)
            })
        })
    },

    [types.A_COUNTRY_CITY_AIRPORT] (context, payload) {
        return new Promise((resolve) => {
            CountryCityAirport().then(res => {
                context.commit(mutation_types.M_COUNTRY_CITY_AIRPORT, res.data.return);
                resolve(res.data.return)
            })
        })
    },

    [types.A_ADD_COUNTRY] (context, payload) {
        return new Promise((resolve) => {
            AddCountry(payload).then(res => {
                // context.commit(mutation_types.M_COUNTRY_CITY_AIRPORT, res.data.return);
                resolve(res)
            })
        })
    },

    [types.A_EDIT_COUNTRY] (context, payload) {
        return new Promise((resolve) => {
            EditCountry(payload).then(res => {
                // context.commit(mutation_types.M_COUNTRY_CITY_AIRPORT, res.data.return);
                resolve(res)
            })
        })
    },

    [types.A_ADD_CITY] (context, payload) {
        return new Promise((resolve) => {
            AddCity(payload).then(res => {
                resolve(res)
            })
        })
    },

    [types.A_EDIT_CITY] (context, payload) {
        return new Promise((resolve) => {
            EditCity(payload).then(res => {
                resolve(res)
            })
        })
    },

    [types.A_ADD_AIRPORT] (context, payload) {
        return new Promise((resolve) => {
            AddAirport(payload).then(res => {
                resolve(res)
            })
        })
    },

    [types.A_EDIT_AIRPORT] (context, payload) {
        return new Promise((resolve) => {
            EditAirport(payload).then(res => {
                resolve(res)
            })
        })
    },

    [types.EDIT_TIME_LIMIT] (context, payload) {
        return new Promise((resolve) => {
            EditTimeLimit(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.A_GET_FEES] (context) {
        return new Promise((resolve) => {
            GetFees().then(res => {
                resolve(res)
            })
        })
    },
    [types.A_ADD_FEES_CONTROLS] (context, payload) {
        return new Promise((resolve) => {
            AddFeesControls(payload).then(res => {
                resolve(res)
            })
        })
    },
    [types.A_SET_CURRENT_FEES] (context, payload) {
        context.commit(mutation_types.M_SET_CURRENT_FEES, payload)
    },
    [types.A_EDIT_FEES_CONTROLS] (context, payload) {
        return new Promise((resolve) => {
            EsitFeesControls(payload).then(res => {
                resolve(res)
            })
        })
    },

};
