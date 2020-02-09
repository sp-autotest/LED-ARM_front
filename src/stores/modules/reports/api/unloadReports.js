import Vue from 'vue';

export default (data) => {
    console.log(data);
    return Vue.Api.Get(process.env.VUE_APP_ROOT_API + `api/get_link_report_api?company_id=${data.company_id}&start_date=${data.start_date}&end_date=${data.end_date}`);
};
