module.exports = function (current, type) {

    var splits = current.split(".");

    splits.forEach(function (value, i) {
        splits[i] = Number(value);
    });

    if (type == "hotfix") {
        splits[2] += 1;

    } else if (type == "minor") {
        splits[1] += 1;
        splits[2] = 0;

    } else if (type == "major") {
        splits[0] += 1;
        splits[1] = 0;
        splits[2] = 0;
    }

    return splits.join(".");

};