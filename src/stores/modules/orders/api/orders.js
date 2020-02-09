import Vue from 'vue';

export default (data) => {
    let page = 1;
    let per_page = 5;
    if (data) {
        page = data.page;
        per_page = data.perPage;
    }
    return Vue.Api.Get(process.env.VUE_APP_ROOT_API + `api/orders/all?page=${page}&limit=${per_page}`);
};
