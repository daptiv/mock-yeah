/*jshint node:true */


function routeListSort(file) {
    if (file.match(/\:/)) {
        return 1;
    }
    else {
        return 0;
    }
}
module.exports  = routeListSort;
