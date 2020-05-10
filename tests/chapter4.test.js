const transform = require('../src/transform');
const matrices = require('../src/matrices');
const tuples = require('../src/tuples');
const translation = transform.translation;
const scaling = transform.scaling;
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

test('A scaling matrix applied to a point', () => {
    let t = scaling(2, 3, 4);
    let p = point(-4, 6, 8);
    expect(multiply(t, p)).toEqual(point(-8, 18, 32));
});

test('A scaling matrix applied to a vector', () => {
    let t = scaling(2, 3, 4);
    let v = vector(-4, 6, 8);
    expect(multiply(t, v)).toEqual(vector(-8, 18, 32));
});

test('Multiplying by the inverse of a scaling matrix', () => {
    let t = scaling(2, 3, 4);
    let inv = inverse(t);
    let v = vector(-4, 6, 8);
    expect(multiply(inv, v)).toEqual(vector(-2, 2, 2));
});

test('Reflection is scaling by a negative value', () => {
    let t = scaling(-1, 1, 1);
    let p = point(2, 3, 4);
    expect(multiply(t, p)).toEqual(point(-2, 3, 4));
});

test('Rotating a point around the x axis', () => {
    let p = point(0, 1, 0);
    let half_quarter = rotation_x(n / 4);
    let full_quarter = rotation_x(n / 2);
});