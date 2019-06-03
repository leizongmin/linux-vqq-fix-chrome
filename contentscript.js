var actualCode = '(' + function () {
  'use strict';
  var navigator = window.navigator;
  var modifiedNavigator;
  if ('userAgent' in Navigator.prototype) {
    // Chrome 43+ moved all properties from navigator to the prototype,
    // so we have to modify the prototype instead of navigator.
    modifiedNavigator = Navigator.prototype;

  } else {
    // Chrome 42- defined the property on navigator.
    modifiedNavigator = Object.create(navigator);
    Object.defineProperty(window, 'navigator', {
      value: modifiedNavigator,
      configurable: false,
      enumerable: false,
      writable: false
    });
  }

  Object.defineProperties(modifiedNavigator, {
    userAgent: {
      value: navigator.userAgent.replace(/(\(.*Linux.*\))/, '(Macintosh; Intel Mac OS X 10_14_1)'),
      configurable: false,
      enumerable: true,
      writable: false
    },
    appVersion: {
      value: navigator.appVersion.replace(/(\(.*Linux.*\))/, '(Macintosh; Intel Mac OS X 10_14_1)'),
      configurable: false,
      enumerable: true,
      writable: false
    },
    platform: {
      value: 'darwin',
      configurable: false,
      enumerable: true,
      writable: false
    },
  });
} + ')();';

var s = document.createElement('script');
s.textContent = actualCode;
document.documentElement.appendChild(s);
s.remove();