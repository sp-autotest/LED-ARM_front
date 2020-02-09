export  default {
    getSearchData: (state) => (item) => {
        let arr = [];
        if(state.search_result) {
            state.search_result.forEach((val, key) => {
                if(key > (item - 10) && key <= item) {
                    arr.push(val);
                }
            });
        }
        return state.search_result;
    },
    getSearchDataCrane: (state) => (item) => {
        let arr = [];
        if(state.search_result_crane) {
            state.search_result_crane.forEach((val, key) => {
                if(key > (item - 10) && key <= item) {
                    arr.push(val);
                }
            });
        }
        return arr;
    },
    getSearchResultOneWay: (state) => {
      return state.search_result
    },
    getSearchResultMultiSegment: (state) => {
      return state.search_result_multisegment
    },
    getSearchResultLength: (state) => (val) => {
        if(state.search_result && val == 'ow') {
            return state.search_result.length
        } else if (val == 'multisegment') {
            return state.search_result_multisegment.length
        }else{
            return 0
        }
    },
    getBookingData: (state) => {
        return state.booking_data;
    },
    getShowMoreData: (state) => {
        return state.show_more;
    },
    getShowMoreDataCrane: (state) => {
        return state.show_more_crane;
    },
    getShowMoreDataById: (state) => (id) => {
        return state.show_more[id];
    },
    getSendData: (state) => {
        return state.sendData;
    },
    getBcTypes: (state) => (id) => {
        if(state.bc_types) {
            let data = {};
            state.bc_types.filter((val) => {
                if(val.id == id) {
                    data = val;
                }
            });
            return data;
        } else {
            return {};
        }
    },
    getServiceSearchCraneLength: (state) => {
        if (state.search_result_crane) {
            return state.search_result_crane.length
        } else {
            return 0
        }
    },
}