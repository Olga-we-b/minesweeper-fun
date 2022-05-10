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






})