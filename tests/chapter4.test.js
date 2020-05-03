const transform = require('../src/transform');
const matrices = require('../src/matrices');
const tuples = require('../src/tuples');
const translation = transform.translation;
const multiply = matrices.multiply;
const inverse = matrices.inverse;
const point = tuples.point;
const vector = tuples.vector;

test('Multiplying by a translation matrix', () => {
    let t = translation(5, -3, 2);
    let p = point(-3, 4, 5);
    expect(multiply(t, p)).toEqual(point(2, 1, 7));
});

test('Multiplying by the inverse of a translation matrix', () => {
    let t = translation(5, -3, 2);
    let inv = inverse(t);
    let p = point(-3, 4, 5);
    expect(multiply(inv, p)).toEqual(point(-8, 7, 3));
});

test('Translation does not affect vectors', () => {
    let t = translation(5, -3, 2);
    let v = vector(-3, 4, 5);
    expect(multiply(t, v)).toEqual(v);
});