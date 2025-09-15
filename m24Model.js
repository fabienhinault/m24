import { L, R, S, range, equalArrays, getRandomInt, pick } from "./libm24.js";


class Chrono {
    constructor() {
        this.startTime = 0;
    }

    start() {
        this.startTime = Date.now();
    }

    stop() {
        return Date.now() - this.startTime;
    }
}

class DummyEventDispatcher{
    addEventListener(strMsg, callback) {
    }


    dispatchEvent(evt) {
    }
}

const goal = range(24);

class Model {
    constructor(evtDispatcher) {
        this.dispatcher = evtDispatcher;
        this.previousNumbers = [];
        this.numbers = range(24);
        this.lasts = [];
        this.dispatcher.addEventListener('numbers changed', evt => {this.updateSolution();});
        this.chrono = new Chrono();
    }

    equalsGoal() {
        return equalArrays(this.numbers, goal);
    }

    dispatch(type, detail) {
        return this.dispatcher.dispatchEvent(new CustomEvent(type, {detail: detail}));
    }

    dispatchLastsChanged() {
        return this.dispatcher.dispatchEvent(new CustomEvent("lasts changed", {detail: {lasts: this.lasts}}));
    }

    pushLasts(last) {
        this.lasts.push(last);
        return this.dispatchLastsChanged();
    }

    popLasts() {
        let popped = this.lasts.pop();
        this.dispatchLastsChanged();
        return popped;
    }

    setLasts(newLasts) {
        this.lasts = newLasts
        return this.dispatchLastsChanged();
    }

    setNumbers(newNumbers) {
        if (this.equalsGoal()) {
            const time = this.chrono.stop();
            this.dispatcher.dispatchEvent(
                new CustomEvent("solved", {detail: {time: time}}));
        }
        this.numbers = newNumbers;
    }

    silentL() {
        this.pushLasts('L');
        this.previousNumbers = [...this.numbers];
        this.setNumbers(L(this.numbers));
    }

    L() {
        this.silentL();
        return this.dispatcher.dispatchEvent(
            new CustomEvent("numbers changed", {detail: {numbers: this.numbers}}));
    }

    silentR() {
        this.pushLasts('R');
        this.previousNumbers = [...this.numbers];
        this.setNumbers(R(this.numbers));
    }

    R() {
        this.silentR();
        return this.dispatcher.dispatchEvent(
            new CustomEvent("numbers changed", {detail: {numbers: this.numbers}}));
    }

    silentS() {
        this.pushLasts('S');
        this.previousNumbers = [...this.numbers];
        this.setNumbers(S(this.numbers));
    }

    S() {
        this.silentS();
        return this.dispatcher.dispatchEvent(
            new CustomEvent("numbers changed", {detail: {numbers: this.numbers}}));
    }

    applyString(str) {
        for (const c of str) {
            if (c !== 'L' && c !== 'R' && c !== 'S') {
                throw new Error("invalid argument");
            }
            this[c]();
        }
    }

    shuffleDefault() {
        this.shuffleNTimes(getRandomInt(100, 200));
    }

    shuffleNTimes(nbTimes) {
        for(let iTime = 0; iTime < nbTimes; iTime++){
            pick([() => this.silentL(), () => this.silentR(), () => this.silentS()])();
        }
    }

    reset() {
        this.setNumbers(range(23));
        this.setLasts([]);
    }     
};

export {Chrono, Model, DummyEventDispatcher};
