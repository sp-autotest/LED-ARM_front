import Vue from 'vue';

export default (data) => {
    let page = data.page;
    let per_page = data.per_page;
    return Vue.Api.Get(process.env.VUE_APP_ROOT_API + `api/blocksorders_api?page=${page}&limit=${per_page}`);
};
