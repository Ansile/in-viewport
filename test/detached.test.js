import { h, assert } from './fixtures/bootstrap.js';
import inViewport from '../in-viewport.js';

describe('detached DOM node', function() {
  beforeEach(h.clean);
  afterEach(h.clean);

  var visible = false;
  var test;

  beforeEach(function() {
    test = h.createTest();
    inViewport(test, function() {
      visible = true;
    });
  });

  it('cb not called', function() {
    assert.strictEqual(visible, false);
  });

  describe('when inserted into the DOM', function() {

    beforeEach(function() {
      h.insertTest(test);
    });

    describe('without scrolling', function () {
      if (typeof MutationObserver === 'function') {
        describe('when the browser supports `MutationObserver`', function () {

          beforeEach(h.wait(50));

          it('cb called', function() {
            assert.strictEqual(visible, true);
          });
        });
      }
    });

    describe('with scrolling', function () {
      it('cb called', function() {
        h.scroller(0, 100)
        h.scroller(0, 0)
        assert.strictEqual(visible, true);
      });
    });
  });
});
