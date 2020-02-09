import Vue from 'vue';

export default (data) => {
    let value = data.value
    return Vue.Api.Post(process.env.VUE_APP_ROOT_API + 'api/flights/edit/' + data.id, value);
};
