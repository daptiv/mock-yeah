/*jshint node:true */


function routeListSort(file) {
    var matches = file.match(/\:/g);
    if (matches) {
        return matches.length;
    }
    else {
        return 0;
    }
}
module.exports  = routeListSort;
