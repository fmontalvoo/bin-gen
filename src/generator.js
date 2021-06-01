const { generateCheckDigit } = require('./luhn');

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function generateCVV() {
    return `${random(0, 9)}${random(0, 9)}${random(0, 9)}`;
}

function generateValidThru() {
    let month = random(1, 12);
    const year = new Date().getFullYear();
    let yearRange = random(1, 4);
    return `${month < 10 ? '0' + month : month}|${year + yearRange}`
}

function generator({ number, valid, cvv, range, randomG, digits }) {
    let limit = (digits == 'true') ? 15 : 16;
    let cards = [];
    let min = limit > 15 ? 6 : 5;
    if (randomG == 'true' && number.length <= limit - 1) {
        if (number.length >= min) {
            for (let i = 0; i < range; i++)
                cards.push(generateRandomCard({ number: number, valid: valid, cvv: cvv, limit: (limit - 1) }));
        }
    }
    if (randomG == 'false' && number.length <= limit - 1) {
        cards = generateSequencialCard({ number: number, valid: valid, cvv: cvv, range: range, limit: (limit - 1) });
    }
    return cards;
}

function generateRandomCard({ number, valid, cvv, limit }) {
    const total = limit - number.length;
    let digits = ''
    for (let i = 0; i < total; i++)
        digits += random(0, 9);

    number += digits;

    number = generateCheckDigit(number);
    valid = (valid != null && valid.length > 6) ? valid : generateValidThru();
    cvv = (cvv != null && cvv.length > 2) ? cvv : generateCVV();


    return `${number}|${valid}|${cvv}`;
}

function generateSequencialCard({ number, valid, cvv, range, limit }) {
    const total = limit - number.length;
    const max = limit > 14 ? 12 : 11;
    const min = limit > 14 ? 10 : 9;
    let cards = [];
    if (number.length > min && number.length < max) {
        for (let i = 1; i < range; i++) {
            let digits = generateSequence(i, total);
            console.log(digits);
            let aux = generateCheckDigit(`${number}${digits}`);
            let v = (valid != null && valid.length > 6) ? valid : generateValidThru();
            let c = (cvv != null && cvv.length > 2) ? cvv : generateCVV();

            cards.push(`${aux}|${v}|${c}`);
        }
    }
    return cards;
}

function generateSequence(index, limit) {
    let digits = `${index}`;
    while (digits.length < limit) {
        digits = '0' + digits;
    }
    return digits;
}

module.exports = { generator }