import { h, assert } from './fixtures/bootstrap.js';
import inViewport from '../in-viewport.js';
import {createOpenPromise} from 'o-promise'

describe('usage with high debounce', function() {
  beforeEach(h.clean);
  afterEach(h.clean);

  var scrolled = false;
  var test;

  beforeEach(function() {
    test = h.createTest();
    h.insertTest(test);
  });

  it('callback called', async function() {
    const {promise, resolve} = createOpenPromise();

    inViewport(
      test,
      {
        debounce: 500

      },
      function() {
        scrolled = true;
        resolve();
      }
    );

    await promise;

    assert(scrolled === true);
  }, 1500);
});
