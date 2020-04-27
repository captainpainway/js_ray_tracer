const tuples = require('../src/tuples');
const point = tuples.point;
const vector = tuples.vector;
const add = tuples.add;
const multiply = tuples.multiply;
const normalize = tuples.normalize;

const projectile = (p, v) => {
    return {position: p, velocity: v};
};

const environment = (g, w) => {
    return {gravity: g, wind: w};
};

const tick = (proj, env) => {
    let position = add(proj.position, proj.velocity);
    let velocity = add(add(proj.velocity, env.gravity), env.wind);
    return projectile(position, velocity);
};

const shoot_projectile = (position, velocity, gravity, wind, velocity_multiplier = 1) => {
    let location_arr = [];
    let p = projectile(point(...position), multiply(normalize(vector(...velocity)), velocity_multiplier));
    let e = environment(vector(...gravity), vector(...wind));

    let count = 0;
    while (p.position.y > 0) {
        location_arr.push({
            tick: count,
            height: p.position.y,
            distance: p.position.x
        });
        p = tick(p, e);
        count++;
    }
    return location_arr;
};

module.exports = shoot_projectile;
