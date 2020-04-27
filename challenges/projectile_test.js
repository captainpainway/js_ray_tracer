let shoot_projectile = require('./projectile');

const projectile = shoot_projectile([0, 1, 0], [1, 1, 0], [0, -0.1, 0], [-0.01, 0, 0]);

projectile.forEach((p) => {
    console.log(p);
});