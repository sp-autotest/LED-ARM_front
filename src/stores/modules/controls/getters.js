export  default {
    getfeesData: (state) => {
        return state.fees;
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
    getPassengerEdite: (state) => {
        return state.passenger_edit
    },
    getProvider: (state) => {
        return state.provider
    },
    getProviderById: (state) => (id) => {
        if(state.provider) {
            let data = {};
            state.provider.filter((val) => {
                if(val.id == id) {
                    data = val;
                }
            });
            return data;
        } else {
            return {};
        }
    },
    getAirlineById: (state) => (id) => {
        if(state.airlines) {
            let data = {};
            state.airlines.filter((val) => {
                if(val.id == id) {
                    data = val;
                }
            });
            return data;
        } else {
            return {};
        }
    },
    getBCTypeById: (state) => (id) => {
        if(state.bc_type) {
            let data = {};
            console.log(state);
            state.bc_type.filter((val) => {
                if(val.id == id) {
                    data = val;
                }
            });
            return data;
        } else {
            return {};
        }
    },
    getProviderAccountById: (state) => (id) => {
        if(state.provider_accounts) {
            let data = {};
            state.provider_accounts.filter((val) => {
                if(val.id == id) {
                    data = val;
                }
            });
            return data;
        } else {
            return {};
        }
    },
    getCountryById: (state) => (id) => {
        if(state.controls_countries) {
            let data = {};
            state.controls_countries.filter((val) => {
                if(val.id == id) {
                    data = val;
                }
            });
            return data;
        } else {
            return {};
        }
    },
    getServiceClassById: (state) => (id) => {
        if(state.service_class) {
            let data = {};
            state.service_class.filter((val) => {
                if(val.id == id) {
                    data = val;
                }
            });
            return data;
        } else {
            return {};
        }
    },
    getCityById: (state) => (id) => {
        if(state.controls_cities) {
            let data = {};
            state.controls_cities.filter((val) => {
                if(val.id == id) {
                    data = val;
                }
            });
            return data;
        } else {
            return {};
        }
    },
    getAirportById: (state) => (id) => {
        if(state.controls_airports) {
            let data = {};
            state.controls_airports.filter((val) => {
                if(val.id == id) {
                    data = val;
                }
            });
            return data;
        } else {
            return {};
        }
    },
    getCurrentFees: (state) => {
        return state.current_fees
    },
}