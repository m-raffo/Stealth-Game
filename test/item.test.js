var expect = require('chai').expect;
var assert = require('chai').assert;


var Item = require('../items');

describe('Item tests', function() {
  beforeEach(function() {
    loadImage = function(path) {
    }
    testItem = new Item("test item", 0, 0, "guy.png", 100, 100);
  });

  it('should be an object', function(done) {
    expect(testItem).to.be.a('object');
    done();
  });

  it('should give the correct name', function(done) {
    assert.equal(testItem.name, "test item");

    done();
  })

  it('should determine when .checkCollisionPoint is true', function(done) {
    assert.equal(testItem.checkCollisionPoint(10, 10), true);
    assert.equal(testItem.checkCollisionPoint(0, 10), true);
    assert.equal(testItem.checkCollisionPoint(10, 0), true);
    assert.equal(testItem.checkCollisionPoint(100, 100), true);

    assert.equal(testItem.checkCollisionPoint(50, 50), true);
    assert.equal(testItem.checkCollisionPoint(75, 10), true);

    done();
  });

  it('should determine when .checkCollisionPoint is false', function(done) {
    assert.equal(testItem.checkCollisionPoint(-10, 10), false);
    assert.equal(testItem.checkCollisionPoint(-1, 10), false);
    assert.equal(testItem.checkCollisionPoint(10, -1), false);
    assert.equal(testItem.checkCollisionPoint(110, 100), false);

    assert.equal(testItem.checkCollisionPoint(50, 101), false);
    assert.equal(testItem.checkCollisionPoint(250, 10), false);

    done();
  });
});
