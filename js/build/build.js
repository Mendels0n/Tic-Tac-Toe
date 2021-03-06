(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var main_1 = require("../modules/main");
var ticArea = new main_1.Game();

},{"../modules/main":2}],2:[function(require,module,exports){
"use strict";
var player_1 = require("./player");
var Game = (function () {
    function Game() {
        this.places = document.querySelectorAll('td');
        this.players = [];
        this.step = 0;
        this.game = 1;
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this.players[0] = new player_1.Player('Player 1');
        this.players[1] = new player_1.Player('Player 2');
        this.start();
        this.listenEvens();
    }
    Game.prototype.start = function () {
        if (localStorage.getItem('game')) {
            this.game = JSON.parse(localStorage.getItem('game'));
            this.players[0].wins = JSON.parse(localStorage.getItem('players0'));
            this.players[1].wins = JSON.parse(localStorage.getItem('players1'));
        }
        this.players[0].setConrols(37, 38, 39, 40, 57);
        this.players[1].setConrols(65, 87, 68, 83, 90);
        var random = Math.random() >= 0.5;
        if (random) {
            this.players[0].setSymbol('X');
            this.players[1].setSymbol('O');
            this.players[0].motion = true;
        }
        else {
            this.players[1].setSymbol('X');
            this.players[0].setSymbol('O');
            this.players[1].motion = true;
        }
        this.getPlayers();
        this.render();
    };
    Game.prototype.render = function () {
        var games = document.querySelector('.game');
        games.innerText = "Game " + this.game;
        var plFigOne = document.querySelector('.player-one-figure');
        plFigOne.innerText = this.players[0].symb;
        var plFigTwo = document.querySelector('.player-two-figure');
        plFigTwo.innerText = this.players[1].symb;
        var plWinOne = document.querySelector('.player-one-wins');
        plWinOne.innerText = this.players[0].wins + " won";
        var plWinTwo = document.querySelector('.player-two-wins');
        plWinTwo.innerText = this.players[1].wins + " won";
    };
    Game.prototype.getPlayers = function () {
        if (this.players[0].motion) {
            this.currentPlayer = this.players[0];
        }
        else {
            this.currentPlayer = this.players[1];
        }
        this.players[0].motion = !this.players[0].motion;
        this.players[1].motion = !this.players[1].motion;
    };
    Game.prototype.reset = function () {
        this.game += 1;
        localStorage.setItem('players0', JSON.stringify(this.players[0].wins));
        localStorage.setItem('players1', JSON.stringify(this.players[1].wins));
        localStorage.setItem('game', JSON.stringify(this.game));
        location.reload();
    };
    Game.prototype.course = function (e) {
        var el = e.target;
        var indexPlace = +el.getAttribute('data-place');
        var newIndexPlace = 0;
        if (e.keyCode === this.currentPlayer.controls.left) {
            newIndexPlace = indexPlace - 1;
        }
        else if (e.keyCode === this.currentPlayer.controls.up) {
            newIndexPlace = indexPlace - 3;
        }
        else if (e.keyCode === this.currentPlayer.controls.right) {
            newIndexPlace = indexPlace + 1; //right
        }
        else if (e.keyCode === this.currentPlayer.controls.down) {
            newIndexPlace = indexPlace + 3;
        }
        this.places[newIndexPlace] && this.places[newIndexPlace].focus();
        if (e.keyCode === this.currentPlayer.controls.select) {
            if (e.target.innerText == "") {
                e.target.innerText = this.currentPlayer.symb;
                this.step += 1;
                var cell = $(el).attr("class");
                var row = parseInt(cell[0]);
                var col = parseInt(cell[1]);
                this.board[row][col] = this.currentPlayer.symb;
                this.newWins(row, col, this.currentPlayer);
                this.getPlayers();
            }
        }
    };
    Game.prototype.newWins = function (x, y, pl) {
        var row = [];
        for (var i = 0; i < 3; i++) {
            if (this.board[x][i] !== pl.symb)
                break;
            row.push("" + x + i);
            if (i == 2) {
                this.showWin(row);
                pl.wins += 1;
            }
        }
        var cell = [];
        for (var i = 0; i < 3; i++) {
            if (this.board[i][y] !== pl.symb)
                break;
            cell.push("" + i + y);
            if (i == 2) {
                this.showWin(cell);
                pl.wins += 1;
            }
        }
        var diagonal = [];
        if (x == y) {
            for (var i = 0; i < 3; i++) {
                if (this.board[i][i] !== pl.symb)
                    break;
                diagonal.push("" + i + i);
                if (i == 2) {
                    this.showWin(diagonal);
                    pl.wins += 1;
                }
            }
        }
        var antiDiagonal = [];
        for (var i = 0; i < 3; i++) {
            if (this.board[i][2 - i] !== pl.symb)
                break;
            antiDiagonal.push("" + i + (2 - i));
            if (i == 2) {
                this.showWin(antiDiagonal);
                pl.wins += 1;
            }
        }
        if (this.step === 9) {
            this.reset();
        }
    };
    Game.prototype.showWin = function (elements) {
        var _this = this;
        for (var i = 0; i < 3; i++) {
            console.log(elements[i]);
            for (var j = 0; j < 9; j++) {
                console.log(this.places[j]);
                if (this.places[j].getAttribute("class") == elements[i]) {
                    this.places[j].setAttribute('class', 'win');
                }
            }
        }
        setTimeout(function () { return _this.reset(); }, 1000);
    };
    Game.prototype.listenEvens = function () {
        document.addEventListener('keyup', this.course.bind(this));
    };
    return Game;
}());
exports.Game = Game;

},{"./player":3}],3:[function(require,module,exports){
"use strict";
var Player = (function () {
    function Player(name) {
        this.name = name;
        this.wins = 0;
        this.symb = "";
        this.motion = false;
        this.controls = [];
    }
    Player.prototype.setSymbol = function (symb) {
        this.symb = symb;
    };
    Player.prototype.setConrols = function (left, up, right, down, select) {
        this.controls = {
            left: left,
            up: up,
            right: right,
            down: down,
            select: select
        };
    };
    return Player;
}());
exports.Player = Player;

},{}]},{},[1])

//# sourceMappingURL=build.js.map
