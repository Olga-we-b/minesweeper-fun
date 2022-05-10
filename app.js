document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid');
    let width = 10;
    let squares = [];
    let bombsAmount = 20;

    // create board
    function createBoard() {
        // shuffle the areas
        const bombsArray = Array(bombsAmount).fill('bomb');
        const emptyArray = Array(width*width-bombsAmount).fill('valid');
        const gameArray = emptyArray.concat(bombsArray);
        const shuffledArray = gameArray.sort(() => Math.random() -.5);
        console.log(shuffledArray)

        for (let i = 0; i < width*width; i++){
            const square = document.createElement('div');
            square.setAttribute('id', i);
            square.classList.add(shuffledArray[i]);
            grid.appendChild(square);
            squares.push(square)
        }
    }
    createBoard();


    // add numbers 
    for (let i =0; i < squares.length; i++){
        let total = 0;
        const isLeftEdge = i % width === 0;
        const isRightEgde = i % width === width -1;


        if (squares[i].classList.contains('valid')){
            if (i > 0 && !isLeftEdge && squares[i-1].classList.contains('bomb')) total++;
            if (i > 9 && !isRightEgde && squares[i+1 - width].classList.contains('bomb')) total++;
            if (i > 10 && squares[i-width].classList.contains('bomb')) total++;
            if (i > 11 && !isLeftEdge && squares[i - 1 -width].classList.contains('bomb')) total++;
            if (i < 98 && !isRightEgde && squares[i + 1].classList.contains('bomb')) total++;
            if (i < 90 && !isLeftEdge && squares[i-1 + width].classList.contains('bomb')) total++;
            if (i < 88 && !isRightEgde && squares[i+1 + width].classList.contains('bomb')) total++;
            if (i < 89 && squares[i + width].classList.contains('bomb')) total++;
            squares[i].innerText = total;

        }
    }






})