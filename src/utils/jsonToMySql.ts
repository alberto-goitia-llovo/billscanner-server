export function bracketsToParenthesis(array) {
    return '(' + array.join(',') + ')';
}

export function arrayString(array, keys) {
    let string = '';
    for (let object of array) {
        let values = []
        for (let key of keys) {
            values.push((object[key] != undefined) ? object[key] : null);
        }
        string += '\n' + bracketsToParenthesis(values);
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