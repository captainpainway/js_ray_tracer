/**
 * Creates a tuple from coordinates.
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} w
 * @returns {{x: *, y: *, z: *, w: *}}
 */
const tuple = (x, y, z, w) => {
    return {x: x, y: y, z: z, w: w}
};

/**
 * Creates a point from coordinates.
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @returns {{x: *, y: *, z: *, w: *}}
 */
const point = (x, y, z) => {
    return (tuple(x, y, z, 1.0));
};

/**
 * Creates a vector from coordinates.
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @returns {{x: *, y: *, z: *, w: *}}
 */
const vector = (x, y, z) => {
    return (tuple(x, y, z, 0.0));
};

/**
 * Adds two tuples.
 * @param {tuple} t1
 * @param {tuple} t2
 * @returns {{x: *, y: *, z: *, w: *}}
 */
const add = (t1, t2) => {
    return tuple(
        t1.x + t2.x,
        t1.y + t2.y,
        t1.z + t2.z,
        t1.w + t2.w
    );
};

/**
 * Subtracts two tuples.
 * @param {tuple} t1
 * @param {tuple} t2
 * @returns {{x: *, y: *, z: *, w: *}}
 */
const subtract = (t1, t2) => {
    return tuple(
        t1.x - t2.x,
        t1.y - t2.y,
        t1.z - t2.z,
        t1.w - t2.w
    )
};

/**
 * Subtracts a vector from the zero vector.
 * @param {vector} v
 * @returns {{x: *, y: *, z: *, w: *}}
 */
const zero = (v) => {
    return vector(
        0 - v.x,
        0 - v.y,
        0 - v.z
    )
};

/**
 * Negates a tuple.
 * @param {tuple} t
 * @returns {{x: *, y: *, z: *, w: *}}
 */
const negate = (t) => {
    return tuple(-t.x, -t.y, -t.z, -t.w);
};

/**
 * Multiplies a tuple by a scalar value.
 * @param {tuple} t
 * @param {number} s
 * @returns {{x: *, y: *, z: *, w: *}}
 */
const multiply = (t, s) => {
    return tuple(
        t.x * s,
        t.y * s,
        t.z * s,
        t.w * s
    );
};

/**
 * Divides a tuple by a scalar value.
 * @param {tuple} t
 * @param {number} s
 * @returns {{x: *, y: *, z: *, w: *}}
 */
const divide = (t, s) => {
    return tuple(
        t.x / s,
        t.y / s,
        t.z / s,
        t.w / s
    );
};

/**
 * Returns the magnitude of a vector.
 * @param {vector} v
 * @returns {number}
 */
const magnitude = (v) => {
    return Math.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2 + v.w ** 2);
};

/**
 * Normalize a vector.
 * @param {vector} v
 * @returns {{x: *, y: *, z: *, w: *}}
 */
const normalize = (v) => {
    let mag = magnitude(v);
    return tuple(
        v.x / mag,
        v.y / mag,
        v.z / mag,
        v.w / mag
    );
};

/**
 * Returns the dot product of two vectors.
 * @param {vector} a
 * @param {vector} b
 * @returns {number}
 */
const dot = (a, b) => {
    return a.x * b.x +
        a.y * b.y +
        a.z * b.z +
        a.w * b.w
};

/**
 * Returns the cross product of two vectors.
 * @param {vector} a
 * @param {vector} b
 * @returns {{x: *, y: *, z: *, w: *}}
 */
const cross = (a, b) => {
    return vector(
        a.y * b.z - a.z * b.y,
        a.z * b.x - a.x * b.z,
        a.x * b.y - a.y * b.x
    );
};

module.exports = {
    tuple,
    point,
    vector,
    add,
    subtract,
    zero,
    negate,
    multiply,
    divide,
    magnitude,
    normalize,
    dot,
    cross
};