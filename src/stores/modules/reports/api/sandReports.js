import Vue from 'vue';

export default (data) => {
    return Vue.Api.Post(process.env.VUE_APP_ROOT_API + 'api/post_email_report_api', data);
};