import Vue from 'vue';

export default (payload) => {
    let page = payload.page;
    let bypage = payload.bypage;
    return Vue.Api.Get(`${process.env.VUE_APP_ROOT_API}api/passengers/search?page=${page}&bypage=${bypage}`);
};
