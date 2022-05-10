document.addEventListener('DOMContentLoaded', ()=>{
    // document.oncontextmenu = e => e.preventDefault();
    const grid = document.querySelector('.grid');
    let width = 10;
    let squares = [];
    let bombsAmount = 20;
    let flags = 0;
    let isGameOver = false;


    // create board
    function createBoard() {

        // shuffle the areas
        const bombsArray = Array(bombsAmount).fill('bomb');
        const emptyArray = Array(width*width-bombsAmount).fill('valid');
        const gameArray = emptyArray.concat(bombsArray);
        const shuffledArray = gameArray.sort(() => Math.random() -.5);

        for (let i = 0; i < width*width; i++){
            const square = document.createElement('div');
            square.setAttribute('id', i);
            square.classList.add(shuffledArray[i]);
            grid.appendChild(square);
            squares.push(square)

            // normal click
            square.addEventListener('click', (e) =>{
                click(square)
            })

            // cntrl + left click
            square.oncontextmenu = function(e) {
                e.preventDefault();
                addFlag(square)
            }

        }
    }
    createBoard();

    //add flag
    function addFlag(square){
        if (isGameOver) return;
        if (!square.classList.contains('checked') && (flags < bombsAmount)){
            if (!square.classList.contains('flag')){
                square.classList.add('flag');
                square.innerText = '🚩';
                flags++;
            } else {
                square.classList.remove('flag');
                square.innerText = '';
                flags--;
            }

        }
    }


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
            squares[i].setAttribute('data', total)

        }
    }

    function click(square){
        let currentID = square.id;
        if (isGameOver) return;
        if (square.classList.contains('checked') || square.classList.contains('flag')) return;


        if (square.classList.contains('bomb')){
            gameOver(square)
        } else{
            let total = square.getAttribute('data');
            if (total !=0){
                square.classList.add('checked');
                square.innerText = total;
                return;
            }

            checkSquare (square, currentID)
        }
        
        square.classList.add('checked')
    };

    // check the square
    function checkSquare (square, currentID){
        const isLeftEdge = (currentID % width === 0);
        const isRightEgde = (currentID % width === width-1);

        setTimeout(() => {
            if (currentID > 0 && !isLeftEdge){
                const newID = squares[parseInt(currentID)-1].id;
                const newSquare = document.getElementById(newID);
                click(newSquare)
            }
            if (currentID > 9 && !isRightEgde){
                const newID = squares[parseInt(currentID) +1 -width].id;
                const newSquare = document.getElementById(newID);
                click(newSquare);
            }
            if (currentID > 10){
                const newID = squares[parseInt(currentID - width)].id;
                const newSquare = document.getElementById(newID);
                click(newSquare)
            }
            if (currentID > 11 && !isLeftEdge){
                const newID = squares[parseInt(currentID) -1 - width].id;
                const newSquare = document.getElementById(newID);
                click(newSquare);
            }
            if (currentID < 98 && !isRightEgde){
                const newID = squares[parseInt(currentID) +1].id;
                const newSquare = document.getElementById(newID);
                click(newSquare);
            }
            if (currentID < 90 && !isLeftEdge){
                const newID = squares[parseInt(currentID) -1 + width].id;
                const newSquare = document.getElementById(newID);
                click(newSquare);
            }
            if (currentID < 88 && !isRightEgde){
                const newID = squares[parseInt(currentID) +1 +width].id;
                const newSquare = document.getElementById(newID);
                click(newSquare);
            }
            if (currentID < 89){
                const newID = squares[parseInt(currentID) +width].id;
                const newSquare = document.getElementById(newID);
                click(newSquare);
            }

        }, 10)
    };

    // game over
        function gameOver(square){
            console.log('game over');
            isGameOver = true;

            //show all bombs
            squares.forEach(square => {
                if(square.classList.contains('bomb')){
                    square.innerText = '💣';
                }
            })
        }




})