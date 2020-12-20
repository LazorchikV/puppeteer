"use strict";

var browserObject = require('./browser');

var scraperController = require('./pageController'); //Start the browser and create a browser instance


var browserInstance = browserObject.startBrowser(); // Pass the browser instance to the scraper controller

scraperController(browserInstance);