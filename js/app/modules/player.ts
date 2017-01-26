export class Player {
    name:string;
    symb:string;
    wins:number;
    motion:boolean;
    controls:any;
    constructor(name:string){
        this.name = name;
        this.wins = 0;
        this.symb = "" ;
        this.motion = false;
        this.controls = [];
    }
    setSymbol(symb:string) {
        this.symb = symb;
    }
    setConrols(left:number,up:number,right:number,down:number,select:number){
        this.controls = {
            left,
            up,
            right,
            down,
            select
        };
    }

}
