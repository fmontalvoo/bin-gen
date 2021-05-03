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