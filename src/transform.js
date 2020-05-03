const matrix = require('../src/matrices').matrix;

/**
 * Returns the translation matrix.
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @returns {Array}
 */
const translation = (x, y, z) => {
    return matrix([1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1]);
};

module.exports = {
    translation
};