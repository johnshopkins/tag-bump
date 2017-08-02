var expect = require("chai").expect;
var getNewTag = require("../lib/get-new-tag");

describe("getNewTag", function () {

  it("should bump a hotfix release", function () {

    var v;

    v = getNewTag("1.2", "hotfix");
    expect(v).to.equal("1.2.1");

    v = getNewTag("1.2.3", "hotfix");
    expect(v).to.equal("1.2.4");

  });

  it("should bump a minor release", function () {

    var v;

    v = getNewTag("1.2", "minor");
    expect(v).to.equal("1.3");

    v = getNewTag("1.2.3", "minor");
    expect(v).to.equal("1.3");

  });

  it("should bump a major release", function () {

    var v;

    v = getNewTag("1.2", "major");
    expect(v).to.equal("2.0");

    v = getNewTag("1.2.3", "major");
    expect(v).to.equal("2.0");

  });

});
