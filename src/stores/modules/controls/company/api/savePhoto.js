import Vue from 'vue';
import axios from "axios"

export default (data) => {
    console.log(Vue.Axios)
    return Vue.Api.Post(
        process.env.VUE_APP_ROOT_API + `api/company/settings/advertising/save`,
        data,
        {"Content-Type": "multipart/form-data"});
};
