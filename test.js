/*!
 * to-flag <https://github.com/jonschlinkert/to-flag>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps: mocha */
var should = require('should');
var toFlag = require('./');

describe('toFlag', function () {
  it('should throw an error when invalid args are passed:', function () {
    (function () {
      toFlag();
    }).should.throw('expected a string.');

    (function () {
      toFlag(['abc']);
    }).should.throw('expected a string.');

    (function () {
      toFlag('a', function(){});
    }).should.throw('second argument should be an array, object or primitive.');
  });

  it('should create a boolean flag from a key:', function () {
    toFlag('abc').should.equal('--abc');
    toFlag('a').should.equal('--a');
  });

  it('should create an arg from a key and value:', function () {
    toFlag('a', 'xyz').should.equal('--a=xyz');
    toFlag('aB', 'abc').should.equal('--a-b=abc');
  });

  it('should convert array values into a comma-separated list:', function () {
    toFlag('a', [1, 2, 3]).should.equal('--a=1,2,3');
    toFlag('a', ['foo', 'bar']).should.equal('--a=foo,bar');
  });

  it('should ignore empty strings as values:', function () {
    toFlag('abc', '').should.equal('--abc');
  });

  it('should dash-case the key:', function () {
    toFlag('abcXyz').should.equal('--abc-xyz');
    toFlag('aBc').should.equal('--a-bc');
    toFlag('a b c').should.equal('--a-b-c');
  });

  it('should not dash-case a single-character key:', function () {
    toFlag('A').should.equal('--A');
  });

  it('should create a flag from boolean value:', function () {
    toFlag('abc', true).should.equal('--abc');
    toFlag('abc', true).should.not.equal('--abc=true');
    toFlag('abc', 'true').should.equal('--abc=true');
  });

  it('should create an inverted flag when the value is strictly `false`:', function () {
    toFlag('a', false).should.equal('--no-a');
    toFlag('abc', false).should.not.equal('--abc');
    toFlag('abc', false).should.equal('--no-abc');
    toFlag('abc', true, {invert: true}).should.equal('--abc');
    toFlag('abc', true, {invert: false}).should.equal('--abc');
  });

  it('should not create an inverted flag when `invert: false` is passed:', function () {
    toFlag('abc', false, {invert: false}).should.not.equal('--no-abc');
    toFlag('abc', false, {invert: false}).should.equal('--abc');
    toFlag('abc', false, {invert: true}).should.equal('--no-abc');
  });

  it('should create an arg from numerical value:', function () {
    toFlag('abc', 10).should.equal('--abc=10');
  });

  it('should create an arg from object values:', function () {
    toFlag('set', {a: 'b'}).should.equal('--set=a:b');
    toFlag('set', {a: 'b', c: 'd'}).should.equal('--set=a:b|c:d');
    toFlag('set', {a: 'b', c: 'd', e: 'f'}).should.equal('--set=a:b|c:d|e:f');
    toFlag('set', {a: {b: 'c'}}).should.equal('--set=a.b:c');
  });
});
