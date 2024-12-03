document.addEventListener('DOMContentLoaded', ()=>{
    const gridDisplay =document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const width = 4
    let squares = []
    let score = 0
    //create the board
    function craeteBoard(){
        for(let  i=0; i<width*width ; i++){
            const square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generates()
        generates()
    }
    craeteBoard()

    //generate new numbers
    function generates(){
        const randomNumber = Math.floor(Math.random() * squares.length)
        if(squares[randomNumber].innerHTML ==0 ){
            squares[randomNumber].innerHTML = 2
        }else generates()
    } 



    function moveRight(){
        for(let i=0; i<16; i++){
            //i%4 === 0 => start of the row
            if( i% 4 === 0){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                //get numbers and filtr 0 in each row
                let filterdRow = row.filter(num =>num)
                let missing = 4 - filterdRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filterdRow)
                // all the two be on the right hand side
                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }

    function moveLeft(){
        for (let i=0; i<16; i++){
            //i%4 === 0 => start of the row
            if(i%4 === 0){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                //get numbers and filtr 0 in each row
                let filterdRow = row.filter(num =>num)
                let missing = 4 - filterdRow.length
                let zeros = Array(missing).fill(0)
                let newRow = filterdRow.concat(zeros)
                // all the two be on the right hand side
                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]
            }
        }
    }


    function moveUp(){
        for (let i=0; i<4; i++){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+width].innerHTML
                let totalThree = squares[i+width*2].innerHTML
                let totalFour = squares[i+width*3].innerHTML
                let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                //get numbers and filtr 0 in each row
                let filterdColumn = column.filter(num =>num)
                let missing = 4 - filterdColumn.length
                let zeros = Array(missing).fill(0)
                let newColumn = filterdColumn.concat(zeros)
                // all the two be on the right hand side
                squares[i].innerHTML = newColumn[0]
                squares[i+width].innerHTML = newColumn[1]
                squares[i+width*2].innerHTML = newColumn[2]
                squares[i+width*3].innerHTML = newColumn[3]
        }
    }




    function moveDown(){
        for (let i=0; i<4; i++){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+width].innerHTML
                let totalThree = squares[i+width*2].innerHTML
                let totalFour = squares[i+width*3].innerHTML
                let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                //get numbers and filtr 0 in each row
                let filterdColumn = column.filter(num =>num)
                let missing = 4 - filterdColumn.length
                let zeros = Array(missing).fill(0)
                let newColumn = zeros.concat(filterdColumn)
                // all the two be on the right hand side
                squares[i].innerHTML = newColumn[0]
                squares[i+width].innerHTML = newColumn[1]
                squares[i+width*2].innerHTML = newColumn[2]
                squares[i+width*3].innerHTML = newColumn[3]
        }
    }

    function combine(){
        //since 15 + 1 doesn't exist we get error so we use 15
        for (let i =0; i<15; i++){
            if(squares[i].innerHTML === squares[i+1].innerHTML){
                let total = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = total
                squares[i+1].innerHTML = 0
                score += total
                scoreDisplay.innerHTML = score
            }
        }
        checkWin()
    }


    function combineColumn(){
        for (let i =0; i<12; i++){
            if(squares[i].innerHTML === squares[i+width].innerHTML){
                let total = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
                squares[i].innerHTML = total
                squares[i+width].innerHTML = 0
                score += total
                scoreDisplay.innerHTML = score
            }
        }
        checkWin()
    }



    function control(e){
        if(e.key === 'ArrowLeft'){
            keyLeft()
        }else if (e.key === 'ArrowRight'){
            keyRight()
        }else if (e.key === 'ArrowUp'){
            keyUp()
        }else if (e.key === 'ArrowDown'){
            keyDown()
        }
    }
    document.addEventListener('keydown',control)


    function keyLeft(){
        moveLeft()
        combine()
        moveLeft()
        generates()
    }


    function keyRight(){
        moveRight()
        combine()
        moveRight()
        generates()
    }

    function keyUp(){
        moveUp()
        combineColumn()
        moveUp()
        generates()
    }


    function keyDown(){
        moveDown()
        combineColumn()
        moveDown()
        generates()
    }



    //find the winner (find 2048)
    function checkWin(){
        for(let i=0; i<squares.length; i++){
            if(squares[i.innerHTML == 2048]){
                resultDisplay.innerHTML = "YOU WIN!"
                document.removeEventListener('keydown', control)
            }
        }
    }

    //check if there are no zeros on the board => game over
    function checkZero(){
        let zero =0
        for(let i=0; i<squares.length; i++){
            if(squares[i].innerHTML == 0){
                zero++
            }
        }
        if(zero === 0){
            resultDisplay.innerHTML ="YOU LOSE!"
            document.removeEventListener('keydown', control)
        }
    }

})