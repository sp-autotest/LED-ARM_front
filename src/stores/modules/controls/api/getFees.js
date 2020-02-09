import Vue from 'vue';

export default () => {
    return Vue.Api.Get(`${process.env.VUE_APP_ROOT_API}api/add_type_fee_api`);
};
