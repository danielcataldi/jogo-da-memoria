const cards = document.querySelectorAll('.card')
let hasFlipedCard = false
let firstCard, secondCard
let lockBoard = false  //trava jogada para virar apenas 2 cartas por rodada 


function flipCard() {

    if(lockBoard) return
    if(this === firstCard) return

    this.classList.add('flip')
    if(!hasFlipedCard){
        hasFlipedCard = true
        firstCard = this
        return
    }

    secondCard = this
    hasFlipedCard = false

    checkForMath()
}

//checa se as cartas sao iguais
function checkForMath(){
    if(firstCard.dataset.card === secondCard.dataset.card){
        disableCards()
        return
    }

    unflipCards()
}

//desabilitar cartas para não virarem após jogada correta
function disableCards(){
    firstCard.removeEventListener('click',flipCard)
    secondCard.removeEventListener('click',flipCard)

    resetBoard()
}

//cartas viram sozinhas após jogada errada
function unflipCards(){
    lockBoard = true
    setTimeout(()=> {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')

        resetBoard()
    },1500)
}

function resetBoard(){
    [hasFlipedCard,lockBoard] = [false,false]
    [firstCard,secondCard] = [null,null]
}


//altera class da carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
})



