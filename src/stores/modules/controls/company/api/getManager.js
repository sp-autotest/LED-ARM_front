import Vue from 'vue';

export default (id) => {
    return Vue.Api.Get(process.env.VUE_APP_ROOT_API + `api/users/byparent?id=${id}`);
};
