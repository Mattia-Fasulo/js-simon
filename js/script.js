"use strict";
/*


Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.

Dopo 30 secondi i numeri scompaiono e l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite una casella di input e un bottone

Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.


*/
const sec = 1000;
let timer = 10;
let handleClick = 0;


// associo una variabile al pulsante play
const btnPlayHTML = document.getElementById('play-btn');

// associo a delle varibili i miei container
const myContainerHTML = document.getElementById('my-container');
const startContainerHTML = document.getElementById('start-container');

const numeriDaGenerare = 5;
const numeriGenerati = [];
const numeriIndovinati = [];



//funzione che mi genera 5 numeri casuali tra 1 e 99
const generatoreNumeri = function (x) {
    while (numeriGenerati.length < x) {
        const numeriDaIndovinare = randomNumber(1, 99);
        if (!numeriGenerati.includes(numeriDaIndovinare)) {
            numeriGenerati.push(numeriDaIndovinare);
        }
    }
}

//funzione che mi genera i box per i numeri generati
const generatoreBox = function (y) {
    for (let i = 0; i < y; i++) {
        const boxNumeriGenerati = document.createElement('div');
        boxNumeriGenerati.classList.add('box');
        myContainerHTML.appendChild(boxNumeriGenerati);
    }
}

// funzione che inserisce i numeri generati nei box
const inserireNumeri = function (z) {
    const squares = document.querySelectorAll('.box');
    for (let i = 0; i < z; i++) {
        squares[i].innerHTML = `
        ${numeriGenerati[i]}
        `
    }
}

// funzione che mi genere il conteiner del countdown
const generatoreCountDownContainer = function () {
    const countContainer = document.createElement('div');
    countContainer.classList.add('countdown-container');
    myContainerHTML.appendChild(countContainer);

}



// funzione che gestisce il funzionamento del tasto play
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
    

    // funzione per generare i numeri del countdown
    const numCountDown = function (div) {
        timer--;
        div.innerHTML = timer;
        console.log(timer)
        if (timer == 0) {
            clearInterval(countDownIntervall);
        }
    }

    //inserisco i numeri del countdown nel contenitore
    const countDownIntervall = setInterval(numCountDown, sec, countContainerHTML)


    //dopo 10 secondi svuoto di nuovo my-container
    setTimeout("clearDiv(myContainerHTML)", timer * sec);

    //dopo 10 secondi faccio apparire il container per l'input
    setTimeout("indovinareNumeri()", timer * sec);

}

//---------------------------------------------------------------
//funzione che genera l'input numerico e ne gestisce il funzionamento
const indovinareNumeri = function () {
    //qui genero il div
    const containerInput = document.createElement('div');
    containerInput.setAttribute('id', 'container-input');

    myContainerHTML.appendChild(containerInput);

    //qui genero l'input
    const input = document.createElement('input');
    input.setAttribute('type', 'number');
    containerInput.appendChild(input);

    // qui genero il bottone
    const btnCerca = document.createElement('button');
    btnCerca.innerText = 'Cerca';
    btnCerca.classList.add('btn-cerca', 'btn', 'btn-dark');
    containerInput.appendChild(btnCerca);

    // funzione che gestisce il comportamento del bottone btnCerca
    const cerca = function () {
        //tengo il conto del numero delle volte che l'utente clicca il bottone
        handleClick++;

        //inserisco in una variabile il numero inserito dall'utente
        let tentativo = parseInt(input.value);
        input.value = '';

        //se il numero è presente tra i numeri generati lo pusho nell'array dei numeri indovinati
        if (numeriGenerati.includes(tentativo) && !numeriIndovinati.includes(tentativo)) {
            numeriIndovinati.push(tentativo);
            console.log(numeriIndovinati)
        }

        //raggiunti i 5 click svuoto il div
        if (handleClick == numeriDaGenerare) {
            clearDiv(containerInput);
            const containerRisultato = document.createElement('div');
            containerRisultato.setAttribute('id', 'start-container');
            myContainerHTML.appendChild(containerRisultato)


            //genero la scritto Game Over
            const gameOver = document.createElement('h1');
            gameOver.classList.add('text-center', 'my-4');
            gameOver.innerText = 'Game Over!';
            containerRisultato.appendChild(gameOver);

            //genero la scritta che dirà quante parole sono state indovinate
            const text = document.createElement('h3');
            text.innerHTML = `
            Hai indovinato ${numeriIndovinati.length} numeri
        
            `
            containerRisultato.appendChild(text);


            //ciclo sulla lunghezza dell'array dei numeri indovinati e li stampo nel div del risultato
            for (let i = 0; i < numeriIndovinati.length; i++) {
                let numIndovinato = document.createElement('h2');
                numIndovinato.innerHTML = numeriIndovinati[i];
                containerRisultato.appendChild(numIndovinato);
            }

            //se l'utente ha indovinato tutti i numeri faccio uscire la scritta win altrimenti la scritta loose
            if (numeriGenerati.length == numeriIndovinati.length) {
                const win = document.createElement('h2');
                win.innerHTML = 'Hai Vinto!';
                containerRisultato.appendChild(win);
            }
            else {
                const loose = document.createElement('h2');
                loose.innerHTML = 'Hai Perso!';
                containerRisultato.appendChild(loose);
            }


        }
    }

    btnCerca.addEventListener('click', cerca);
}

//-------------------------------------------------------------

btnPlayHTML.addEventListener('click', play);
