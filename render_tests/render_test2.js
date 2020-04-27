const canvas_to_ppm = require('../src/ppm_save').canvas_to_ppm;
const canvas = require('../src/canvas').canvas;
const color = require('../src/colors').color;
const write_pixel = require('../src/canvas').write_pixel;
const save_image = require('../src/ppm_save').save_image;

let c = canvas(10, 2);
let col = color(1, 0.8, 0.6);
for (let y = 0; y < c.height; y++) {
    for (let x = 0; x < c.width; x++) {
        write_pixel(c, x, y, col);
    }
}

let ppm = canvas_to_ppm(c);
save_image(ppm, `${process.argv[2]}`);
