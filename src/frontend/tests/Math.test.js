import { beforeEach, describe, expect, test } from '@jest/globals';
import Math from '../utils/math.js';

beforeEach(() => {
  expect.hasAssertions();
});

test.skip('7919 is a prime number', () => {
  // arrange
  const n = 7919;
  const expected = true;

  // act
  const actual = Math.isPrime(n);

  // assert
  expect(actual).toStrictEqual(expected);
});

test('7918 is not a prime number', () => {
  // arrange
  const n = 7918;
  const expected = false;

  // act
  const actual = Math.isPrime(n);

  // assert
  expect(actual).toStrictEqual(expected);
});

describe('isPrime', () => {
  test.each([2, 3, 5, 7])('when input is "%d" returns true', (n) => {
    const expected = true;
    const actual = Math.isPrime(n);
    expect(actual).toStrictEqual(expected);
  });

  test.each([0, 1, 4, 6])('when input is "%d" returns false', (n) => {
    const expected = false;
    const actual = Math.isPrime(n);
    expect(actual).toStrictEqual(expected);
  });
});

test.todo('function xyz should be tested in the future');
