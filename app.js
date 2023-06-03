class Game {
    constructor(figures, boxes) {
        this.firstPlayer = '';
        this.buttons = figures;
        this.boxes = boxes;
        this.winingCombinations=[
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        this.arrO = [];
        this.arrX = [];
    }

    disableButtons(){
        this.buttons.forEach((btn) => {
            btn.classList.add('disactive');
        })
    }

    drawFigure(e){
        e.innerHTML = `<span>${this.firstPlayer}</span>`;
    }
    
    disableBox(e){
        e.classList.add('placeholder-disactive');
    }

    showPopup(winner){
        let popup = document.querySelector('.bg');
        if(winner === "Remis"){
            popup.querySelector('.winner-is').innerHTML=winner;
        } else {
            popup.querySelector('.winner-is').innerHTML="Wygrywa: " + winner;
        }
        popup.classList.add('bg-active');
    }
    
    toggleFigure(){
        if(this.firstPlayer === "O"){
            this.firstPlayer = "X";
        } else {
            this.firstPlayer = "O";
        }this.firstPlayer
        return this.firstPlayer;
    }

    addToArr(target,label){
        let arr = eval('this.arr' + this.firstPlayer);
        arr.push(target.getAttribute('data-number')*1);
        this.checkArr(arr,this.firstPlayer,label);
    }
    
    checkArr(arr,winner){
        let allFounded = false;
        if(arr.length >= 3){
            for(let i = 0;i < this.winingCombinations.length; i++){
                allFounded = this.winingCombinations[i].every( ai => arr.includes(ai));
                if(allFounded === true){
                    this.endOfGame(this.winingCombinations[i],winner);
                    return;
                }
                 else if(arr.length === 5 && allFounded === false){
                    console.log('draw');
                    this.endOfGame([],'Remis');
                }
            }
        }
    }

    endOfGame(winnerSet,winner){
        this.boxes.forEach((box) => {
            box.classList.add('endGame');
            box.classList.add('placeholder-disactive');
            for(let i = 0; i < winnerSet.length; i++){
                box.getAttribute('data-number')*1 == winnerSet[i] ? box.classList.add('win') : 0;

            }
        })
        this.showPopup(winner);
    }

    setStartPlayer(player = this.firstPlayer) {
        this.firstPlayer = player;
        document.querySelector('.select__player .player').innerHTML = player;
    }

    disablePopup(){
        document.querySelector('.bg').classList.remove('bg-active');
    }

    activeBoxes(action){
        this.boxes.forEach((box) => {
            eval(`box.classList.${action}('placeholder-disactive')`);
        })
    }

    activeBtns(){
        this.buttons.forEach((figure) => {
            figure.classList.remove('disactive');
        })
    }
    clearArrays(){
        this.arrO = [];
        this.arrX = [];
    }

    clearBoxes(){
        this.boxes.forEach((box) => {
            box.innerHTML = '';
            box.className = 'placeholder';
        })
    }

    reset(){
        this.disablePopup();
        this.clearBoxes();
        this.activeBtns();
        this.clearArrays();
        this.setStartPlayer('');
    }

    boxHandle(event){
        const label = document.querySelector('.select__player .text');
        label.innerHTML = 'Tura gracza: ';
        this.drawFigure(event.target);
        this.disableBox(event.target);
        this.addToArr(event.target,label);
        this.toggleFigure();
        this.setStartPlayer();
    }

    popupHandle(event){
        if(event.getAttribute('data-answear') == "Tak"){
            this.reset();
            this.activeBoxes('add');
        } else {
            this.disablePopup();
        }
    }

    init() {;
        this.boxes.forEach((box) => {
            box.addEventListener('click', (event) => {
                this.boxHandle(event);
            })
        })
        this.buttons.forEach((button) => {
            button.addEventListener('click', () => {
                this.firstPlayer = button.innerHTML;
                this.setStartPlayer();
                this.disableButtons();
                this.activeBoxes('remove');
            })
        })
    }
}

document.addEventListener('DOMContentLoaded', (e) => {
    const figures = document.querySelectorAll('.select__box');
    const boxes = document.querySelectorAll('.placeholder');
    const popup = document.querySelector('.btns');
    newGame = new Game (figures, boxes);
    newGame.init();
    popup.addEventListener('click', (e) => {
        newGame.popupHandle(e.target);
    })
    
})