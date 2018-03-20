"use strict";
exports.__esModule = true;
var index_1 = require("../dist/index");
beforeEach(function () {
    var hangman = new index_1.Hangman();
});
test('something works', function () {
    expect(hangman.getStatus()).toBe(100);
});
