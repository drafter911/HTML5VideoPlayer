var $ = require('jquery');
var i = 0;
var Player = () => {
};

Player.prototype.play = (data, timeout, autoPlay) => {
    var video = $('#custom-video'),
        container = $('#video-player'),
        playBtn = $('#play-pause'),
        muteBtn = $('#mute'),
        fullScreenBtn = $('#full-screen'),
        seek = $('#seek-bar'),
        progressbar = $('#progress-bar'),
        volume = $('#volume-bar'),
        volumeValue = volume.value,
        isFullScreen = false;


    var loadVideo = (src, isTitleTagExist) => {
        video.html('<source src="' + src.url + '" type="' + src.videoType + '">');
        if (isTitleTagExist) {
            container.parent('div').find('.title').html(src.title);
        }
        else {
            container.parent('div').append('<h4 class="title">' + src.title + '</h4>');
        }
        video[0].load();
        //video.find('source').load();

    };

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

    var toggleFullScreen = () => {
        if (!isFullScreen) {
            if (video[0].requestFullscreen) {
                video[0].requestFullscreen();
            }
            else if (video[0].mozRequestFullScreen) {
                container[0].mozRequestFullScreen();
            }
            else if (video[0].webkitRequestFullscreen) {
                video[0].webkitRequestFullscreen();
            }
            isFullScreen = true;
            fullScreenBtn.find('.corner').addClass('minimize');
            video.next().addClass('fool-screen');
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
            isFullScreen = false;
            fullScreenBtn.find('.corner').removeClass('minimize');
            video.next().removeClass('fool-screen');
        }
    };

    video.on('playing', () => seek.addClass('light'));

    playBtn.on('click', togglePlayPause);

    video.on('click', togglePlayPause);

    seek.on('change', () => video[0].currentTime = video[0].duration * (seek[0].value / 100));

    seek.on('mousedown', () => video[0].pause());

    seek.on('mouseup', () => video[0].play());

    muteBtn.on('click', () => {
        if (video[0].muted) {
            video[0].muted = false;
            muteBtn.find('.speaker-mute').addClass('hidden');
            volume[0].value = volumeValue;
        }
        else {
            video[0].muted = true;
            volumeValue = volume[0].value;
            volume[0].value = 0;
            muteBtn.find('.speaker-mute').removeClass('hidden');
        }
    });

    fullScreenBtn.on('click', toggleFullScreen);

    $(document).keyup((e) => {
        if (e.keyCode == 27) {
            toggleFullScreen();
        }
    });

    video.on('timeupdate', () => {
        let value = (100 / video[0].duration) * video[0].currentTime;
        seek.val(value);
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

    volume.on('change', (e) => {
        video[0].volume = e.target.value;
        volumeValue = e.target.value;
        if (e.target.value === 0) {
            video[0].muted = true;
            muteBtn.find('.speaker-mute').removeClass('hidden');
        }
        else if (e.target.value !== 0) {
            video[0].muted = false;
            muteBtn.find('.speaker-mute').addClass('hidden');
        }
    });

    video.on('ended', () => {
        video[0].pause();
        video[0].currentTime = 0;

        playBtn.find('.play').removeClass('hidden');
        playBtn.find('.pause').addClass('hidden');

        i >= data.length ? i = 0 : i++;

        loadVideo(data[i], true);

        var time = timeout * 0.001;
        container.append('<div id="preloader">' + time + '<div></div></div>');
        function pl() {
            $('#preloader').html('<div></div>' + (time - 1));
            --time;
        }

        var preloader = setInterval(pl, 1000);

        setTimeout(function () {
            video[0].play();
            clearInterval(preloader);
            $('#preloader').remove();
        }, timeout);

    });

    if (data[i].hasOwnProperty('url') && data[i].hasOwnProperty('videoType')) {
        loadVideo(data[i], false);
    }

    if (autoPlay) {
        video[0].play();
        playBtn.find('.pause').removeClass('hidden');
        playBtn.find('.play').addClass('hidden');
    }
};

module.exports = Player;