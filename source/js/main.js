var $ = require('jquery');


$(document).ready(function () {
    var Player = require('./player');
    var player = new Player('text');
    player.play(5000, false);
});