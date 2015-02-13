/*jshint node:true */


function routeListSort(fileA, fileB) {
    var aMatches = fileA.match(/\:/g) || [],
        bMatches = fileB.match(/\:/g) || [];

    return aMatches.length - bMatches.length;
}
module.exports  = routeListSort;
