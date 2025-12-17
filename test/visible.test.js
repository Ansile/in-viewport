import { h, assert } from './fixtures/bootstrap.js';
import inViewport from '../in-viewport.js';
import { createOpenPromise } from 'o-promise';

describe('asking if a visible div scrolled', function() {
  beforeEach(h.clean);
  afterEach(h.clean);

  var scrolled = false;
  var test;

  beforeEach(function(done) {
    test = h.createTest();
    h.insertTest(test);
  });

  it('callback called', async function() {
    const {promise, resolve} = createOpenPromise();

    inViewport(test, function() {
      scrolled = true;
      resolve();
    });

    await promise;

    assert(scrolled === true);
  }, 500);
});
