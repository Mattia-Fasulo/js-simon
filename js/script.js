"use strict";
/*


Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.

Dopo 30 secondi i numeri scompaiono e l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite una casella di input e un bottone

Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.


*/
const sec = 1000;
let timer = 10;


// associo una variabile al pulsante play
const btnPlayHTML = document.getElementById('play-btn');

// associo a delle varibili i miei container
const myContainerHTML = document.getElementById('my-container');
const startContainerHTML = document.getElementById('start-container');

const numeriDaGenerare = 5;
const numeriGenerati = [];
const numeriIndovinati = [];



//funzione che mi genera 5 numeri casuali tra 1 e 99
const generatoreNumeri = function (x){
    while(numeriGenerati.length < x){
        const numeriDaIndovinare = randomNumber(1,99);
        if(!numeriGenerati.includes(numeriDaIndovinare)){
            numeriGenerati.push(numeriDaIndovinare);
        } 
    }
}

//funzione che mi genera i box per i numeri generati
const generatoreBox = function (y){
    for(let i = 0; i < y; i++){
        const boxNumeriGenerati = document.createElement('div');
        boxNumeriGenerati.classList.add('box');
        myContainerHTML.appendChild(boxNumeriGenerati);
    }
}

// funzione che inserisce i numeri generati nei box
const inserireNumeri = function (z) {
    const squares = document.querySelectorAll('.box');
    for(let i = 0; i < z; i++){
        squares[i].innerHTML = `
        ${numeriGenerati[i]}
        `
    }
}

// funzione che mi genere il conteiner del countdown
const generatoreCountDownContainer = function (){
    const countContainer = document.createElement('div');
    countContainer.classList.add('countdown-container');
    myContainerHTML.appendChild(countContainer);

}

// funzione per generare i numeri del countdown
const numCountDown = function(div) {
    timer--;
    div.innerHTML = timer;  
}

//---------------------------------------------------------------
//funzione che genera l'input numerico e ne gestisce il funzionamento
const indovinareNumeri = function () {
    //qui genero il div
    const containerInput = document.createElement('div');
    containerInput.setAttribute('id','container-input');
    console.log(containerInput)
    myContainerHTML.appendChild(containerInput);

    //qui genero l'input
    const input = document.createElement('input');
    input.setAttribute('type','number');
    containerInput.appendChild(input);

    // qui genero il bottone
    const btnCerca = document.createElement('button');
    btnCerca.innerText = 'Cerca';
    btnCerca.classList.add('btn-cerca','btn','btn-dark');
    containerInput.appendChild(btnCerca);

    // funzione che gestisce il comportamento del bottone btnCerca
    const cerca = function () {
        input.value = '';
    }

    btnCerca.addEventListener('click', cerca);
}

//-------------------------------------------------------------





const play = function () {
    // svuoto il mio div
    clearDiv(myContainerHTML);

    // genero i numeri
    generatoreNumeri(numeriDaGenerare);

    // creo i contenitori per i numeri
    generatoreBox(numeriDaGenerare);
    
    // inserisco i numeri nei contenitori
    inserireNumeri(numeriDaGenerare);

    // creo il container per il countdown
    generatoreCountDownContainer();


    //associo il container del countdown ad una variabile e gli stampo 10 all'interno
    const countContainerHTML = document.querySelector(".countdown-container")
    countContainerHTML.innerHTML = timer;
    // console.log(countContainerHTML)

    //inserisco i numeri del countdown nel contenitore
    setInterval(numCountDown, sec, countContainerHTML )
    

    //dopo 10 secondi svuoto di nuovo my-container
    setTimeout("clearDiv(myContainerHTML)", timer * sec);

    //dopo 10 secondi faccio apparire il container per l'input
    setTimeout("indovinareNumeri()", timer * sec);

    



    

}

btnPlayHTML.addEventListener('click', play);
