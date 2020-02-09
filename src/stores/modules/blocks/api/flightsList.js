import Vue from 'vue';

export default (id) => {
    return Vue.Api.Post(process.env.VUE_APP_ROOT_API + 'api/flights/generate/' + id );
};
