var rfr = require("rfr");
var throttleFactory = rfr("index");
var async = require("async");

describe("throttleFactory", function(){
    var throttle = null;
    var SMALL_WAIT = 10;
    var TIME_LIMIT = 100;

    beforeEach(function(){
        throttle = throttleFactory(10, TIME_LIMIT);
    });
    
    function smallWait(callback){
        setTimeout(function(){
            callback();
        }, SMALL_WAIT);
    }

    function insert(n, p){
        for (var i = 0; i < n; i++) {
            throttle.execute(() => {
                p.executionCount++;
            });
        }
    }

    it("executes the callback once per invocation and waits", function(done){
        var p = {executionCount: 0};

        insert(3, p);

        smallWait(function(){
            expect(p.executionCount).toBe(3);

            insert(4, p);

            smallWait(function(){
                expect(p.executionCount).toBe(7);

                done();
            });
        });
    });

    it("blocks requests over the limit", function(done){
        var p = {executionCount: 0};

        insert(15, p);

        smallWait(function(){
            expect(p.executionCount).toBe(10);

            done();
        });
    });

    it("throttles requests", function(done){
        var p = {executionCount: 0};

        insert(15, p);

        smallWait(function(){
            expect(p.executionCount).toBe(10);

            insert(4, p);

            smallWait(function(){
                expect(p.executionCount).toBe(10);

                setTimeout(function(){
                    expect(p.executionCount).toBe(19);

                    done();
                }, TIME_LIMIT);
            });
        });
    });
});