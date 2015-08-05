/*!
 * to-arg <https://github.com/jonschlinkert/to-arg>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps:mocha */
var should = require('should');
var toArg = require('./index');

describe('toArg', function () {
  it('should throw an error when invalid args are passed:', function () {
    (function () {
      toArg();
    }).should.throw('to-arg expects a string.');

    (function () {
      toArg(['abc']);
    }).should.throw('to-arg expects a string.');

    (function () {
      toArg('a', {});
    }).should.throw('to-arg expects the second argument to be an array or a primitive.');
  });

  it('should create a boolean flag from a key:', function () {
    toArg('abc').should.equal('--abc');
    toArg('a').should.equal('--a');
  });

  it('should create an arg from a key and value:', function () {
    toArg('a', 'xyz').should.equal('--a=xyz');
    toArg('aB', 'abc').should.equal('--a-b=abc');
  });

  it('should convert array values into a comma-separated list:', function () {
    toArg('a', [1, 2, 3]).should.equal('--a=1,2,3');
    toArg('a', ['foo', 'bar']).should.equal('--a=foo,bar');
  });

  it('should ignore empty strings as values:', function () {
    toArg('abc', '').should.equal('--abc');
  });

  it('should dash-case the key:', function () {
    toArg('abcXyz').should.equal('--abc-xyz');
    toArg('aBc').should.equal('--a-bc');
    toArg('a b c').should.equal('--a-b-c');
  });

  it('should not dash-case a single-character key:', function () {
    toArg('A').should.equal('--a');
  });

  it('should create a flag from boolean value:', function () {
    toArg('abc', true).should.equal('--abc');
    toArg('abc', true).should.not.equal('--abc=true');
    toArg('abc', 'true').should.equal('--abc=true');
  });

  it('should create an inverted flag when the value is strictly `false`:', function () {
    toArg('a', false).should.equal('--no-a');
    toArg('abc', false).should.not.equal('--abc');
    toArg('abc', false).should.equal('--no-abc');
    toArg('abc', true, {invert: true}).should.equal('--abc');
    toArg('abc', true, {invert: false}).should.equal('--abc');
  });

  it('should not create an inverted flag when `invert: false` is passed:', function () {
    toArg('abc', false, {invert: false}).should.not.equal('--no-abc');
    toArg('abc', false, {invert: false}).should.equal('--abc');
    toArg('abc', false, {invert: true}).should.equal('--no-abc');
  });

  it('should create an arg from numerical value:', function () {
    toArg('abc', 10).should.equal('--abc=10');
  });
});
