import Vue from 'vue';

export default (data) => {
    console.log(data);
    let page = data ? data.page : 1;
    let per_page = data ? data.per_page : 5;
    return Vue.Api.Get(process.env.VUE_APP_ROOT_API + `api/flights?page=${page}&limit=${per_page}`);
};
