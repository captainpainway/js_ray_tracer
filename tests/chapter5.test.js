const tuples = require('../src/tuples');
const raycaster = require('../src/raycaster');
const point = tuples.point;
const vector = tuples.vector;
const ray = raycaster.ray;
const position = raycaster.position;
const sphere = raycaster.sphere;
const intersect = raycaster.intersect;
const intersection = raycaster.intersection;
const intersections = raycaster.intersections;

test('Creating and querying a ray', () => {
    let origin = point(1, 2, 3);
    let direction = vector(4, 5, 6);
    let r = ray(origin, direction);
    expect(r.origin).toEqual(origin);
    expect(r.direction).toEqual(direction);
});

test('Computing a point from a distance', () => {
    let r = ray(point(2, 3, 4), vector(1, 0, 0));
    expect(position(r, 0)).toEqual(point(2, 3, 4));
    expect(position(r, 1)).toEqual(point(3, 3, 4));
    expect(position(r, -1)).toEqual(point(1, 3, 4));
    expect(position(r, 2.5)).toEqual(point(4.5, 3, 4));
});

test('A ray intersects a sphere at two points', () => {
    let r = ray(point(0, 0, -5), vector(0, 0, 1));
    let s = sphere();
    let xs = intersect(s, r);
    expect(xs.length).toBe(2);
    expect(xs[0].t).toBe(4.0);
    expect(xs[1].t).toBe(6.0);
});

test('A ray intersects a sphere at a tangent', () => {
    let r = ray(point(0, 1, -5), vector(0, 0, 1));
    let s = sphere();
    let xs = intersect(s, r);
    expect(xs.length).toBe(2);
    expect(xs[0].t).toBe(5.0);
    expect(xs[1].t).toBe(5.0);
});

test('A ray misses a sphere', () => {
    let r = ray(point(0, 2, -5), vector(0, 0, 1));
    let s = sphere();
    let xs = intersect(s, r);
    expect(xs.length).toBe(0);
});

test('A ray originates inside a sphere', () => {
    let r = ray(point(0, 0, 0), vector(0, 0, 1));
    let s = sphere();
    let xs = intersect(s, r);
    expect(xs.length).toBe(2);
    expect(xs[0].t).toBe(-1.0);
    expect(xs[1].t).toBe(1.0);
});

test('A sphere is behind a ray', () => {
    let r = ray(point(0, 0, 5), vector(0, 0, 1));
    let s = sphere();
    let xs = intersect(s, r);
    expect(xs.length).toBe(2);
    expect(xs[0].t).toBe(-6.0);
    expect(xs[1].t).toBe(-4.0);
});

test('An intersection encapsulates t and object', () => {
    let s = sphere();
    let i = intersection(3.5, s);
    expect(i.t).toBe(3.5);
    expect(i.object).toEqual(s);
});

test('Aggregating intersections', () => {
    let s = sphere();
    let i1 = intersection(1, s);
    let i2 = intersection(2, s);
    let xs = intersections(i1, i2);
    expect(xs.length).toBe(2);
    expect(xs[0].t).toBe(1);
    expect(xs[1].t).toBe(2);
});

test('Intersect sets the object on the intersection', () => {
    let r = ray(point(0, 0, -5), vector(0, 0, 1));
    let s = sphere();
    let xs = intersect(s, r);
    expect(xs.length).toBe(2);
    expect(xs[0].object).toEqual(s);
    expect(xs[1].object).toEqual(s);
});