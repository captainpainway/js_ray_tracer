const canvas_src = require('../src/canvas');
const ppm_save = require('../src/ppm_save');
const color = require('../src/colors').color;
const tuples = require('../src/tuples');
const matrices = require('../src/matrices');
const transform = require('../src/transform');
const utils = require('../src/utils');
const canvas = canvas_src.canvas;
const write_pixel = canvas_src.write_pixel;
const canvas_to_ppm = ppm_save.canvas_to_ppm;
const save_image = ppm_save.save_image;
const point = tuples.point;
const add = tuples.add;
const multiply = matrices.multiply;
const translation = transform.translation;
const rotation_z = transform.rotation_z;
const roundPoint = utils.roundPoint;

const width = 500;
const height = 500;
const c = canvas(500, 500);
const white = color(1, 1, 1);

const center = point(width/2, height/2, 0); // Center of the canvas.
const origin = point(0, 0, 0); // Origin point of the canvas.
const radius = 200;

let start = multiply(translation(0, -radius, 0), origin); // The y location of 12 o'clock from the origin.

for (let i = 0; i < 12; i++) {
    // Multiply the start point by the rotation matrix, then add it to the center of the the canvas, and round.
    let tick = roundPoint(add(center, multiply(rotation_z(Math.PI/6 * i), start)));
    write_pixel(c, tick.x, tick.y, white);
    write_pixel(c, tick.x + 1, tick.y, white);
    write_pixel(c, tick.x, tick.y + 1, white);
    write_pixel(c, tick.x + 1, tick.y + 1, white);
}

const ppm = canvas_to_ppm(c);
save_image(ppm, 'clock_face');