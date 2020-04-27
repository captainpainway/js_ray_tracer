const fs = require('fs');

/**
 * Create the PPM file header.
 * @param {object} c
 * @returns {string}
 */
const create_header = (c) => {
    const identifier = 'P3';
    const dimensions = `${c.width} ${c.height}`;
    const max_color_value = '255';
    return `${identifier}\n${dimensions}\n${max_color_value}`;
};

/**
 * Convert decimal colors to RGB values.
 * @param {number} color
 * @returns {number}
 */
const convert = (color) => {
    if (color > 1) {
        return 255;
    } else if (color < 0) {
        return 0;
    } else {
        return Math.ceil(255 * color);
    }
};

/**
 * Trim RGB value lines to a maximum of 70 characters.
 * @param {string} row
 * @returns {*}
 */
const trim_lines = (row) => {
    if (row.length <= 70) return [row];

    let pointer = 69;
    while (row[pointer] !== ' ') {
        pointer--;
    }
    return [row.slice(0, pointer), row.slice(pointer)];
};

/**
 * Convert canvas colors to a string of RGB values.
 * @param {object} c
 * @returns {string}
 */
const color_conversion = (c) => {
    let colors = [];
    for (let y = 0; y < c.height; y++) {
        let row = '';
        for (let x = 0; x < c.width; x++) {
            let color = c.pixel[y][x].color;
            row += `${convert(color.red)} `;
            row += `${convert(color.green)} `;
            row += `${convert(color.blue)} `;
        }
        row = row.trim();
        row = trim_lines(row);
        colors.push(row[0]);
        while (row.length > 1) {
            row = trim_lines(row[1]);
            colors.push(row[0]);
        }
    }
    return colors.join('\n');
};

/**
 * Create a PPM file string.
 * @param {object} c
 * @returns {string}
 */
const canvas_to_ppm = (c) => {
    let header = create_header(c);
    let colors = color_conversion(c);
    let ppm_file = `${header}\n${colors}\n`;
    return ppm_file;
};

/**
 * Save a PPM image to a specified filename.
 * @param {string} data - PPM-formatted string to write to file.
 * @param {string} filename
 */
const save_image = (data, filename) => {
    if (!filename || filename === 'undefined') {
        console.error('File name required');
        return;
    }
    fs.writeFile(`images/${filename}.ppm`, data, (err) => {
        if (err) throw err;
        console.log(`Render ${filename}.ppm saved.`);
    });
};

module.exports = {
    canvas_to_ppm,
    save_image
};