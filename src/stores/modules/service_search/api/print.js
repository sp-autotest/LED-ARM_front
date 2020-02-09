import Vue from 'vue';

export default (data) => {
    return Vue.Api.Get(process.env.VUE_APP_ROOT_API + `api/account/generate?summ=${data.summ}&count=${data.count}`, {responseType: 'arraybuffer'});
};
