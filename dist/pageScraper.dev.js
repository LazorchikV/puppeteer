"use strict";

var scraperObject = {
  url: 'http://books.toscrape.com',
  scraper: function scraper(browser, category) {
    var page, selectedCategory, scrapedData, scrapeCurrentPage, data;
    return regeneratorRuntime.async(function scraper$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            scrapeCurrentPage = function _ref() {
              var urls, pagePromise, currentPageData, nextButtonExist, nextButton;
              return regeneratorRuntime.async(function scrapeCurrentPage$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return regeneratorRuntime.awrap(page.waitForSelector('.page_inner'));

                    case 2:
                      _context2.next = 4;
                      return regeneratorRuntime.awrap(page.$$eval('section ol > li', function (links) {
                        // Make sure the book to be scraped is in stock
                        links = links.filter(function (link) {
                          return link.querySelector('.instock.availability > i').textContent !== "In stock";
                        }); // Extract the links from the data

                        links = links.map(function (el) {
                          return el.querySelector('h3 > a').href;
                        });
                        return links;
                      }));

                    case 4:
                      urls = _context2.sent;

                      // Loop through each of those links, open a new page instance and get the relevant data from them
                      pagePromise = function pagePromise(link) {
                        return new Promise(function _callee(resolve, reject) {
                          var dataObj, newPage;
                          return regeneratorRuntime.async(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  dataObj = {};
                                  _context.next = 3;
                                  return regeneratorRuntime.awrap(browser.newPage());

                                case 3:
                                  newPage = _context.sent;
                                  _context.next = 6;
                                  return regeneratorRuntime.awrap(newPage["goto"](link));

                                case 6:
                                  _context.next = 8;
                                  return regeneratorRuntime.awrap(newPage.$eval('.product_main > h1', function (text) {
                                    return text.textContent;
                                  }));

                                case 8:
                                  dataObj['bookTitle'] = _context.sent;
                                  _context.next = 11;
                                  return regeneratorRuntime.awrap(newPage.$eval('.price_color', function (text) {
                                    return text.textContent;
                                  }));

                                case 11:
                                  dataObj['bookPrice'] = _context.sent;
                                  _context.next = 14;
                                  return regeneratorRuntime.awrap(newPage.$eval('.instock.availability', function (text) {
                                    // Strip new line and tab spaces
                                    text = text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, ""); // Get the number of stock available

                                    var regexp = /^.*\((.*)\).*$/i;
                                    var stockAvailable = regexp.exec(text)[1].split(' ')[0];
                                    return stockAvailable;
                                  }));

                                case 14:
                                  dataObj['noAvailable'] = _context.sent;
                                  _context.next = 17;
                                  return regeneratorRuntime.awrap(newPage.$eval('#product_gallery img', function (img) {
                                    return img.src;
                                  }));

                                case 17:
                                  dataObj['imageUrl'] = _context.sent;
                                  _context.next = 20;
                                  return regeneratorRuntime.awrap(newPage.$eval('#product_description', function (div) {
                                    return div.nextSibling.nextSibling.textContent;
                                  }));

                                case 20:
                                  dataObj['bookDescription'] = _context.sent;
                                  _context.next = 23;
                                  return regeneratorRuntime.awrap(newPage.$eval('.table.table-striped > tbody > tr > td', function (table) {
                                    return table.textContent;
                                  }));

                                case 23:
                                  dataObj['upc'] = _context.sent;
                                  resolve(dataObj);
                                  _context.next = 27;
                                  return regeneratorRuntime.awrap(newPage.close());

                                case 27:
                                case "end":
                                  return _context.stop();
                              }
                            }
                          });
                        });
                      };

                      _context2.t0 = regeneratorRuntime.keys(urls);

                    case 7:
                      if ((_context2.t1 = _context2.t0()).done) {
                        _context2.next = 15;
                        break;
                      }

                      link = _context2.t1.value;
                      _context2.next = 11;
                      return regeneratorRuntime.awrap(pagePromise(urls[link]));

                    case 11:
                      currentPageData = _context2.sent;
                      scrapedData.push(currentPageData); // console.log(currentPageData);

                      _context2.next = 7;
                      break;

                    case 15:
                      // When all the data on this page is done, click the next button and start the scraping of the next page
                      // You are going to check if this button exist first, so you know if there really is a next page.
                      nextButtonExist = false;
                      _context2.prev = 16;
                      _context2.next = 19;
                      return regeneratorRuntime.awrap(page.$eval('.next > a', function (a) {
                        return a.textContent;
                      }));

                    case 19:
                      nextButton = _context2.sent;
                      nextButtonExist = true;
                      _context2.next = 26;
                      break;

                    case 23:
                      _context2.prev = 23;
                      _context2.t2 = _context2["catch"](16);
                      nextButtonExist = false;

                    case 26:
                      if (!nextButtonExist) {
                        _context2.next = 30;
                        break;
                      }

                      _context2.next = 29;
                      return regeneratorRuntime.awrap(page.click('.next > a'));

                    case 29:
                      return _context2.abrupt("return", scrapeCurrentPage());

                    case 30:
                      _context2.next = 32;
                      return regeneratorRuntime.awrap(page.close());

                    case 32:
                      return _context2.abrupt("return", scrapedData);

                    case 33:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, null, null, [[16, 23]]);
            };

            _context3.next = 3;
            return regeneratorRuntime.awrap(browser.newPage());

          case 3:
            page = _context3.sent;
            console.log("Navigating to ".concat(this.url, "...")); // Navigate to the selected page

            _context3.next = 7;
            return regeneratorRuntime.awrap(page["goto"](this.url));

          case 7:
            _context3.next = 9;
            return regeneratorRuntime.awrap(page.$$eval('.side_categories > ul > li > ul > li > a', function (links, _category) {
              // Search for the element that has the matching text
              links = links.map(function (a) {
                return a.textContent.replace(/(\r\n\t|\n|\r|\t|^\s|\s$|\B\s|\s\B)/gm, "") === _category ? a : null;
              });
              var link = links.filter(function (tx) {
                return tx !== null;
              })[0];
              return link.href;
            }, category));

          case 9:
            selectedCategory = _context3.sent;
            _context3.next = 12;
            return regeneratorRuntime.awrap(page["goto"](selectedCategory));

          case 12:
            scrapedData = []; // Wait for the required DOM to be rendered

            _context3.next = 15;
            return regeneratorRuntime.awrap(scrapeCurrentPage());

          case 15:
            data = _context3.sent;
            console.log(data);
            return _context3.abrupt("return", data);

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  }
};
module.exports = scraperObject;