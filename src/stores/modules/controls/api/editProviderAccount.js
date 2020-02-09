import Vue from 'vue';

export default (data) => {
    return Vue.Api.Post(process.env.VUE_APP_ROOT_API + 'api/provider_account_edit_api',data);
};
