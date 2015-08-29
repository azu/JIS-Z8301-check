import assert from "power-assert"
import {check} from "../src/JIS-Z8301-check"
function testEqual(data) {
    data.forEach(({actual,expect}) => {
        var result = check(actual);
        if (result.length > 0) {
            assert.equal(result[0].expect, expect);
        }
    });
}
describe("JIS-Z8301", function () {
    it("カタカナ <= 2", function () {
        var data = require("./fixtures/2less.json");
        testEqual(data);
    });
    it("カタカナ >= 3", function () {
        var data = require("./fixtures/3over.json");
        testEqual(data);
    });
    it("複合語", function () {
        var data = require("./fixtures/compound.json");
        testEqual(data);
    });
    it("長音符号で書き表す音、はねる音、つまる音は1音とし、拗音は1音としない", function () {
        var data = require("./fixtures/expection.json");
        testEqual(data);
    });
});