/**
 * Returns a color tuple.
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {{red: *, green: *, blue: *}}
 */
const color = (r, g, b) => {
    return {
        red: r,
        green: g,
        blue: b
    }
};

/**
 * Adds two colors.
 * @param {tuple} c1
 * @param {tuple} c2
 * @returns {{red: *, green: *, blue: *}}
 */
const add = (c1, c2) => {
    return color(
        c1.red + c2.red,
        c1.green + c2.green,
        c1.blue + c2.blue
    );
};

/**
 * Subtracts two colors.
 * @param {tuple} c1
 * @param {tuple} c2
 * @returns {{red: *, green: *, blue: *}}
 */
const subtract = (c1, c2) => {
    return color(
        c1.red - c2.red,
        c1.green - c2.green,
        c1.blue - c2.blue
    );
};

/**
 * Multiply a color by a scalar value.
 * @param {tuple} c
 * @param {number} s
 * @returns {{red: *, green: *, blue: *}}
 */
const scalar = (c, s) => {
    return color(
        c.red * s,
        c.green * s,
        c.blue * s
    );
};

const multiply = (c1, c2) => {
    return color(
        c1.red * c2.red,
        c1.green * c2.green,
        c1.blue * c2.blue
    );
};

module.exports = {
    color,
    add,
    subtract,
    scalar,
    multiply
};