import Promise from 'promise';
import axios from 'axios';
import Auth from '@/stores/modules/auth/state';

const ApiAdapter = {

    install(Vue) {
        Vue.Axios = axios.create({
            timeout: 60000
        });

        Vue.Api = {
            token: null,
        };

        /**
         * Check Auth Token
         */

        Vue.Axios.interceptors.response.use(
            function (response) {
                if (response.headers != undefined && response.headers.hasOwnProperty('Cookie')) {
                    Vue.Api.token = response.headers['Cookie'];
                }

                return response;
            },

            function (error) {
                return Promise.reject(error);
            }
        );

        /**
         * Set Auth Token if Exists
         */

        Vue.Axios.interceptors.request.use(
            function(config) {
                let token = localStorage.getItem("token")
                if (
                    token != undefined &&
                    token != null &&
                    token != ""
                ) {
                    config.headers["Authorization"] = "Bearer " + token;
                    // config.headers["Accept"] = "application/json";
                } else {
                    config.headers["Authorization"] = "Bearer  " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNTQwNDE2NDc2fQ==.41b1525e7f3aec40e41f731a81a1046efc88aa6b14c4e347d0f238a8b2789b68';
                }

                return config;
            },
            function(error) {
                return Promise.reject(error);
            }
        );


        // Vue.Axios.interceptors.request.use(function (config) {
        //
        //     if (Auth.token != undefined && Auth.token != null && Auth.token != "") {
        //         config.headers['Cookie'] = 'XSRF-TOKEN ' + Auth.token;
        //     }
        //
        //     return config;
        //
        // }, function (error) {
        //     return Promise.reject(error);
        // });

        /**
         * Parse HTTP Responses
         * @param response
         * @param resolve
         * @param reject
         * @private
         */

        Vue.Api.__ParseResponse = function (response, resolve, reject) {
            if (response != undefined && response != null && response.hasOwnProperty('status')
                && (response.status == 200 || response.status == 201 || response.status == 204)) {

                var adapter = {
                    status: response.status,
                    status_message: response.statusText,
                    data: response.data
                };

                resolve(adapter);
            } else {
                reject(response);
            }
        };

        /**
         * GET HTTP Request
         * @param endpoint
         * @param o
         * @param headers
         * @constructor
         */
        Vue.Api.Get = function (endpoint, o, headers) {
            return new Promise((resolve, reject) => {

                var data = {};
                if (o != undefined) data.params = o;
                if (headers != undefined) data.headers = headers;

                Vue.Axios.get(endpoint, data)
                    .then(function (response) {
                        Vue.Api.__ParseResponse(response, resolve, reject);
                    }, (error) => {
                        console.log("ERROR GET");
                        Vue.Api.__ParseResponse(error.response, resolve, reject);
                    })
                    .catch(function (error) {
                        console.log("CATCH GET");
                        Vue.Api.__ParseResponse(error.response, resolve, reject);
                    });
            });
        };

        /**
         * POST HTTP Request
         * @param endpoint
         * @param body
         * @param opt
         * @constructor
         */
        Vue.Api.Post = function (endpoint, body, opt) {
            return new Promise((resolve, reject) => {
                Vue.Axios.post(endpoint, body, opt)
                    .then((response) => {
                        Vue.Api.__ParseResponse(response, resolve, reject);
                    }, (error) => {
                        Vue.Api.__ParseResponse(error.response, resolve, reject);
                    })
                    .catch((error) => {
                        Vue.Api.__ParseResponse(error.response, resolve, reject);
                    });
            });
        };

        /**
         * PUT HTTP Request
         * @param endpoint
         * @param body
         * @param opt
         * @constructor
         */
        Vue.Api.Put = function (endpoint, body, opt) {
            return new Promise((resolve, reject) => {
                Vue.Axios.put(endpoint, body, opt)
                    .then((response) => {
                        Vue.Api.__ParseResponse(response, resolve, reject);
                    }, (error) => {
                        Vue.Api.__ParseResponse(error.response, resolve, reject);
                    })
                    .catch((error) => {
                        Vue.Api.__ParseResponse(error.response, resolve, reject);
                    });
            });
        };
    }
}

export default ApiAdapter;
