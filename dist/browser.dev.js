"use strict";

var puppeteer = require('puppeteer');

function startBrowser() {
  var browser;
  return regeneratorRuntime.async(function startBrowser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log("Opening the browser......");
          _context.next = 4;
          return regeneratorRuntime.awrap(puppeteer.launch({
            headless: false,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
          }));

        case 4:
          browser = _context.sent;
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log("Could not create a browser instance => : ", _context.t0);

        case 10:
          return _context.abrupt("return", browser);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

module.exports = {
  startBrowser: startBrowser
};