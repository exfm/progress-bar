# progress-bar

This handles common functionality with an audio progress bar such as
updating current time position, duration, progress bar position, 
loading indicator and seeking.


## Install

    npm install progress-bar

## Testing

    git clone 
    npm install
    open test/index.html
    
## Usage

    var ProgressBar = require('progress-bar'),
        pb = new ProgressBar(
            {
                'back': backEl,
                'front': frontEl,
                'thumb': thumbEl,
                'count': countEl,
                'duration': durationEl
            }
        );

