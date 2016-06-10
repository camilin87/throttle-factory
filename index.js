var limit = require("simple-rate-limiter");

module.exports = function(reqCount, msInterval){
    function executeCallback(callback){
        callback();
    }

    var throttledExecutor = limit(executeCallback)
        .to(reqCount)
        .per(msInterval);

    return {
        execute: function(callback){
            throttledExecutor(callback);
        }
    };
};