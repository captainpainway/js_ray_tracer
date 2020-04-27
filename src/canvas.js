const colors = require('./colors');
const color = colors.color;

/**
 * Construct a canvas initiated to black.
 * @param {number} w
 * @param {number} h
 * @returns {{width: *, height: *, pixel: Array}}
 */
const canvas = (w, h) => {
    let pixels = [];
    for (let y = 0; y < h; y++) {
        pixels.push([]);
        for (let x = 0; x < w; x++) {
            pixels[y].push({
                x: x,
                y: y,
                color: color(0, 0, 0)
            });
        }
    }
    return {width: w, height: h, pixel: pixels}
};

/**
 * Write a pixel to the canvas with the specified color.
 * @param canvas
 * @param {number} x
 * @param {number} y
 * @param {tuple} color
 * @returns {*}
 */
const write_pixel = (canvas, x, y, color) => {
    return canvas['pixel'][y][x]['color'] = color;
};

/**
 * Return the pixel color at the specified coordinate on the canvas.
 * @param canvas
 * @param {number} x
 * @param {number} y
 * @returns {*}
 */
const pixel_at = (canvas, x, y) => {
    return canvas['pixel'][y][x]['color'];
};

module.exports = {
    canvas,
    write_pixel,
    pixel_at
};