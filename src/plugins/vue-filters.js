import Vue from 'vue';

Vue.filter('timeNumber', function (value) {
    if (value == 0) {
        return "00:00";
    } else if (value > 0 && value < 10) {
        return "00:0"+value+"";
    } else if (value >= 10 && value < 60){
        return "00:"+value;
    } else if (value >= 60) {
        let hour = Math.floor(value/60);
        let minute = parseInt(value%60);
        minute < 10 ? minute = "0"+minute : minute
        if (hour < 10){
            return "0"+hour+":"+minute;
        }else if (hour >= 10){
            return hour+":"+minute;
        }
    }
});

Vue.filter('lineEmptiness', function (value) {
    if (value == '' || value == undefined || value == null) {
        return "-";
    }else {
        return value;
    }
});

Vue.filter('numberToFixed2', function (value) {
    return parseFloat(value).toFixed(2);
});

Vue.filter('correctString', function (value) {
    if (value != undefined && value != null && value != ""){
        let string = value.toLowerCase().split('');
        string[0] = string[0].toUpperCase();
        let newValue = string.join('');

        return newValue;
    } else {
        return value;
    }
});

Vue.filter('lowerCase', function (value) {
    return value.toLowerCase();
});

Vue.filter('lowerCase', function (value) {
    return value.toLowerCase();
});

Vue.filter('substr5', function (value) {
    return value.substr(0, 5);
});

Vue.filter('substrLastThreeItem', function (value) {
    let arr = value.split('');
    delete arr[arr.length - 1];
    delete arr[arr.length - 2];
    delete arr[arr.length - 3];
    return arr.join('')
});

Vue.filter('stringFirstWord', function (value) {
    if (value){
        let result = value.split(' ');
        return result[0]
    }
    return '-'
});
