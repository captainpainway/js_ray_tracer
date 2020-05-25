const transform = require('../src/transform');
const matrices = require('../src/matrices');
const tuples = require('../src/tuples');
const utils = require('../src/utils');
const translation = transform.translation;
const scaling = transform.scaling;
const rotation_x = transform.rotation_x;
const rotation_y = transform.rotation_y;
const rotation_z = transform.rotation_z;
const shearing = transform.shearing;
const multiply = matrices.multiply;
const inverse = matrices.inverse;
const point = tuples.point;
const vector = tuples.vector;
const roundPoint = utils.roundPoint;

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
    let half_quarter = rotation_x(Math.PI / 4);
    let full_quarter = rotation_x(Math.PI / 2);
    let expected = point(0, Math.sqrt(2)/2, Math.sqrt(2)/2);
    expect(multiply(half_quarter, p).x).toBeCloseTo(expected.x);
    expect(multiply(half_quarter, p).y).toBeCloseTo(expected.y);
    expect(multiply(half_quarter, p).z).toBeCloseTo(expected.z);
    expected = point(0, 0, 1);
    expect(multiply(full_quarter, p).x).toBeCloseTo(expected.x);
    expect(multiply(full_quarter, p).y).toBeCloseTo(expected.y);
    expect(multiply(full_quarter, p).z).toBeCloseTo(expected.z);
});

test('The inverse of an x-rotation rotates in the opposite direction', () => {
    let p = point(0, 1, 0);
    let half_quarter = rotation_x(Math.PI / 4);
    let inv = inverse(half_quarter);
    let expected = point(0, Math.sqrt(2)/2, -Math.sqrt(2)/2);
    expect(multiply(inv, p).x).toBeCloseTo(expected.x);
    expect(multiply(inv, p).y).toBeCloseTo(expected.y);
    expect(multiply(inv, p).z).toBeCloseTo(expected.z);
});

test('Rotating a point around the y axis', () => {
    let p = point(0, 0, 1);
    let half_quarter = rotation_y(Math.PI / 4);
    let full_quarter = rotation_y(Math.PI / 2);
    let expected = point(Math.sqrt(2)/2, 0, Math.sqrt(2)/2);
    expect(multiply(half_quarter, p).x).toBeCloseTo(expected.x);
    expect(multiply(half_quarter, p).y).toBeCloseTo(expected.y);
    expect(multiply(half_quarter, p).z).toBeCloseTo(expected.z);
    expected = point(1, 0, 0);
    expect(multiply(full_quarter, p).x).toBeCloseTo(expected.x);
    expect(multiply(full_quarter, p).y).toBeCloseTo(expected.y);
    expect(multiply(full_quarter, p).z).toBeCloseTo(expected.z);
});

test('Rotating a point around the z axis', () => {
    let p = point(0, 1, 0);
    let half_quarter = rotation_z(Math.PI / 4);
    let full_quarter = rotation_z(Math.PI / 2);
    let expected = point(-Math.sqrt(2)/2, Math.sqrt(2)/2, 0);
    expect(multiply(half_quarter, p).x).toBeCloseTo(expected.x);
    expect(multiply(half_quarter, p).y).toBeCloseTo(expected.y);
    expect(multiply(half_quarter, p).z).toBeCloseTo(expected.z);
    expected = point(-1, 0, 0);
    expect(multiply(full_quarter, p).x).toBeCloseTo(expected.x);
    expect(multiply(full_quarter, p).y).toBeCloseTo(expected.y);
    expect(multiply(full_quarter, p).z).toBeCloseTo(expected.z);
});

test('A shearing transformation moves x in proportion to y', () => {
    let t = shearing(1, 0, 0, 0, 0, 0);
    let p = point(2,3, 4);
    expect(multiply(t, p)).toEqual(point(5, 3, 4));
});

test('A shearing transformation moves x in proportion to z', () => {
    let t = shearing(0, 1, 0, 0, 0, 0);
    let p = point(2, 3, 4);
    expect(multiply(t, p)).toEqual(point(6, 3, 4));
});

test('A shearing transformation moves y in proportion to x', () => {
    let t = shearing(0, 0, 1, 0, 0, 0);
    let p = point(2, 3, 4);
    expect(multiply(t, p)).toEqual(point(2, 5, 4));
});

test('A shearing transformation moves y in proportion to z', () => {
    let t = shearing(0, 0, 0, 1, 0, 0);
    let p = point(2, 3, 4);
    expect(multiply(t, p)).toEqual(point(2, 7, 4));
});

test('A shearing transformation moves z in proportion to x', () => {
    let t = shearing(0, 0, 0, 0, 1, 0);
    let p = point(2, 3, 4);
    expect(multiply(t, p)).toEqual(point(2, 3, 6));
});

test('A shearing transformation moves z in proportion to y', () => {
    let t = shearing(0, 0, 0, 0, 0, 1);
    let p = point(2, 3, 4);
    expect(multiply(t, p)).toEqual(point(2, 3, 7));
});

test('Individual transformations are applied in sequence', () => {
    let p = point(1, 0, 1);
    let A = rotation_x(Math.PI / 2);
    let B = scaling(5, 5, 5);
    let C = translation(10, 5, 7);
    let p2 = roundPoint(multiply(A, p));
    expect(p2).toEqual(point(1, -1, 0));
    let p3 = multiply(B, p2);
    expect(p3).toEqual(point(5, -5, 0));
    let p4 = multiply(C, p3);
    expect(p4).toEqual(point(15, 0, 7));
});

test('Chained transformations must be applied in reverse order', () => {
    let p = point(1, 0, 1);
    let A = rotation_x(Math.PI / 2);
    let B = scaling(5, 5, 5);
    let C = translation(10, 5, 7);
    let T = multiply(C, multiply(B, A));
    expect(multiply(T, p)).toEqual(point(15, 0, 7));
});