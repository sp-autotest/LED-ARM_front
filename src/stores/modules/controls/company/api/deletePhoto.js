import Vue from 'vue';

export default (data) => {
    return Vue.Api.Post(process.env.VUE_APP_ROOT_API + `api/company/settings/advertising/delete`, data);
};