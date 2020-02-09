import Vue from 'vue';

export default (data) => {
    return Vue.Api.Get(process.env.VUE_APP_ROOT_API + `api/search_passenger_api?query=${data.text}&page=${data.page}&limit=${data.bypage}`);
};
