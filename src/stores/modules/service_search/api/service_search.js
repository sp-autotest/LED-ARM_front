import Vue from 'vue';

export default (data) => {
    console.log(data);
    return Vue.Api.Post(process.env.VUE_APP_ROOT_API + 'api/flights/search', data);
};
