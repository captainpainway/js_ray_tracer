/**
 * Round the values of a matrix for passing tests.
 * @param {array} m
 * @param {number} n
 * @returns {*}
 */
const roundMatrix = (m, n) => {
    return m.map(i => i.map(j => parseFloat(j.toFixed(n))));
};

/**
 * Round the values of a point tuple.
 * @param {object} p
 * @param {number} n
 * @returns {{x: string, y: string, z: string, w: string}}
 */
const roundPoint = (p, n) => {
    return {
        x: parseFloat(p.x.toFixed(n)),
        y: parseFloat(p.y.toFixed(n)),
        z: parseFloat(p.z.toFixed(n)),
        w: parseFloat(p.w.toFixed(n))
    };
};

module.exports = {
    roundMatrix,
    roundPoint
};