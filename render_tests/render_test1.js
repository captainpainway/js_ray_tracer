const canvas_to_ppm = require('../src/ppm_save').canvas_to_ppm;
const canvas = require('../src/canvas').canvas;
const color = require('../src/colors').color;
const write_pixel = require('../src/canvas').write_pixel;
const save_image = require('../src/ppm_save').save_image;

let c = canvas(5, 3);
let c1 = color(1.5, 0, 0);
let c2 = color(0, 0.5, 0);
let c3 = color(-0.5, 0, 1);
write_pixel(c, 0, 0, c1);
write_pixel(c, 2, 1, c2);
write_pixel(c, 4, 2, c3);

let ppm = canvas_to_ppm(c);
save_image(ppm, `${process.argv[2]}`);
