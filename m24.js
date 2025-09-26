// import {range, permute, getRandomInt, pick, makeMArray, makeMInvArray, getComplementModulo, getIsInverseLength, getMsInverseLength, getGroupInverse, getSolution} from 'libm12';

//
import {Chrono, Model, DummyEventDispatcher} from './m24Model.js';
document.addEventListener('DOMContentLoaded', async function() {
    const N = 24;
    const model = new Model(document);

    let gameWidth = 516;
    let tileSideWithMargin = gameWidth / model.N;
    let tileSidePx = tileSideWithMargin - 2;
    let bigButtonWidth = Math.floor(gameWidth / 3) - 2;
    let transitionDurationMillis = 1000;
    let lastPush = 0;
    const white = getNumberBackgroundColor(0);
    const blue = getNumberBackgroundColor(model.N - 1);

    const divGameContainer = document.querySelector('#game_container');
    const divNumbersHeader = document.querySelector('#numbers-header');
    const divNumbersFooter = document.querySelector('#numbers-footer');
    const divInfos = document.querySelector('#infos');
    const buttonL = document.querySelector('#L');
    const buttonS = document.querySelector('#S');
    const buttonR = document.querySelector('#R');

    const buttonShuffle = document.querySelector('#shuffle');
    const divTime = document.querySelector('#time');
    const divTitle = document.querySelector('#title');
    const divNumbers = document.querySelector('#numbers');
    let tiles = [];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function initBigButton(button) {
    button.style.width = bigButtonWidth + "px";
    button.style.height = (2 * tileSidePx + 2) + "px";
}

function initControl(control) {
    control.style.width = tileSidePx + "px";
    control.style.height = tileSidePx + "px";
}

function initView() {
    divGameContainer.style.width = gameWidth + "px";
    initBigButton(buttonL);
    initBigButton(buttonS);
    initBigButton(buttonR);
    initControl(buttonShuffle);
}

function getNumberBackgroundColor(i) {
    const pct = 98 - (i - 1) / (model.N - 2) * 35;
    return `hsl(240, 100%, ${pct}%)`;
}

function createNumberDiv(i) {
    const div = document.createElement("div");
    div.style.width = tileSidePx + "px";
    div.style.transition = `left ${transitionDurationMillis}ms`
    div.className = "tile";
    return div;
}

function initNumbersDiv(numbers, div) {
    div.style.height = tileSideWithMargin + "px";
    div.innerHTML = "";
    for (let i of numbers) {
        const subdiv = createNumberDiv(i);
        subdiv.appendChild(document.createTextNode(i));
        subdiv.style.height = tileSidePx + "px";
        subdiv.className = "tile";
        subdiv.id = "tile-" + i;
        subdiv.style.lineHeight = tileSidePx + "px";
        if (i > model.N / 2) {
            subdiv.style.color = "white";
        }
        tiles[i] = subdiv;
        div.appendChild(subdiv);
    }
}

function startChrono(evt) {
    model.chrono.start();
    document.removeEventListener('numbers changed', startChrono);
    document.addEventListener('solved', showTime);
}

function showTime(evt) {
    divTime.innerHTML = formatDuration(evt.detail.time);
    document.removeEventListener('solved', showTime);
}

function shuffle() {
    model.shuffleDefault();
    document.addEventListener('numbers changed', startChrono);
}

function updateTransitionDuration() {
    transitionDurationMillis = Math.min(transitionDurationMillis, Date.now() - lastPush);
    lastPush = Date.now();
}

function L() {
    updateTransitionDuration();
    model.L();
}

function S() {
    updateTransitionDuration();
    model.S();
}

function R() {
    updateTransitionDuration();
    model.R();
}
    document.documentElement.style.setProperty('--white', white);
    document.documentElement.style.setProperty('--blue', blue);
    buttonL.onclick = L;
    buttonS.onclick = S; 
    buttonR.onclick = R; 
    buttonShuffle.onclick = shuffle;

    document.addEventListener('keypress',
        evt => {
            const key = evt.key.toUpperCase();
            // L for left index
            if (['F'].includes(key)) {
                L();
            }
            // R for right index
            if (['J'].includes(key)) {
                R();
            }
            // S for middle keys (not space, because it's detected both up and down)
            if (['G', 'H'].includes(key)) {
                S();
            }
        }
    );
    model.reset();
    document.addEventListener('numbers changed',
        evt => {
            divNumbers.innerHTML = '';
            initNumbersDiv(model.numbers, divNumbers);
        }
    );
    initView();
    initNumbersDiv(model.numbers, divNumbers);
});
