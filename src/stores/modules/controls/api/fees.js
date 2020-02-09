import Vue from 'vue';

export default (data) => {
    if(data != undefined) {
        return Vue.Api.Get(process.env.VUE_APP_ROOT_API + `api/feesplaces?company=${data}`);
    } else {
        return Vue.Api.Get(process.env.VUE_APP_ROOT_API + `api/feesplaces`);
    }
};
