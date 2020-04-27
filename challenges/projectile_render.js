const shoot_projectile = require('./projectile');
const canvas_src = require('../src/canvas');
const ppm_save = require('../src/ppm_save');
const color = require('../src/colors').color;
const canvas = canvas_src.canvas;
const write_pixel = canvas_src.write_pixel;
const canvas_to_ppm = ppm_save.canvas_to_ppm;
const save_image = ppm_save.save_image;

const projectile = shoot_projectile([0, 1, 0], [1, 1.8, 0], [0, -0.1, 0], [-0.01, 0, 0], 11.25);

const c = canvas(900, 550);
const red = color(1, 0, 0);

projectile.forEach((p) => {
    write_pixel(c, Math.ceil(p.distance), Math.ceil(c.height - p.height), red);
});

const ppm = canvas_to_ppm(c);
save_image(ppm, 'projectile_render');