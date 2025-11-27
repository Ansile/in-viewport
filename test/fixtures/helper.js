import merge from 'merge';

// Mock playground for testing environments where document isn't available
let playground = null;

// Try to initialize playground if document is available (browser environment)
try {
  playground = document.createElement('div');
} catch (e) {
  // If document is not available (Node.js environment), create a mock
  playground = {
    hasChildNodes: () => false,
    removeChild: () => {},
    insertBefore: () => {},
    childNodes: []
  };
}

export const createTest = function createTest(params) {
  params = params || {};

  var test = document.createElement(params.tagName || 'div');

  params.attributes = merge({
    // required by IE < 11, `'class'` instead of `class`
    'class': 'unit-test'
  }, params.attributes || {});

  for (var attr in params.attributes) {
    test.setAttribute(attr, params.attributes[attr]);
  }

  for(var prop in params.style) {
    test.style[prop] = params.style[prop];
  }

  return test;
};

export const insertTest = function insertTest(test, parent) {
  parent = parent || playground;
  parent.insertBefore(test,
    parent.hasChildNodes() ?
      parent.childNodes[0] :
      null); // required by IE <= 8 when no child nodes
};

export const clean = function clean() {
  scroll(0, 0);
  while (playground.hasChildNodes()) {
    playground.removeChild(playground.lastChild);
  }
};

export const scroller = function scroller(x, y, id, cb) {
  if (typeof cb === 'function') {
    setTimeout(function() {
      smartScroll(x, y, id && document.getElementById(id));
      setTimeout(cb, 70);
    }, 4);
  } else {
    return function(cb) {
      setTimeout(function() {
        smartScroll(x, y, id && document.getElementById(id));
        setTimeout(cb, 70);
      }, 4);
    }
  }
};

export const wait = function wait(ms) {
  return function(done) {
    setTimeout(done, ms);
  }
};

function smartScroll(x, y, container) {
  if (!container) {
    scroll(x || 0, y || 0);
  } else {
    // tricky, on IE8 this will triggers TWO scroll events
    container.scrollLeft = x;
    container.scrollTop = y;
  }
}
