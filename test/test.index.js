var expect = require("chai").expect;
var bump = require("../index");

describe("bump", function () {

    it("should bump a hotfix release", function () {

        var v = bump("1.2.3", "hotfix");
        expect(v).to.equal("1.2.4");

    });

    it("should bump a minor release", function () {

        var v = bump("1.2.3", "minor");
        expect(v).to.equal("1.3.0");

    });

    it("should bump a major release", function () {

        var v = bump("1.2.3", "major");
        expect(v).to.equal("2.0.0");

    });

});