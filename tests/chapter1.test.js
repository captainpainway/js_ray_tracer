const tuples = require('../src/tuples');
const tuple = tuples.tuple;
const point = tuples.point;
const vector = tuples.vector;
const add = tuples.add;
const subtract = tuples.subtract;
const zero = tuples.zero;
const negate = tuples.negate;
const multiply = tuples.multiply;
const divide = tuples.divide;
const magnitude = tuples.magnitude;
const normalize = tuples.normalize;
const dot = tuples.dot;
const cross = tuples.cross;

test('A tuple with w=1.0 is a point', () => {
    let a = tuple(4.3, -4.2, 3.1, 1.0);
    expect(a.x).toBe(4.3);
    expect(a.y).toBe(-4.2);
    expect(a.z).toBe(3.1);
    expect(a.w).toBe(1.0);
});

test('A tuple with w=0 is a vector', () => {
    let a = tuple(4.3, -4.2, 3.1, 0.0);
    expect(a.x).toBe(4.3);
    expect(a.y).toBe(-4.2);
    expect(a.z).toBe(3.1);
    expect(a.w).toBe(0.0);
});

test('point() creates tuples with w=1', () => {
    let p = point(4, -4, 3);
    expect(p).toEqual(tuple(4, -4, 3, 1));
});

test('vector() creates tuples with w=0', () => {
    let v = vector(4, -4, 3);
    expect(v).toEqual(tuple(4, -4, 3, 0));
});

test('Adding two tuples', () => {
    let a1 = tuple(3, -2, 5, 1);
    let a2 = tuple(-2, 3, 1, 0);
    expect(add(a1, a2)).toEqual(tuple(1, 1, 6, 1));
});

test('Subtracting two points', () => {
    let p1 = point(3, 2, 1);
    let p2 = point(5, 6, 7);
    expect(subtract(p1, p2)).toEqual(vector(-2, -4, -6));
});

test('Subtracting a vector from a point', () => {
    let p = point(3, 2, 1);
    let v = vector(5, 6, 7);
    expect(subtract(p, v)).toEqual(point(-2, -4, -6));
});

test('Subtracting two vectors', () => {
    let v1 = vector(3, 2, 1);
    let v2 = vector(5, 6, 7);
    expect(subtract(v1, v2)).toEqual(vector(-2, -4, -6));
});

test('Subtracting a vector from the zero vector', () => {
    let v = vector(1, -2, 3);
    expect(zero(v)).toEqual(vector(-1, 2, -3));
});

test('Negating a tuple', () => {
    expect(negate(tuple(1, -2, 3, -4))).toEqual(tuple(-1, 2, -3, 4));
});

test('Multiplying a tuple by a scalar', () => {
    let a = tuple(1, -2, 3, -4);
    expect(multiply(a, 3.5)).toEqual(tuple(3.5, -7, 10.5, -14));
});

test('Multiplying a tuple by a fraction', () => {
    let a = tuple(1, -2, 3, -4);
    expect(multiply(a, 0.5)).toEqual(tuple(0.5, -1, 1.5, -2));
});

test('Dividing a tuple by a scalar', () => {
    let a = tuple(1, -2, 3, -4);
    expect(divide(a, 2)).toEqual(tuple(0.5, -1, 1.5, -2));
});

test('Computing the magintude of vector(1, 0, 0)', () => {
    let v = vector(1, 0, 0);
    expect(magnitude(v)).toEqual(1);
});

test('Computing the magnitude of vector(0, 1, 0)', () => {
    let v = vector(0, 1, 0);
    expect(magnitude(v)).toEqual(1);
});

test('Computing the magnitude of vector(0, 0, 1)', () => {
    let v = vector(0, 0, 1);
    expect(magnitude(v)).toEqual(1);
});

test('Computing the magnitude of vector(1, 2, 3)', () => {
    let v = vector(1, 2, 3);
    expect(magnitude(v)).toEqual(Math.sqrt(14));
});

test('Computing the magnitude of vector(-1, -2, -3)', () => {
    let v = vector(-1, -2, -3);
    expect(magnitude(v)).toEqual(Math.sqrt(14));
});

test('Normalizing vector(4, 0, 0) gives (1, 0, 0)', () => {
    let v = vector(4, 0, 0);
    expect(normalize(v)).toEqual(vector(1, 0, 0));
});

test('Normalizing vector(1, 2, 3)', () => {
    let v = vector(1, 2, 3);
    expect(normalize(v)).toEqual(vector(1/Math.sqrt(14), 2/Math.sqrt(14), 3/Math.sqrt(14)));
});

test('The magnitude of a normalized vector', () => {
    let v = vector(1, 2, 3);
    let norm = normalize(v);
    expect(magnitude(norm)).toEqual(1);
});

test('The dot product of two tuples', () => {
    let a = vector(1, 2, 3);
    let b = vector(2, 3, 4);
    expect(dot(a, b)).toEqual(20);
});

test('The cross product of two vectors', () => {
    let a = vector(1, 2, 3);
    let b = vector(2, 3, 4);
    expect(cross(a, b)).toEqual(vector(-1, 2, -1));
    expect(cross(b, a)).toEqual(vector(1, -2, 1));
});