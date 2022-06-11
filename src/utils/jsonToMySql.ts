/**
 * Converts an array [a, b, c] to a string '(a, b, c)'
 * @param array 
 * @returns 
 */
export function fieldsFromArray(array) {
    return '(' + array.join(',') + ')';
}

/**
 * Converts an array of objects [{a: 1, b: 1}, {a: 2, b: 2}, {a: 3, b: 3}] and keys ['a', 'b'] to the following string
 * "('1', '1')\n('2', '2')\n('3', '3')"
 * @param array 
 * @param fields 
 * @returns 
 */
export function valuesFromArrayAndFields(array: { [key: string]: any }[], fields: string[]) {
    let string = '';
    for (let object of array) {
        string += '\n(';
        for (let field of fields) {
            string += `'${object[field]}',`;
        }
        string = string.slice(0, -1);
        string += ')';
    }
    return string;
}

/**
 * Converst an array of columns ['a', 'b'] to the following string: 
 * "a = VALUES('a'),\n b = VALUES('b')"
 * @param columns 
 * @returns 
 */
export function updateOnDupString(columns) {
    let string = '';
    for (let i = 0; i < columns.length; i++) {
        string += `\n ${columns[i]} = VALUES(${columns[i]})`;
        if (i < columns.length - 1) string += ',';
    }
    return string;
}