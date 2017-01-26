import {Player} from "./player";

export class Game {
    players:Player[];
    places:any;
    step:number;
    currentPlayer:Player;
    board:any;
    game:number;
    constructor(){
        this.places = document.querySelectorAll('td');
        this.players = [];
        this.step = 0;
        this.game = 1;
        this.board = [
            [null,null,null],
            [null,null,null],
            [null,null,null]
        ];
        this.players[0] = new Player('Player 1');
        this.players[1] = new Player('Player 2');
        this.start();
        this.listenEvens();
    }
    start(){
        if (localStorage.getItem('game')) {
            this.game = JSON.parse(localStorage.getItem('game'));
            this.players[0].wins = JSON.parse(localStorage.getItem('players0'));
            this.players[1].wins = JSON.parse(localStorage.getItem('players1'));
        }
        this.players[0].setConrols(37,38,39,40,57);
        this.players[1].setConrols(65,87,68,83,90);
        let random:boolean = Math.random() >= 0.5;
        if(random){
            this.players[0].setSymbol('X');
            this.players[1].setSymbol('O');
            this.players[0].motion = true;
        }else{
            this.players[1].setSymbol('X');
            this.players[0].setSymbol('O');
            this.players[1].motion = true;
        }
        this.getPlayers();
        this.render();
    }
    render(){
        let games:any = document.querySelector('.game');
        games.innerText = `Game ${this.game}`;
        let plFigOne:any = document.querySelector('.player-one-figure');
        plFigOne.innerText = this.players[0].symb;
        let plFigTwo:any = document.querySelector('.player-two-figure');
        plFigTwo.innerText = this.players[1].symb;
        let plWinOne:any = document.querySelector('.player-one-wins');
        plWinOne.innerText = `${this.players[0].wins} won`;
        let plWinTwo:any = document.querySelector('.player-two-wins');
        plWinTwo.innerText = `${this.players[1].wins} won`;
    }
    getPlayers(){
        if (this.players[0].motion) {
            this.currentPlayer = this.players[0];
        } else {
            this.currentPlayer = this.players[1];
        }
        this.players[0].motion = !this.players[0].motion;
        this.players[1].motion = !this.players[1].motion;
    }
    reset(){
        this.game +=1;
        localStorage.setItem('players0', JSON.stringify(this.players[0].wins));
        localStorage.setItem('players1', JSON.stringify(this.players[1].wins));
        localStorage.setItem('game', JSON.stringify(this.game));
        location.reload();
    }
    course(e:any){
        let el = e.target;
        let indexPlace : number = +el.getAttribute('data-place');
        let newIndexPlace : number = 0;
        if (e.keyCode === this.currentPlayer.controls.left) {
            newIndexPlace = indexPlace - 1;
        } else if (e.keyCode === this.currentPlayer.controls.up) {
            newIndexPlace = indexPlace - 3;
        } else if (e.keyCode === this.currentPlayer.controls.right) {
            newIndexPlace = indexPlace + 1;//right
        } else if (e.keyCode === this.currentPlayer.controls.down) {
            newIndexPlace = indexPlace + 3;
        }
        this.places[newIndexPlace] && this.places[newIndexPlace].focus();
        if (e.keyCode === this.currentPlayer.controls.select) {
            if(e.target.innerText == ""){
                e.target.innerText = this.currentPlayer.symb;
                this.step +=1;
                let cell = $(el).attr("class");
                let row = parseInt(cell[0]);
                let col = parseInt(cell[1]);
                this.board[row][col] = this.currentPlayer.symb;
                this.newWins(row,col,this.currentPlayer);
                this.getPlayers();
            }
        }
    }

    newWins(x:number,y:number, pl:Player){
        const row = [];
        for (let i = 0; i < 3; i++) {
            if (this.board[x][i] !== pl.symb)
                break;
            row.push(`${x}${i}`);
            if (i == 2) {
                this.showWin(row);
                pl.wins +=1;
            }
        }
        const cell = [];
        for (let i = 0; i < 3; i++) {
            if (this.board[i][y] !== pl.symb)
                break;
            cell.push(`${i}${y}`);
            if (i == 2) {
                this.showWin(cell);
                pl.wins +=1;
            }
        }
        const diagonal = [];
        if (x == y) {
            for (let i = 0; i < 3; i++) {
                if (this.board[i][i] !== pl.symb)
                    break;
                diagonal.push(`${i}${i}`);
                if (i == 2) {
                    this.showWin(diagonal);
                    pl.wins +=1;
                }
            }
        }
        const antiDiagonal = [];
        for (let i = 0; i < 3; i++) {
            if (this.board[i][2 - i] !== pl.symb)
                break;
            antiDiagonal.push(`${i}${2-i}`);
            if (i == 2) {
                this.showWin(antiDiagonal);
                pl.wins +=1;
            }
        }
        if (this.step === 9) {
            this.reset();
        }
    }
    showWin(elements:any) {
        for(let i = 0;i<3;i++){
            console.log(elements[i]);
            for(let j = 0;j<9;j++){
                console.log(this.places[j]);
                if(this.places[j].getAttribute("class") == elements[i]){
                    this.places[j].setAttribute('class','win');

                }
            }
        }
        setTimeout(()=>this.reset(),1000)
    }
    listenEvens(){
        document.addEventListener('keyup',this.course.bind(this));
    }

}