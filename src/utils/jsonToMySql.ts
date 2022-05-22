export function bracketsToParenthesis(array) {
    return JSON.stringify(array).replace('[', '(').replace('}', ')')
}

export function arrayString(array, keys) {
    let string = ''
    for (let object of array) {
        let values = []
        for (let key in keys) {
            values.push(object[key] != undefined ? object[key] : null);
        }
        string += '\n' + bracketsToParenthesis(values);
    }
}

export function updateOnDupString(columns) {
    let string = '';
    for (let col of columns) {
        string += ` ${col} = VALUES('${col}')`;
    }
    return string;
}