let colorClicked = [];
let ordemCor = [];
let currentPoints = 0;
let playerName = '';


function criarModal () {
    colorClicked = [];
    ordemCor = [];
    currentPoints = 0;

    const main = document.querySelector('#main');
    main.innerHTML = ' ';

    const input = document.createElement('input');
    const modalSection = document.createElement('section');
    const title = document.createElement('h1');
    const form = document.createElement('form');
    const label = document.createElement('label');

    const button = document.createElement('button');

    modalSection.id = "modalSection"
    form.id = "form";
    input.id = "inputName";
    button.id = "button";

    label.htmlFor = "inputName";
    label.innerText = "Insira seu nome";
    title.innerText = "GENIUS"
    button.innerText = "INICIAR"
    button.type = 'submit';

    form.addEventListener('submit', (e) =>{
       e.preventDefault();
       getNameOfPlayer();
       criarTabuleiro();
    })

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(button);

    modalSection.appendChild(title);
    modalSection.appendChild(form);

    main.appendChild(modalSection);
}

criarModal();

function getNameOfPlayer(){
     playerName = document.getElementById('inputName').value;
}

function criarTabuleiro () {
    const main = document.querySelector('#main');
    const getInput = document.querySelector('#inputName');

    main.innerHTML = `
    <h1 id = 'inGameTitle'>GENIUS GAME</h1>
    <p id = 'descriptionInGame'>Acerte as cores na sequência <b>correta</b> para marcar pontos. Caso erre você perde o jogo!</p>
    <div class="container">
        <div id = '1' class="greensquare square"></div>
        <div id = '2' class="yellowsquare square"></div>
        <div id = '3' class="redsquare square"></div>
        <div id = '4' class="bluesquare square"></div>
        <div id = 'interface' class="circle">Bem vindo ${getInput.value}!<br>Boa Sorte</div>
    </div>
    `

   setTimeout(inicioJogo, 3000);
    const getClickedgreen =  document.querySelector('.greensquare')
    getClickedgreen.addEventListener("click", getColorClicked )

    const getClickedyellow =  document.querySelector('.yellowsquare')
    getClickedyellow.addEventListener("click", getColorClicked )

    const getClickedred=  document.querySelector('.redsquare')
    getClickedred.addEventListener("click", getColorClicked )

    const getClickedblue =  document.querySelector('.bluesquare')
    getClickedblue.addEventListener("click", getColorClicked )
}

function inicioJogo() {
    colorClicked = [];
    record = 0;
    const interface = document.querySelector("#interface");
    interface.innerHTML = " ";
    interface.innerText = "PRESTE ATENÇÃO A ORDEM DAS CORES";

    setTimeout(corAleatoria(), 1000);
}

function corAleatoria() {
    ordemCor.push(Math.floor(Math.random()*(4-1) + 1));
    brilhaCor();
    currentPoints++ 
}

function brilhaCor() {
    const verde = document.getElementById('1');
    const amarelo = document.getElementById('2');
    const vermelho = document.getElementById('3')
    const azul = document.getElementById('4')
    
    for (let i =0; i < ordemCor.length; i++) {
        let tempo = 1000;
        if(ordemCor[i] == verde.id) {
            
            setTimeout(()=>{
               verde.classList.add('activeGreen')
            }, 1500 + (i*tempo)) //
               
               setTimeout(() => {
                   verde.classList.remove('activeGreen')
                }, 1000 + (i*tempo));
                
        } if (ordemCor[i] == amarelo.id) {
           
            setTimeout(()=>{
                amarelo.classList.add('activeYellow')
            }, 1500 + (i* tempo) ) //
                setTimeout(() => {
                    amarelo.classList.remove('activeYellow')
                }, 1000 + (i* tempo));
                
        } if (ordemCor[i] == vermelho.id) {
        
            setTimeout(()=>{
            vermelho.classList.add('activeRed')
            }, 1500+ (i* tempo))

            setTimeout(() => {
                vermelho.classList.remove('activeRed')
            }, 1000+ (i* tempo));

        } if (ordemCor[i] == azul.id) {
            setTimeout(()=>{
            azul.classList.add('activeBlue')
            },1500+ (i* tempo))

            setTimeout(() => {
                azul.classList.remove('activeBlue')
            }, 1000+(i* tempo));
        }
    }   
}

function getColorClicked(e){
   colorClicked.push(+e.target.id);
   verifyClick();
}

function verifyClick() {   
    let count = 0;
    for(let i=0; i < colorClicked.length; i++){
        if(ordemCor[i] === colorClicked[i]){
                count++            
        } else {
            return endGame();
        }
    }
    if (count == ordemCor.length) {
       nextLevel();
    }
}

function nextLevel() {
    setTimeout(inicioJogo, 1000); 
}