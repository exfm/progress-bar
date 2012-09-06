"use strict";

function createNewProgressBar(opts){
    var back = document.createElement('div');
    back.setAttribute('id', 'back');
    back.style.width = '200px';
    var front = document.createElement('div');
    front.setAttribute('id', 'front');
    var thumb = document.createElement('div');
    thumb.setAttribute('id', 'thumb');
    var count = document.createElement('div');
    count.setAttribute('id', 'count');
    var duration = document.createElement('div');
    duration.setAttribute('id', 'duration');
    var a = new Audio();
    a.setAttribute('id', 'the_audio');
    var pb = new ProgressBar({
        'back': back,
        'front': front,
        'thumb': thumb,
        'count': count,
        'duration': duration,
        'audio': a,
        'loadingClass': 'customLoadingClass',
        'hideClass': 'customHideClass'
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
    it("should set 'audio' option to instance 'audio' var", function(){
        var pb = createNewProgressBar();
        assert.equal(pb.audio.id, 'the_audio');
    });
    it("should set width to size of back element", function(){
        var pb = createNewProgressBar();
        assert.equal(pb.width, 200);
    });
    it("should set left to left position of back element", function(){
        var pb = createNewProgressBar();
        assert.equal(pb.left, 0);
    });
    it("should set right to width + left position of back element", function(){
        var pb = createNewProgressBar();
        assert.equal(pb.right, 200);
    });
    it("should set loadingClass to option passed in", function(){
        var pb = createNewProgressBar();
        assert.equal(pb.loadingClass, 'customLoadingClass');
    });
    it("should set hideClass to option passed in", function(){
        var pb = createNewProgressBar();
        assert.equal(pb.hideClass, 'customHideClass');
    });
    it("should set thumb to correct position based on audio currentTime", function(done){
        var pb = createNewProgressBar();
        assert.equal(pb.thumb.style.left, '');
        pb.audio.volume = 0;
        pb.audio.src = 'music/test0.mp3';
        pb.audio.load();
        pb.audio.addEventListener(
            'canplay',
            function(){
                assert.equal(pb.thumb.style.left, '25px');
                pb.audio.currentTime = 5;
                done();
            }
        )
        pb.audio.play();    
    });
});