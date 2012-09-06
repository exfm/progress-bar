(function(){

"use strict";

function ProgressBar(opts){

    // class added to hide elements
    this.hideClass = 'display_none';
    
    // pixel offset to reset thumb position
    this.thumbLeftStart = 25;
    
    // pixel offset when moving thumb
    this.frontLeftStart = 3;
    
    // css class to add to progress bar when in loading state
    this.loadingClass = "loading";

    $.extend(this, opts);
        
    if(this.playQueue){
        this.audio = this.playQueue.audio;
    }
    
    // boolean if user is seeking or not
    this.isSeeking = false;
    
    this.addListeners();
    this.setSizes();
    
}

// add listeners
ProgressBar.prototype.addListeners = function(){
    if(this.back){
        $(this.back).bind(
            'click', 
            $.proxy(this, 'click')
        );
    }
    if(this.front){
        $(this.front).bind(
            'click', 
            $.proxy(this, 'click'
        ));
    }
    if(this.thumb){
        $(this.thumb).bind(
            'mousedown', 
            $.proxy(this, 'mouseDown')
        );
        $(this.thumb).bind(
            'mouseup', 
            $.proxy(this, 'mouseUp')
        );
    }
    if(this.playQueue){
        this.playQueue.addEventListener(
            'loading', 
            this.onLoading.bind(this), 
            false
        );
        this.playQueue.addEventListener(
            'playing', 
            this.onPlaying.bind(this), 
            false
        );
    }
    else{
        if(this.audio){
            this.audio.addEventListener(
                'loadstart', 
                this.onLoading.bind(this), 
                false
            );
            this.audio.addEventListener(
                'canplay', 
                this.onPlaying.bind(this), 
                false
            );
        }
    }
    if(this.audio){
        this.audio.addEventListener(
            'timeupdate', 
            this.onTimeUpdate.bind(this), 
            false
        );
        this.audio.addEventListener(
            'durationchange', 
            this.onDurationChange.bind(this), 
            false
        );
        this.audio.addEventListener(
            'seeking', 
            this.onSeeking.bind(this), 
            false
        );
        this.audio.addEventListener(
            'seeked', 
            this.onSeeked.bind(this), 
            false
        );
    }
    $(window).bind(
        'resize', 
        $.proxy(this, 'setSizes')
    );
}

// calculate widths
ProgressBar.prototype.setSizes = function(){
    if(this.back){
        this.width = $(this.back).width();
        this.left = $(this.back).offset().left;
        this.right = this.left + this.width;
    }
}

// reset everything to default 
ProgressBar.prototype.reset = function(){
    $(this.thumb).addClass(this.hideClass);
    $(this.thumb).css('left', this.thumbLeftStart);
    $(this.front).addClass(this.hideClass);
    $(this.front).css('width', 0);
    $(this.count).text("0:00");
    $(this.duration).text("0:00");
}

// onLoading event, reset times, reset thumb and front, add loading class to back
ProgressBar.prototype.onLoading = function(e){
    this.reset()
    $(this.back).addClass(this.loadingClass);
}

// onPlaying event. show thumb and front, remove loading class from back 
ProgressBar.prototype.onPlaying = function(e){
    $(this.thumb).removeClass(this.hideClass);
    $(this.front).removeClass(this.hideClass);
    $(this.back).removeClass(this.loadingClass);
}

// onTimeUpdate event. Update count and duration. Set width on front. Move thumb.
ProgressBar.prototype.onTimeUpdate = function(e){
    $(this.count).text(Utils.MMSS(Math.floor(e.target.currentTime)));
    if(!isNaN(e.target.duration)){
        $(this.duration).text(Utils.MMSS(Math.floor(e.target.duration)));
    } 
    else{
        $(this.duration).text('...');
    } 
    var percentage = e.target.currentTime / e.target.duration;
    if(this.isSeeking == false) {
     if((this.width * percentage) > 0){
        $(this.thumb).css('left', this.width * percentage +this.thumbLeftStart);
     }
     $(this.front).css('width', this.width * percentage + this.frontLeftStart);
    }
}

// onDurationChange event. Update duration. 
ProgressBar.prototype.onDurationChange = function(e){
    if(!isNaN(e.target.duration)){
        $(this.duration).text(Utils.MMSS(Math.floor(e.target.duration)));
    }
}

// onSeeking event, add loading class to back
ProgressBar.prototype.onSeeking = function(e){
    $(this.back).addClass(this.loadingClass);
}

// onSeeked event, remove loading class to back
ProgressBar.prototype.onSeeked = function(e){
    $(this.back).removeClass(this.loadingClass);
}

// mouseDown on thumb listener
ProgressBar.prototype.mouseDown = function(e){
    $(document).bind(
        'mousemove', 
        $.proxy(this, 'mouseMove')
    );
    $(document).bind(
        'mouseup', 
        $.proxy(this, 'mouseUp')
    );
    this.isSeeking = true;
    e.preventDefault();
}

// mouseMove on thumb listener
ProgressBar.prototype.mouseMove = function(e){
    var x = e.clientX;
    if(x < this.left){
        x = this.left;
    }
    if(x > this.right){
        x = this.right;
    }
    this.seekLeft = x - this.left;
    $(this.thumb).css("left", this.seekLeft + this.thumbLeftStart);
    $(this.front).css("width", this.seekLeft + this.frontLeftStart);
}

// mouseUp on thumb listener
ProgressBar.prototype.mouseUp = function(e){
    $(document).unbind(
        'mousemove', 
        $.proxy(this, 'mouseMove')
    );
    $(document).unbind(
        'mouseup', 
        $.proxy(this, 'mouseUp')
    );
    this.isSeeking = false;
    var percentage = this.seekLeft / this.width;
    $(this).trigger(
        {
            'type': "seek", 
            'percentage': percentage
        }
    );
    if(this.playQueue){
        this.playQueue.seek(percentage);
    }
}

// click on front and back listener
ProgressBar.prototype.click = function(e){
    this.mouseMove(e);
    var percentage = this.seekLeft / this.width;
    $(this).trigger(
        {
            'type': "seek", 
            'percentage': percentage
        }
    );
    if(this.playQueue){
        this.playQueue.seek(percentage);
    }
}

// check if we've got require
if(typeof module !== "undefined"){
    module.exports = ProgressBar;
}
else{
    window.ProgressBar = ProgressBar;
}

}()); // end wrapper