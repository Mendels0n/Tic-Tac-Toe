export class AreaItems {
        elements:JQuery;
        place:any;
    constructor($tpl:any){
        this.elements = $tpl;
        this.place = {
            placeOne : this.elements.find('[data-place-one]'),
            placeTwo : this.elements.find('[data-place-two]'),
            placeThree : this.elements.find('[data-place-three]'),
            placeFour : this.elements.find('[data-place-four]'),
            placeFive : this.elements.find('[data-place-five]'),
            placeSix : this.elements.find('[data-place-six]'),
            placeSeven : this.elements.find('[data-place-seven]'),
            placeEight : this.elements.find('[data-place-eight]'),
            placeNine : this.elements.find('[data-place-nine]')
        };

    }
    listenEvents(){
        this.place.placeOne.on('click',this.setData.bind(this));
        this.place.placeTwo.on('click',this.setData.bind(this));
        this.place.placeThree.on('click',this.setData.bind(this));
        this.place.placeFour.on('click',this.setData.bind(this));
        this.place.placeFive.on('click',this.setData.bind(this));
        this.place.placeSix.on('click',this.setData.bind(this));
        this.place.placeSeven.on('click',this.setData.bind(this));
        this.place.placeEight.on('click',this.setData.bind(this));
        this.place.placeNine.on('click',this.setData.bind(this));
    }
    setData(el:string){
        console.log(el);
    }
}
