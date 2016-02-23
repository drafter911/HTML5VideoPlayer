var $ = require('jquery');

$(document).ready(function () {

    var video = $('#custom-video'),
        container = $('#video-player'),
        playBtn = $('#play-pause'),
        muteBtn = $('#mute'),
        fullScreenBtn = $('#full-screen'),
        seek = $('#seek-bar'),
        volume = $('#volume-bar'),
        volumeValue = volume.value,
        progressbar = $('#progress-bar'),
        bufferbar = $('#bufferbar');

    if (video[0].autoplay) {
        playBtn.toggleClass('video-autoplay video');
    }
    video.on('playing', () => seek.addClass('light'));

    if (video[0].muted) {
        muteBtn.find('.speaker-mute').removeClass('hidden');
    } else {
        muteBtn.find('.speaker-mute').addClass('hidden');
    }

    var togglePlayPause = () => {
        if (video[0].paused) {
            video[0].play();
            playBtn.find('.pause').removeClass('hidden');
            playBtn.find('.play').addClass('hidden');
        }
        else {
            video[0].pause();
            playBtn.find('.play').removeClass('hidden');
            playBtn.find('.pause').addClass('hidden');
            seek.removeClass('light');
        }
    };

    var isFullscreen = false;

    var toggleFullScreen = () => {
        if (!isFullscreen) {
            if (video[0].requestFullscreen) {
                video[0].requestFullscreen();
            }
            else if (video[0].mozRequestFullScreen) {
                container[0].mozRequestFullScreen();
            }
            else if (video[0].webkitRequestFullscreen) {
                video[0].webkitRequestFullscreen();
            }
            isFullscreen = true;
            fullScreenBtn.find('.corner').addClass('minimize');
            $('#custom-controls').addClass('fool-screen');
        }
        else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
            isFullscreen = false;
            fullScreenBtn.find('.corner').removeClass('minimize');
            $('#custom-controls').removeClass('fool-screen');
        }
    };

    playBtn.on('click', togglePlayPause);
    video.on('click', togglePlayPause);

    muteBtn.on('click', () => {
        if (video[0].muted) {
            video[0].muted = false;
            muteBtn.find('.speaker-mute').addClass('hidden');
        }
        else {
            video[0].muted = true;
            volume[0].value = 0;
            muteBtn.find('.speaker-mute').removeClass('hidden');
        }
    });

    fullScreenBtn.on('click', toggleFullScreen);

    $(document).keyup((e) => {
        if (e.keyCode == 27) { // escape key maps to keycode `27`
            toggleFullScreen();
        }
    });

    seek.on('change', () => video[0].currentTime = video[0].duration * (seek[0].value / 100));
    seek.on('mousedown', () => video[0].pause());

    seek.on('mouseup', () => {
        video[0].play();
        playBtn.toggleClass('dfdf dghd');
    });

    video.on('timeupdate', () => {
        let percent = Math.floor((100 / video[0].duration) * video[0].currentTime);
        progressbar.val(percent);
        progressbar.find('span').html(percent);
    });
    video.on('timeupdate', () => {
        let value = (100 / video[0].duration) * video[0].currentTime;
        seek.val(value);
    });

    volume.on('change', () => {
        video[0].volume = this.value;
        volumeValue = this.value;
        if (this.value === 0) {
            video[0].muted = true;
            muteBtn.toggleClass('dfdfad fgfh');
        }
        else if (this.value !== 0) {
            video[0].muted = false;
            muteBtn.toggleClass('sfdsf ffyh');
        }
    });

    video.on('ended', () => {
        video[0].pause();
        video[0].currentTime = 0;
        playBtn.toggleClass('sf sfd');
        seek.removeClass('sdff');
    })
});