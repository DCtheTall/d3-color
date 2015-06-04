var tape = require("tape"),
    color = require("../");

tape("interpolateHsl(a, b) converts a and b to HSL colors", function(test) {
  test.equal(color.interpolateHsl("steelblue", "brown")(0), color.rgb("steelblue") + "");
  test.equal(color.interpolateHsl("steelblue", color.hsl("brown"))(1), color.rgb("brown") + "");
  test.equal(color.interpolateHsl("steelblue", color.rgb("brown"))(1), color.rgb("brown") + "");
  test.end();
});

tape("interpolateHsl(a, b) interpolates in HSL and returns an RGB hexadecimal string", function(test) {
  test.equal(color.interpolateHsl("steelblue", "#f00")(.2), "#383dc3");
  test.end();
});

tape("interpolateHsl(a, b) uses the shortest path when interpolating hue", function(test) {
  var i = color.interpolateHsl("hsl(10,50%,50%)", "hsl(350,50%,50%)");
  test.equal(i(0), "#bf5540");
  test.equal(i(.2), "#bf4d40");
  test.equal(i(.4), "#bf4440");
  test.equal(i(.6), "#bf4044");
  test.equal(i(.8), "#bf404d");
  test.equal(i(1), "#bf4055");
  test.end();
});

tape("interpolateHsl(a, b) uses a’s hue when b’s hue is undefined", function(test) {
  test.equal(color.interpolateHsl("#f60", "#000")(.5), "#803300");
  test.equal(color.interpolateHsl("#6f0", "#fff")(.5), "#b3ff80");
  test.end();
});

tape("interpolateHsl(a, b) uses b’s hue when a’s hue is undefined", function(test) {
  test.equal(color.interpolateHsl("#000", "#f60")(.5), "#803300");
  test.equal(color.interpolateHsl("#fff", "#6f0")(.5), "#b3ff80");
  test.end();
});

tape("interpolateHsl(a, b) uses a’s saturation when b’s saturation is undefined", function(test) {
  test.equal(color.interpolateHsl("#ccc", "#000")(.5), "#666666");
  test.equal(color.interpolateHsl("#f00", "#000")(.5), "#800000");
  test.end();
});

tape("interpolateHsl(a, b) uses b’s saturation when a’s saturation is undefined", function(test) {
  test.equal(color.interpolateHsl("#000", "#ccc")(.5), "#666666");
  test.equal(color.interpolateHsl("#000", "#f00")(.5), "#800000");
  test.end();
});
