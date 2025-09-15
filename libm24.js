function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

function permute(array, permutation) {
    return permutation.map(permutationIndex => array[permutationIndex]);
}

function equalArrays(array1, array2) {
    return array1.length === array2.length &&
        array1.every((v, i) => v === array2[i]);
}


function arrayStartsWith(tested, starter) {
    return equalArrays(tested.slice(0, starter.length), starter);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function pick(array) {
    return array[getRandomInt(0, array.length)];
}
function greatestMultipleLessThan(k, sup) {
    return sup - (sup % k);
}

function getRemainingDurationUnits(allSmalls, smallsInBig) {
    const remainingSmalls = allSmalls % smallsInBig;
    return {remainingSmalls, "allBigs": (allSmalls - remainingSmalls) / smallsInBig};
}

function threeDigits(n) {
    return n.toLocaleString('fr', {minimumIntegerDigits: 3, useGrouping:false});
}

function twoDigits(n) {
    return n.toLocaleString('fr', {minimumIntegerDigits: 2, useGrouping:false});
}

function formatDuration(allMilliseconds, decimalSeparator) {
    const {"remainingSmalls": remainingMillis, "allBigs": allSeconds} = getRemainingDurationUnits(allMilliseconds, 1000);
    const {"remainingSmalls": remainingSeconds, "allBigs": allMinutes} = getRemainingDurationUnits(allSeconds, 60);
    const {"remainingSmalls": remainingMinutes, "allBigs": allHours} = getRemainingDurationUnits(allMinutes, 60);
    let result = `${twoDigits(remainingSeconds)}${decimalSeparator}${threeDigits(remainingMillis)}`
    if (allMinutes !== 0) {
        result = `${twoDigits(remainingMinutes)}:` + result;
    }
    if (allHours !== 0) {
        result = `${twoDigits(allHours)}:` + result;
    }
    return result;
}

function getPermutationInverseRaw(rawPermutedArray) {
    let result = [];
    rawPermutedArray.forEach((element, index) => {result[element] = index;});
    return result;
}

function getRandomLrsString(len) {
    if (!len) {
        len = getRandomInt(10, 100);
    }
    let result = "";
    for(let iTime = 0; iTime < len; iTime++){
        result += pick(["L", "R", "S"]);
    }
    return result;
}

function L([a0, a1, ...a2_23]) {
    return [a0, ...a2_23, a1];
}

function R([a0, ...a1_23]) {
    return [a0,  a1_23[22], ...a1_23.slice(0, 22)];
}

function S([a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,
    a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,
    a20,a21,a22,a23]) {
        return [a1,a0,a23,a4,a3,a22,a11,a8,a7,a10,
            a9,a6,a21,a14,a13,a20,a17,a16,a19,a18,
            a15,a12,a5,a2];
}

function equalsRawGoal(rawNumbers) {
    return equalArrays(rawNumbers, range(23));
}

export {L, R, S, range, equalArrays, getRandomInt, pick};
