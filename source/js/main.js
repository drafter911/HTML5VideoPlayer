var $ = require('jquery');


$(document).ready(function () {
    var Player = require('./player');
    var player = new Player('text');
    var xhr = $.ajax({
        url: 'https://raw.githubusercontent.com/drafter911/HTML5VideoPlayer/master/jsonTestFiles/video.json'
    });

    xhr.always((data) => {
        player.play(JSON.parse(data), 5000, true);

        //  where is data - server response
        //  5000 - timeout between video
        //  true - is video starts automaticaly
    })
});