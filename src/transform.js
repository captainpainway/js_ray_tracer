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

/**
 * Returns the scaling matrix.
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @returns {Array}
 */
const scaling = (x, y, z) => {
    return matrix([x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1]);
};

/**
 * Returns the x-axis rotation matrix.
 * @param {number} r
 * @returns {Array}
 */
const rotation_x = (r) => {
    return matrix([1, 0, 0, 0, 0, Math.cos(r), -Math.sin(r), 0, 0, Math.sin(r), Math.cos(r), 0, 0, 0, 0, 1]);
};

/**
 * Returns the y-axis rotation matrix.
 * @param {number} r
 * @returns {Array}
 */
const rotation_y = (r) => {
    return matrix([Math.cos(r), 0, Math.sin(r), 0, 0, 1, 0, 0, -Math.sin(r), 0, Math.cos(r), 0, 0, 0, 0, 1]);
};

/**
 * Returns the z-axis rotation matrix.
 * @param {number} r
 * @returns {Array}
 */
const rotation_z = (r) => {
    return matrix([Math.cos(r), -Math.sin(r), 0, 0, Math.sin(r), Math.cos(r), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
};

/**
 * Returns the shearing matrix.
 * @param {number} xy
 * @param {number} xz
 * @param {number} yx
 * @param {number} yz
 * @param {number} zx
 * @param {number} zy
 */
const shearing = (xy, xz, yx, yz, zx, zy) => {
    return matrix([1, xy, xz, 0, yx, 1, yz, 0, zx, zy, 1, 0, 0, 0, 0, 1]);
};

module.exports = {
    translation,
    scaling,
    rotation_x,
    rotation_y,
    rotation_z,
    shearing
};