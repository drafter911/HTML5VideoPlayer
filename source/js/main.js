var $ = require('jquery');
var Player = require('./player');
var player = new Player('text');

$(document).ready(function () {
    player.play();
});