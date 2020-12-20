"use strict";

var pageScraper = require('./pageScraper');

var fs = require('fs');

function scrapeAll(browserInstance) {
  var browser, scrapedData;
  return regeneratorRuntime.async(function scrapeAll$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(browserInstance);

        case 3:
          browser = _context.sent;
          scrapedData = {}; // Call the scraper for different set of books to be scraped

          _context.next = 7;
          return regeneratorRuntime.awrap(pageScraper.scraper(browser, 'Travel'));

        case 7:
          scrapedData['Travel'] = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(pageScraper.scraper(browser, 'Historical Fiction'));

        case 10:
          scrapedData['HistoricalFiction'] = _context.sent;
          _context.next = 13;
          return regeneratorRuntime.awrap(pageScraper.scraper(browser, 'Mystery'));

        case 13:
          scrapedData['Mystery'] = _context.sent;
          _context.next = 16;
          return regeneratorRuntime.awrap(browser.close());

        case 16:
          fs.writeFile("data.json", JSON.stringify(scrapedData), 'utf8', function (err) {
            if (err) {
              return console.log(err);
            }

            console.log("The data has been scraped and saved successfully! View it at './data.json'");
          });
          _context.next = 22;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          console.log("Could not resolve the browser instance => ", _context.t0);

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 19]]);
}

module.exports = function (browserInstance) {
  return scrapeAll(browserInstance);
};