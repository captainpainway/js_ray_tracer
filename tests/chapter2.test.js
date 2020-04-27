const colors = require('../src/colors');
const color = colors.color;
const add = colors.add;
const subtract = colors.subtract;
const scalar = colors.scalar;
const multiply = colors.multiply;

const canvas_src = require('../src/canvas');
const canvas = canvas_src.canvas;
const write_pixel = canvas_src.write_pixel;
const pixel_at = canvas_src.pixel_at;

const canvas_to_ppm = require('../src/ppm_save').canvas_to_ppm;

test('Colors are (red, green, blue) tuples', () => {
    let c = color(-0.5, 0.4, 1.7);
    expect(c.red).toBe(-0.5);
    expect(c.green).toBe(0.4);
    expect(c.blue).toBe(1.7);
});

test('Adding colors', () => {
    let c1 = color(0.9, 0.6, 0.75);
    let c2 = color(0.7, 0.1, 0.25);
    expect(add(c1, c2)).toEqual(color(1.6, 0.7, 1.0));
});

test('Subtracting colors', () => {
    let c1 = color(0.9, 0.6, 0.75);
    let c2 = color(0.7, 0.1, 0.25);
    expect(subtract(c1, c2).red).toBeCloseTo(color(0.2, 0.5, 0.5).red);
    expect(subtract(c1, c2).green).toBeCloseTo(color(0.2, 0.5, 0.5).green);
    expect(subtract(c1, c2).blue).toBeCloseTo(color(0.2, 0.5, 0.5).blue);
});

test('Multiplying a color by a scalar', () => {
    let c = color(0.2, 0.3, 0.4);
    expect(scalar(c, 2)).toEqual(color(0.4, 0.6, 0.8));
});

test('Multiplying colors', () => {
    let c1 = color(1, 0.2, 0.4);
    let c2 = color(0.9, 1, 0.1);
    expect(multiply(c1, c2).red).toBeCloseTo(color(0.9, 0.2, 0.04).red);
    expect(multiply(c1, c2).green).toBeCloseTo(color(0.9, 0.2, 0.04).green);
    expect(multiply(c1, c2).blue).toBeCloseTo(color(0.9, 0.2, 0.04).blue);
});

test('Creating a canvas', () => {
    let c = canvas(10, 20);
    expect(c.width).toBe(10);
    expect(c.height).toBe(20);
    for (let y = 0; y < c.height; y++) {
        for (let x = 0; x < c.width; x++) {
            expect(c.pixel[y][x].color).toEqual(color(0, 0, 0));
        }
    }
});

test('Writing pixels to a canvas', () => {
    let c = canvas(10, 20);
    let red = color(1, 0, 0);
    write_pixel(c, 2, 3, red);
    expect(pixel_at(c, 2, 3)).toEqual(red);
});

test('Constructing the PPM header', () => {
    let c = canvas(5, 3);
    let ppm = canvas_to_ppm(c);
    let lines = ppm.split('\n');
    expect(lines[0]).toBe(`P3`);
    expect(lines[1]).toBe(`5 3`);
    expect(lines[2]).toBe(`255`);
});

test('Constructing the PPM pixel data', () => {
    let c = canvas(5, 3);
    let c1 = color(1.5, 0, 0);
    let c2 = color(0, 0.5, 0);
    let c3 = color(-0.5, 0, 1);
    write_pixel(c, 0, 0, c1);
    write_pixel(c, 2, 1, c2);
    write_pixel(c, 4, 2, c3);
    let ppm = canvas_to_ppm(c);
    let lines = ppm.split('\n');
    expect(lines[3]).toBe(`255 0 0 0 0 0 0 0 0 0 0 0 0 0 0`);
    expect(lines[4]).toBe(`0 0 0 0 0 0 0 128 0 0 0 0 0 0 0`);
    expect(lines[5]).toBe(`0 0 0 0 0 0 0 0 0 0 0 0 0 0 255`);
});

test('Splitting long lines in PPM files', () => {
    let c = canvas(10, 2);
    let col = color(1, 0.8, 0.6);
    for (let y = 0; y < c.height; y++) {
        for (let x = 0; x < c.width; x++) {
            write_pixel(c, x, y, col);
        }
    }
    let ppm = canvas_to_ppm(c);
    let lines = ppm.split('\n');
    expect(lines[3]).toBe(`255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204`);
    expect(lines[4]).toBe(` 153 255 204 153 255 204 153 255 204 153 255 204 153`);
    expect(lines[5]).toBe(`255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204`);
    expect(lines[6]).toBe(` 153 255 204 153 255 204 153 255 204 153 255 204 153`);
});

test('PPM files are terminated by a newline character', () => {
    let c = canvas(5, 3);
    let ppm = canvas_to_ppm(c);
    expect(/\n$/.test(ppm)).toBe(true);
});