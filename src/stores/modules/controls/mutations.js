import * as mutation_types from "./mutation_types";

export default {
    [mutation_types.M_FEES]( state, payload ) {
        state.fees = payload;
    },
    [mutation_types.M_ADD_FEES]( state, payload ) {
        state.fees.push(payload);
    },
    [mutation_types.M_EDIT_FEES]( state, payload ) {
        state.fees.feesplaces.filter((val, key) => {
          if(val.id == payload.id) {
              state.fees.feesplaces[key] = payload;
          }
        })
    },

    [mutation_types.M_PASSENGER]( state, payload ) {
        state.passenger = payload
    },
    [mutation_types.M_PASSENGER_EDIT]( state, payload ) {
        state.passenger_edit = payload
    },
    [mutation_types.M_PROVIDER]( state, payload ) {
        state.provider = payload.data.providers
    },
    [mutation_types.M_PROVIDER_ACCOUNT]( state, payload ) {
        state.provider_accounts = payload.data.provider_accounts
    },
    [mutation_types.M_AIRLINES]( state, payload ) {
        state.airlines = payload.data.airlines
    },
    [mutation_types.M_BC_TYPE]( state, payload ) {
        state.bc_type = payload.data.bctypes
    },
    [mutation_types.M_COUNTRY_CITY_AIRPORT]( state, payload ) {
        state.controls_countries = payload.countries
        state.controls_cities = payload.cities
        state.controls_airports = payload.airports
    },
    [mutation_types.M_FARE_FAMILY]( state, payload ) {
        state.service_class = payload.data.farefamilies.data
    },
    [mutation_types.M_SET_CURRENT_FEES]( state, payload ) {
        state.current_fees = payload
    },
};
