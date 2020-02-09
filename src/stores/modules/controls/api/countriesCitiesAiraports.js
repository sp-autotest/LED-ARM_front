import Vue from 'vue';

export default (payload) => {
    let page = payload.page;
    let bypage = payload.bypage;
    return Vue.Api.Get(`http://test-redchain.ru:80/api/passengers/search?page=${page}&bypage=${bypage}`);
};
