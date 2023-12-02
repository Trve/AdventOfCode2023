const fs = require('fs');

const readLines = (filename) => {
    const data = fs.readFileSync(filename, {
        encoding: 'utf8',
        flag: 'r'
    });
    return data.split('\n').map(line => line.trim());
}

const lines = readLines('./day1input.txt');

const findDigit = (text, reverse = false) => {
    const chars = reverse
        ? text.split('').reverse()
        : text.split('');
    const digit = chars.find(char => !isNaN(char));
    return parseInt(digit);
}

const getNumber = (text) => {
    const digit1 = findDigit(text, false);
    const digit2 = findDigit(text, true);
    return digit1 * 10 + digit2;
}

const getResult = () => {
    return lines.map(getNumber).reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    );
}

console.log('day1 result:', getResult());