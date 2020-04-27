const matrices = require('../src/matrices');
const tuples = require('../src/tuples');
const tuple = tuples.tuple;
const matrix = matrices.matrix;
const equality = matrices.equality;
const multiply = matrices.multiply;
const identity = matrices.identity;
const determinant = matrices.determinant;
const submatrix = matrices.submatrix;
const minor = matrices.minor;
const cofactor = matrices.cofactor;

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
    
});