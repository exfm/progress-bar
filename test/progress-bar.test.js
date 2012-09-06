"use strict";

function createNewProgressBar(opts){
    var back = document.createElement('div');
    back.setAttribute('id', 'back');
    var front = document.createElement('div');
    front.setAttribute('id', 'front');
    var thumb = document.createElement('div');
    thumb.setAttribute('id', 'thumb');
    var count = document.createElement('div');
    count.setAttribute('id', 'count');
    var duration = document.createElement('div');
    duration.setAttribute('id', 'duration');
    var pb = new ProgressBar({
        'back': back,
        'front': front,
        'thumb': thumb,
        'count': count,
        'duration': duration
    });
    return pb;
}

describe("progress-bar", function(){
    it("should create a new progressbar with passed in elements as options", function(){
        var pb = createNewProgressBar();
        assert.equal(pb.back, '<div></div>');
    });
    it("should set 'back' option to instance 'back' var", function(){
        var pb = createNewProgressBar();
        assert.equal(pb.back.id, 'back');
    });
    it("should set 'front' option to instance 'front' var", function(){
        var pb = createNewProgressBar();
        assert.equal(pb.front.id, 'front');
    });
    it("should set 'thumb' option to instance 'thumb' var", function(){
        var pb = createNewProgressBar();
        assert.equal(pb.thumb.id, 'thumb');
    });
    it("should set 'count' option to instance 'count' var", function(){
        var pb = createNewProgressBar();
        assert.equal(pb.count.id, 'count');
    });
    it("should set 'duration' option to instance 'duration' var", function(){
        var pb = createNewProgressBar();
        assert.equal(pb.duration.id, 'duration');
    });
});