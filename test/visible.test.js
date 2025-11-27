import { h, assert } from './fixtures/bootstrap.js';

describe('asking if a visible div scrolled', function() {
  beforeEach(h.clean);
  afterEach(h.clean);

  var scrolled = false;
  var test;

  beforeEach(function(done) {
    test = h.createTest();
    h.insertTest(test);
    inViewport(test, function() {
      scrolled = true;
      done();
    });
  });

  it('callback called', function() {
    assert(scrolled === true);
  });
});
