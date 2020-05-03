/**
 * Create a square matrix from an array.
 * @param {array} m
 * @returns {Array}
 */
const matrix = (m) => {
    let size = Math.sqrt(m.length);
    let arr = [];
    for (let i = 0; i < size; i++) {
        let arr2 = [];
        for (let j = 0; j < size; j++) {
            arr2.push(m.shift());
        }
        arr.push(arr2);
    }
    return arr;
};

/**
 * Test if two matrices are equal.
 * @param {array} m1
 * @param {array} m2
 * @returns {boolean}
 */
const equality = (m1, m2) => {
    let a = m1.flat();
    let b = m2.flat();
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};

/**
 * Turn a tuple into a 1x4 matrix.
 * @param {object} t
 * @returns {*[]}
 */
const tuple_to_matrix = (t) => {
    return [[t.x],[t.y],[t.z],[t.w]];
};

/**
 * Turn a matrix array into a tuple.
 * @param {array} m
 * @returns {{x: *, y: *, z: *, w: *}}
 */
const matrix_to_tuple = (m) => {
    return {x: m[0], y: m[1], z: m[2], w: m[3]};
};

/**
 * Multiply two matrices or a matrix and a tuple.
 * @param {array} m1
 * @param {object} m2
 * @returns {*}
 */
const multiply = (m1, m2) => {
    let arr = [];
    let a = m1;
    let b = m2;

    // Check to see if m2 is actually a tuple.
    if (m2.x) {
        b = tuple_to_matrix(m2);
    }

    for (let row = 0; row < a.length; row++) {
        for (let col = 0; col < b[0].length; col++) {
            let multi = a[row][0] * b[0][col] +
                a[row][1] * b[1][col] +
                a[row][2] * b[2][col] +
                a[row][3] * b[3][col];
            arr.push(multi);
        }
    }

    return m2.x ? matrix_to_tuple(arr) : matrix(arr);
};

/**
 * Multiply a matrix or tuple by the identity matrix.
 * @param {object} m
 * @returns {*}
 */
const identity = (m) => {
    const identity_matrix = matrix([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    return multiply(identity_matrix, m);
};

/**
 * Calculate the determinant of a 2x2 matrix.
 * @param {array} m
 * @returns {number}
 */
const determinant = (m) => {
    if (m.length === 2) {
        return m[0][0] * m[1][1] - m[0][1] * m[1][0];
    } else {
        let determinant = 0;
        for (let c = 0; c < m[0].length; c++) {
            determinant += m[0][c] * cofactor(m, 0, c);
        }
        return determinant;
    }
};

/**
 * Return a submatrix of a matrix.
 * @param {array} m
 * @param {number} row
 * @param {number} col
 * @returns {Array}
 */
const submatrix = (m, row, col) => {
    let arr = [];
    for (let r = 0; r < m.length; r++) {
        if (r !== row) {
            for (let c = 0; c < m.length; c++) {
                if (c !== col) {
                    arr.push(m[r][c]);
                }
            }
        }
    }
    return matrix(arr);
};

/**
 * Calculate the minor of a submatrix.
 * @param {array} m
 * @param {number} row
 * @param {number} col
 * @returns {number}
 */
const minor = (m, row, col) => {
    return determinant(submatrix(m, row, col));
};

/**
 * Calculate the cofactor of a submatrix.
 * @param {array} m
 * @param {number} row
 * @param {number} col
 * @returns {number}
 */
const cofactor = (m, row, col) => {
    // If row + col is odd, negate the value.
    return (row + col) % 2 === 0 ? minor(m, row, col) : ~minor(m, row, col) + 1;
};

/**
 * Calculate the inverse of a matrix.
 * @param {array} m
 * @returns {*}
 */
const inverse = (m) => {
    if (determinant(m) === 0) return false;
    let m2 = new Array(m.length);
    for (let i = 0; i < m2.length; i++) {
        m2[i] = new Array(m.length);
    }
    for (let row = 0; row < m.length; row++) {
        for (let col = 0; col < m.length; col++) {
            let c = cofactor(m, row, col);
            m2[col][row] = c / determinant(m);
        }
    }
    return m2;
};

/**
 * Transpose a matrix.
 * @param {array} m
 * @returns {any[]}
 */
const transpose = (m) => {
    let m2 = new Array(m.length);
    for (let i = 0; i < m2.length; i++) {
        m2[i] = new Array(m.length);
    }
    for (let row = 0; row < m.length; row++) {
        for (let col = 0; col < m.length; col++) {
            m2[col][row] = m[row][col];
        }
    }
    return m2;
};

module.exports = {
    matrix,
    equality,
    multiply,
    identity,
    determinant,
    submatrix,
    minor,
    cofactor,
    inverse,
    transpose
};