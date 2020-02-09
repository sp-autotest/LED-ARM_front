import Vue from 'vue';

export default (data) => {
    let page = 1;
    let per_page = 5;
    if (data) {
        page = data.page;
        per_page = data.perPage;
    }
    console.log(data);
    return Vue.Api.Get(process.env.VUE_APP_ROOT_API + `api/find?type=order&field=${data.field}&q=${data.value}&limit=${per_page}&page=${page}`);
};
