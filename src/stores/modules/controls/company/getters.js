
export default {
    getMenuShow: (state) => {
        return state.menuShow;
    },
    getCompaniesLength: (state) => {
        if(state.companies) {
            return state.companies.length
        }else{
            return 0
        }
    },
    getCompanies: (state) => (item) => {
        let arr = [];
        if(state.companies) {
            state.companies.forEach((val, key) => {
                if (item.page == 1){
                    if(key >= (item.page * item.rowsPerPage - item.rowsPerPage) && key < (item.page * item.rowsPerPage)) {
                        arr.push(val);
                    }
                }else {
                    if(key >= (item.page * item.rowsPerPage - item.rowsPerPage) && key <= (item.page * item.rowsPerPage)) {
                        arr.push(val);
                    }
                }
            });
        }
        return arr;
    },
    getCompaniesList: (state) => {
        let arr = [];
        if(state.companies) {
            state.companies.forEach((val) => {
                arr.push({
                    name: val.company_name,
                    id: val.id
                })
            });
        }
        return arr;
    },
    getCurrentCompanyId: (state) => {
        return state.current_company.id;
    },
    getCurrentCompany: (state) => {
        return state.current_company;
    },
    getCurrentEmployees: (state) => {
        return state.current_employees;
    },
    getEmployeesValidationStatus: (state) => {
        return state.employees_validation;
    }
}