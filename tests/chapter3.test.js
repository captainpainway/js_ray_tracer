const matrices = require('../src/matrices');
const tuples = require('../src/tuples');
const utils = require('../src/utils');
const tuple = tuples.tuple;
const matrix = matrices.matrix;
const equality = matrices.equality;
const multiply = matrices.multiply;
const identity = matrices.identity;
const determinant = matrices.determinant;
const submatrix = matrices.submatrix;
const minor = matrices.minor;
const cofactor = matrices.cofactor;
const inverse = matrices.inverse;
const roundMatrix = utils.roundMatrix;

test('Constructing and inspecting a 4x4 matrix', () => {
    let m = matrix([1, 2, 3, 4, 5.5, 6.5, 7.5, 8.5, 9, 10, 11, 12, 13.5, 14.5, 15.5, 16.5]);
    expect(m[0][0]).toBe(1);
    expect(m[0][3]).toBe(4);
    expect(m[1][0]).toBe(5.5);
    expect(m[1][2]).toBe(7.5);
    expect(m[2][2]).toBe(11);
    expect(m[3][0]).toBe(13.5);
    expect(m[3][2]).toBe(15.5);
});

test('A 2x2 matrix', () => {
    let m = matrix([-3, 5, 1, -2]);
    expect(m[0][0]).toBe(-3);
    expect(m[0][1]).toBe(5);
    expect(m[1][0]).toBe(1);
    expect(m[1][1]).toBe(-2);
});

test('A 3x3 matrix', () => {
    let m = matrix([-3, 5, 0, 1, -2, -7, 0, 1, 1]);
    expect(m[0][0]).toBe(-3);
    expect(m[1][1]).toBe(-2);
    expect(m[2][2]).toBe(1);
});

test('Matrix equality with identical matrices', () => {
    let a = matrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2]);
    let b = matrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2]);
    expect(equality(a, b)).toEqual(true);
});

test('Matrix equality with different matrices', () => {
    let a = matrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2]);
    let b = matrix([2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
    expect(equality(a, b)).toEqual(false);
});

test('Multiplying two matrices', () => {
    let a = matrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2]);
    let b = matrix([-2, 1, 2, 3, 3, 2, 1, -1, 4, 3, 6, 5, 1, 2, 7, 8]);
    expect(multiply(a, b)).toEqual(matrix([20, 22, 50, 48, 44, 54, 114, 108, 40, 58, 110, 102, 16, 26, 46, 42]));
});

test('A matrix multiplied by a tuple', () => {
    let a = matrix([1, 2, 3, 4, 2, 4, 4, 2, 8, 6, 4, 1, 0, 0, 0, 1]);
    let b = tuple(1, 2, 3, 1);
    expect(multiply(a, b)).toEqual(tuple(18, 24, 33, 1));
});

test('Multiplying a matrix by the identity matrix', () => {
    let a = matrix([0, 1, 2, 4, 1, 2, 4, 8, 2, 4, 8, 16, 4, 8, 16, 32]);
    expect(identity(a)).toEqual(a);
});

test('Multiplying the identity matrix by a tuple', () => {
    let a = tuple(1, 2, 3, 4);
    expect(identity(a)).toEqual(a);
});

test('Calculating the determinant of a 2x2 matrix', () => {
    let a = matrix([1, 5, -3, 2]);
    expect(determinant(a)).toBe(17);
});

test('A submatrix of a 3x3 matrix is a 2x2 matrix', () => {
    let a = matrix([1, 5, 0, -3, 2, 7, 0, 6, -3]);
    expect(submatrix(a, 0, 2)).toEqual(matrix([-3, 2, 0, 6]));
});

test('A submatrix of a 4xr matrix is a 3x3 matrix', () => {
    let a = matrix([-6, 1, 1, 6, -8, 5, 8, 6, -1, 0, 8, 2, -7, 1, -1, 1]);
    expect(submatrix(a, 2, 1)).toEqual(matrix([-6, 1, 6, -8, 8, 6, -7, -1, 1]));
});

test('Calculating a minor of a 3x3 matrix', () => {
    let a = matrix([3, 5, 0, 2, -1, -7, 6, -1, 5]);
    let b = submatrix(a, 1, 0);
    expect(determinant(b)).toBe(25);
    expect(minor(a, 1, 0)).toBe(25);
});

test('Calculating a cofactor of a 3x3 matrix', () => {
    let a = matrix([3, 5, 0, 2, -1, -7, 6, -1, 5]);
    expect(minor(a, 0, 0)).toBe(-12);
    expect(cofactor(a, 0, 0)).toBe(-12);
    expect(minor(a, 1, 0)).toBe(25);
    expect(cofactor(a, 1, 0)).toBe(-25);
});

test('Calculating the determinant of a 3x3 matrix', () => {
    let a = matrix([1, 2, 6, -5, 8, -4, 2, 6, 4]);
    expect(cofactor(a, 0, 0)).toBe(56);
    expect(cofactor(a, 0, 1)).toBe(12);
    expect(cofactor(a, 0, 2)).toBe(-46);
    expect(determinant(a)).toBe(-196);
});

test('Calculating the determinant of a 4x4 matrix', () => {
    let a = matrix([-2, -8, 3, 5, -3, 1, 7, 3, 1, 2, -9, 6, -6, 7, 7, -9]);
    expect(cofactor(a, 0, 0)).toBe(690);
    expect(cofactor(a, 0, 1)).toBe(447);
    expect(cofactor(a, 0, 2)).toBe(210);
    expect(cofactor(a, 0, 3)).toBe(51);
    expect(determinant(a)).toBe(-4071);
});

test('Testing an invertible matrix for invertibility', () => {
    let a = matrix([6, 4, 4, 4, 5, 5, 7, 6, 4, -9, 3, -7, 9, 1, 7, -6]);
    expect(determinant(a)).toBe(-2120);
    expect(determinant(a)).not.toBe(0);
});

test('Testing a noninvertible matrix for invertibility', () => {
    let a = matrix([-4, 2, -2, -3, 9, 6, 2, 6, 0, -5, 1, -5, 0, 0, 0, 0]);
    expect(determinant(a)).toBe(0);
});

test('Calculating the inverse of a matrix', () => {
    let a = matrix([-5, 2, 6, -8, 1, -5, 1, 8, 7, 7, -6, -7, 1, -3, 7, 4]);
    let b = inverse(a);
    expect(determinant(a)).toBe(532);
    expect(cofactor(a, 2, 3)).toBe(-160);
    expect(b[3][2]).toBe(-160/532);
    expect(cofactor(a, 3, 2)).toBe(105);
    expect(b[2][3]).toBe(105/532);
    expect(roundMatrix(b, 5)).toMatchObject(matrix([0.21805, 0.45113, 0.24060, -0.04511, -0.80827, -1.45677, -0.44361, 0.52068, -0.07895, -0.22368, -0.05263, 0.19737, -0.52256, -0.81391, -0.30075, 0.30639]));
});

test('Calculating the inverse of another matrix', () => {
    let a = matrix([8, -5, 9, 2, 7, 5, 6, 1, -6, 0, 9, 6, -3, 0, -9, -4]);
    expect(roundMatrix(inverse(a), 5)).toMatchObject(matrix([-0.15385, -0.15385, -0.28205, -0.53846, -0.07692, 0.12308, 0.02564, 0.03077, 0.35897, 0.35897, 0.43590, 0.92308, -0.69231, -0.69231, -0.76923, -1.92308]));
});

test('Calculating the inverse of a third matrix', () => {
    let a = matrix([9, 3, 0, 9, -5, -2, -6, -3, -4, 9, 6, 4, -7, 6, 6, 2]);
    expect(roundMatrix(inverse(a), 5)).toMatchObject(matrix([-0.04074, -0.07778, 0.14444, -0.22222, -0.07778, 0.03333, 0.36667, -0.33333, -0.02901, -0.14630, -0.10926, 0.12963, 0.17778, 0.06667, -0.26667, 0.33333]));
});

test('Multiplying a product by its inverse', () => {
    let a = matrix([3, -9, 7, 3, 3, -8, 2, -9, -4, 4, 4, 1, -6, 5, -1, 1]);
    let b = matrix([8, 2, 2, 2, 3, -1, 7, 0, 7, 0, 5, 4, 6, -2, 0, 5]);
    let c = multiply(a, b);
    expect(roundMatrix(multiply(c, inverse(b)), 0)).toMatchObject(a);
});