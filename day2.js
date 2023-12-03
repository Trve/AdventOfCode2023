const fs = require('fs');

const readLines = (filename) => {
    const data = fs.readFileSync(filename, {
        encoding: 'utf8',
        flag: 'r'
    });
    return data.trim().split('\n').map(line => line.trim());
}

// ------------------------------------------------------------------------------------------------

const getFirstDigit = (text, reverse = false) => {
    const chars = text.split('');
    if (reverse) {
        chars.reverse();
    }
    const digit = chars.find(char => !isNaN(char));
    return parseInt(digit);
}

const parseGame = (text) => {
    const game = {
        id: 0,
        sets: [],
    }
    const iSpace = text.indexOf(' ');
    const iColon = text.indexOf(':');
    game.id = parseInt(text.substring(iSpace, iColon).trim());
    const rawSets = text.substring(iColon + 1).split(';');
    game.sets = rawSets.map(rawSet => {
        const set = {
            red: 0,
            green: 0,
            blue: 0,
        };
        const rawCubes = rawSet.trim().split(',');
        rawCubes.forEach(cube => {
            cube = cube.trim();
            const sep = cube.indexOf(' ');
            const number = parseInt(cube.substring(0, sep).trim());
            const colorWord = cube.substring(sep).trim();
            switch (colorWord) {
                case 'red': set.red = number; break;
                case 'green': set.green = number; break;
                case 'blue': set.blue = number; break;
            }
        });
        return set;
    });
    return game;
}

const onlyPossibleGame = (game) => {
    return game.sets.every(isPossibleSet);
};

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;
const isPossibleSet = (set) => {
    return set.red <= maxRed && set.green <= maxGreen && set.blue <= maxBlue;
}

const getResult = () => {
    return readLines('./day2input.txt')
        .map(parseGame)
        .filter(onlyPossibleGame)
        .reduce(
            (previousValue, currentValue) => {
                return previousValue + currentValue.id
            },
            0
        );
}

console.log('day2 result:', getResult());