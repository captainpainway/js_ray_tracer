/**
 * Round the values of a matrix for passing tests.
 * @param {array} m
 * @param {number} n
 * @returns {*}
 */
const roundMatrix = (m, n) => {
    return m.map(i => i.map(j => parseFloat(j.toFixed(n))));
};

module.exports = {
    roundMatrix
};