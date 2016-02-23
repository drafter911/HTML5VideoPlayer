var $ = require('jquery');

$(document).ready(function() {

    var video = $('#myvideo'),
        container = $('#custom-video'),
        playBtn = $('#playpause'),
        muteBtn = $('#mute'),
        fullScreenBtn = $('#fullscreen'),
        seek = $('#seekbar'),
        volume = $('#volumebar'),
        volumeValue = volume.value,
        progressbar = $('#progressbar'),
        bufferbar = $('#bufferbar');

    if(video[0].autoplay){
        playBtn.toggleClass('video-autoplay video');
    }
    video.on('playing', function() {
        seek.addClass('light');
    });

    if(video[0].muted){
        muteBtn.toggleClass('ddd sss');
    } else {
        muteBtn.toggleClass('ddd sss');
    }

    function playpause() {
        if(video[0].paused){
            video[0].play();
            playBtn.toggleClass('fff eee');
        }
        else {
            video[0].pause();
            playBtn.toggleClass('sssss www');
            seek.removeClass('light');
        }
    }

    playBtn.on('click', playpause);
    video.on('click', playpause);

    muteBtn.on('click', function() {
        if(video[0].muted){
            video[0].muted = false;
            muteBtn.toggleClass('sdsd frrf');
        }
        else {
            video[0].muted = true;
            volume[0].value = 0;
            muteBtn.toggleClass('sddd dsfdsf');
        }
    });

    var isFullscreen = false;
    fullScreenBtn.on('click', function () {
        if(!isFullscreen){
            if(video[0].requestFullscreen) {
                video[0].requestFullscreen();
            }
            else if (video[0].mozRequestFullScreen) {
                container[0].mozRequestFullScreen();
            }
            else if (video[0].webkitRequestFullscreen) {
                video[0].webkitRequestFullscreen();
            }
            isFullscreen = true;
            fullScreenBtn.toggleClass('sdsd glhl');
        }
        else {
            if(document.cancelFullScreen) {
                document.cancelFullScreen();
            }
            else if(document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if(document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
            isFullscreen = false;
            fullScreenBtn.toggleClass('sfesf ghn');
        }
    });

    seek.on('change', function () {
        video[0].currentTime = video[0].duration * (seek[0].value/100);
    });
    seek.on('mousedown', function () {
        video[0].pause();
    });
    seek.on('mouseup', function () {
        video[0].play();
        playBtn.toggleClass('dfdf dghd');
    });

    video.on('timeupdate', function () {
        var percent = Math.floor((100 / video[0].duration) * video[0].currentTime);
        progressbar.val(percent);
        progressbar.find('span').html(percent);
    });
    video.on('timeupdate', function () {
        var value = (100 / video[0].duration) * video[0].currentTime;
        seek.val(value);
    });

    volume.on('change', function () {
        video[0].volume = this.value;
        volumeValue = this.value;
        if(this.value === 0) {
            video[0].muted = true;
            muteBtn.toggleClass('dfdfad fgfh');
        }
        else if (this.value !== 0) {
            video[0].muted = false;
            muteBtn.toggleClass('sfdsf ffyh');
        }
    });

    video.on('ended', function () {
        video[0].pause();
        video[0].currentTime = 0;
        playBtn.toggleClass('sf sfd');
        seek.removeClass('sdff');
    })
});