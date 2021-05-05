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

function generator({ number, valid, cvv, range, randomG }) {
    let cards = [];
    if (randomG == 'true' && number.length <= 15) {
        if (number.length >= 6) {
            for (let i = 0; i < range; i++)
                cards.push(generateRandomCard({ number: number, valid: valid, cvv: cvv }));
        }
    }
    if (randomG == 'false' && number.length <= 15) {
        cards = generateSequencialCard({ number: number, valid: valid, cvv: cvv, range: range });
    }
    return cards;
}

function generateRandomCard({ number, valid, cvv }) {
    let total = 15 - number.length;
    let digits = ''
    for (let i = 0; i < total; i++)
        digits += random(0, 9);

    number += digits;

    number = generateCheckDigit(number);
    valid = (valid != null && valid.length > 6) ? valid : generateValidThru();
    cvv = (cvv != null && cvv.length > 2) ? cvv : generateCVV();


    return `${number}|${valid}|${cvv}`;
}

function generateSequencialCard({ number, valid, cvv, range }) {
    let total = 15 - number.length;
    let cards = [];
    if (number.length > 10 && number.length < 12) {
        for (let i = 1; i < range; i++) {
            let digits = '';

            if (i <= 9)
                digits = `000${i}`;
            if (i > 9 && i <= 99)
                digits = `00${i}`;
            if (i > 99 && i <= 999)
                digits = `0${i}`;

            let aux = generateCheckDigit(`${number}${digits}`);
            let v = (valid != null && valid.length > 6) ? valid : generateValidThru();
            let c = (cvv != null && cvv.length > 2) ? cvv : generateCVV();

            cards.push(`${aux}|${v}|${c}`);
        }
    }
    return cards;
}

module.exports = { generator }