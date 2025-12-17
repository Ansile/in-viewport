import { h, assert } from './fixtures/bootstrap.js';
import inViewport from '../in-viewport.js';
import { createOpenPromise } from 'o-promise';

describe('using the watcher API to dispose and watch again', function() {
  beforeEach(h.clean);
  afterEach(h.clean);

  var element;
  var watcher;
  var visible = false;

  beforeEach(function() {
    const {promise, resolve} = createOpenPromise();
    element = h.createTest({
      style: {
        top: '10000px'
      }
    });
    h.insertTest(element);
    watcher = inViewport(element, function() {
      visible = true;
    });
    // let in-viewport add the node to his watches
    setTimeout(resolve, 20);
    return promise;
  });

  describe('when the watcher is not active', function() {
    beforeEach(function() {
      watcher.dispose();
    });
    beforeEach(h.scroller(0, 10000));
    beforeEach(h.scroller(0, 0));

    it('cb not called', function() {
      assert.strictEqual(visible, false);
    });
  });

  describe('when the watcher is active', function() {
    beforeEach(function() {
      watcher.watch();
    });
    beforeEach(h.scroller(0, 10000));
    beforeEach(h.scroller(0, 0));

    it('cb called', function() {
      assert.strictEqual(visible, true);
    });
  });
});
