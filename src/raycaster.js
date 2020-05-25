const tuples = require('../src/tuples');
const add = tuples.add;
const subtract = tuples.subtract;
const multiply = tuples.multiply;
const point = tuples.point;
const dot = tuples.dot;

/**
 * Create a ray from a point and vector.
 * @param {point} o
 * @param {vector} d
 * @returns {{origin: *, direction: *}}
 */
const ray = (o, d) => {
    return {origin: o, direction: d};
};

/**
 * Find the position of a ray at a given time.
 * @param {object} ray
 * @param {number} t
 * @returns {{x: *, y: *, z: *, w: *}}
 */
const position = (ray, t) => {
    return add(ray.origin, multiply(ray.direction, t));
};

/**
 * Returns a unique sphere.
 * @returns {{id: number}}
 */
const sphere = () => {
    return {id: Date.now()};
};

/**
 * Calculate the intersection of a ray and a sphere.
 * @param {object} s
 * @param {object} r
 * @returns {*}
 */
const intersect = (s, r) => {
    let sphere_to_ray = subtract(r.origin, point(0, 0, 0));
    let a = dot(r.direction, r.direction);
    let b = 2 * dot(r.direction, sphere_to_ray);
    let c = dot(sphere_to_ray, sphere_to_ray) - 1;
    const discriminant = Math.pow(b, 2) - 4 * a * c;
    if (discriminant < 0) {
        return [];
    }
    const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
    const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);
    return intersections(intersection(t1, s), intersection(t2, s));
};

const intersection = (t, s) => {
    return {t: t, object: s};
};

const intersections = (i1, i2) => {
    return [i1, i2];
};

module.exports = {
    ray,
    position,
    sphere,
    intersect,
    intersection,
    intersections
};