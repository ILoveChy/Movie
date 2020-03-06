/**
 * 随机颜色
 */
export function colorRandom() {
  return "#" + (function (color) {
    return new Array(7 - color.length).join("0") + color;
  })((Math.random() * 0x1000000 | 0).toString(16));
}