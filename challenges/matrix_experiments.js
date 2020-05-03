const matrices = require('../src/matrices');
const utils = require('../src/utils');
const tuples = require('../src/tuples');
const matrix = matrices.matrix;
const inverse = matrices.inverse;
const multiply = matrices.multiply;
const transpose = matrices.transpose;
const equality = matrices.equality;
const roundMatrix = utils.roundMatrix;
const tuple = tuples.tuple;

const identity_matrix = matrix([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
const m = matrix([3, -9, 7, 3, 3, -8, 2, -9, -4, 4, 4, 1, -6, 5, -1, 1]);

console.log("1. What happens when you invert the identity matrix?");
console.log(inverse(identity_matrix));

console.log("\n2. What do you get when you multiply a matrix by its inverse?");
const i = inverse(m);
console.log(roundMatrix(multiply(m, i)));

console.log("\n3. Is there any difference between the inverse of the transpose of a matrix, and the transpose of the inverse?");
let m1 = inverse(transpose(m));
let m2 = transpose(inverse(m));
console.log("Are they equal? " + equality(m1, m2));

console.log("\n4. Remember how multiplying the identity matrix by a tuple gives you the tuple, unchanged? Now, try changing any single element of the identity matrix to a different number, and then multiplying it by a tuple. What happens to the tuple?");
let t = tuple(1, 2, 3, 0);
console.log(multiply(identity_matrix, t));
let new_identity_matrix = matrix([1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
console.log("New identity matrix: " + new_identity_matrix);
console.log(multiply(new_identity_matrix, t));

