var expect = require('chai').expect;
var assert = require('chai').assert;


var Item = require('../item');

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

  it('should determine when .checkCollisionPoint is true (box)', function(done) {
    assert.equal(testItem.checkCollisionPoint(10, 10), true);
    assert.equal(testItem.checkCollisionPoint(0, 10), true);
    assert.equal(testItem.checkCollisionPoint(10, 0), true);
    assert.equal(testItem.checkCollisionPoint(50, 50), true);

    assert.equal(testItem.checkCollisionPoint(-50, 50), true);
    assert.equal(testItem.checkCollisionPoint(24, 10), true);

    done();
  });

  it('should determine when .checkCollisionPoint is false (box)', function(done) {
    assert.equal(testItem.checkCollisionPoint(-51, 10), false);
    assert.equal(testItem.checkCollisionPoint(-1, 51), false);
    assert.equal(testItem.checkCollisionPoint(10, -51), false);
    assert.equal(testItem.checkCollisionPoint(110, 100), false);

    assert.equal(testItem.checkCollisionPoint(50, 101), false);
    assert.equal(testItem.checkCollisionPoint(250, 10), false);

    done();
  });

  it('should determine when .checkCollisionPoint is true (circle)', function(done) {
    testItem.collisionShape = "circle";

    assert.equal(testItem.checkCollisionPoint(0, 0), true);
    assert.equal(testItem.checkCollisionPoint(-10, 10), true);
    assert.equal(testItem.checkCollisionPoint(25, 25), true);
    assert.equal(testItem.checkCollisionPoint(-20, -10), true);
    assert.equal(testItem.checkCollisionPoint(25, -10), true);


    done();
  });

  it('should determine when .checkCollisionPoint is false (circle)', function(done) {
    testItem.collisionShape = "circle";

    assert.equal(testItem.checkCollisionPoint(100, 100), false);
    assert.equal(testItem.checkCollisionPoint(-100, 100), false);
    assert.equal(testItem.checkCollisionPoint(90, 90), false);
    assert.equal(testItem.checkCollisionPoint(90, -100), false);
    assert.equal(testItem.checkCollisionPoint(250, -10), false);


    done();
  });


  it('should determine when .checkCollision is true (box and box)', function(done) {
    testItem2 = new Item("Test item 2", 10, 10, "none", 100, 100);
    assert.equal(testItem.checkCollision(testItem2), true);

    testItem2 = new Item("Test item 2", -10, -10, "none", 500, 500);
    assert.equal(testItem.checkCollision(testItem2), true);

    done();
  })
});
