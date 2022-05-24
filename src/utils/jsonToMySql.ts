export function bracketsToParenthesis(array) {
    return '(' + array.join(',') + ')';
}

export function arrayString(array, keys) {
    let string = '';
    for (let object of array) {
        string += '\n(';
        for (let key of keys) {
            string += `'${object[key]}',`;
        }
        string = string.slice(0, -1);
        string += ')';
    }
    return string;
}

export function updateOnDupString(columns) {
    let string = '';
    for (let col of columns) {
        string += ` ${col} = VALUES(${col}),\n`;
    }
    return string;
}