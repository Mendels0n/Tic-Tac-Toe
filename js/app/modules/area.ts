// import {AreaItems} from "./area-items";
export class Area {
    $el: JQuery;
    area: any;
    elements:JQuery;
    place:any;
    el:any;
    constructor($el:JQuery){
        this.$el = $el;
        console.log(this.$el);
        this.area = this.$el.find('[data-area]');
        console.log(this.area);
        this.elements = this.$el;
        this.$el.empty();
        this.buildArea();
    }

    buildArea (){
        this.$el.html(this.area)
    }


}