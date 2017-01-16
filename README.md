## 状态|Status

基础开发中，现存代码可能会有大量调整。

## 示例

[00-basic.html](https://sjli.github.io/easycanvas_2d/examples/00-basic.html)

[01-bubbles.html](https://sjli.github.io/easycanvas_2d/examples/01-bubbles.html)

[02-bubbles-move.html](https://sjli.github.io/easycanvas_2d/examples/02-bubbles-move.html)

[02a-bubbles-click.html](https://sjli.github.io/easycanvas_2d/examples/02a-bubbles-click.html)

[02b-bubbles-move-image.html](https://sjli.github.io/easycanvas_2d/examples/02b-bubbles-move-image.html)

[03-geom-and-text.html](https://sjli.github.io/easycanvas_2d/examples/03-geom-and-text.html)

[04-sprite.html](https://sjli.github.io/easycanvas_2d/examples/04-sprite.html)

## 相比比几年前easycanvas的几个优化点：

* 结构层级更完善

* new Path2D替代beginPath

* 独立扩展的transform

* 独立且支持固定帧率的帧动画

* Sprite支持

* addHitRegion兼容

* 资源加载promise

### 遇到的问题

* CanvasRenderingContext2D支持的transform是SVGMatrix，而非规范中的DOMMatrix

* 除chrome以外的浏览器不支持addHitRegion，(准确地说，实现了addHitRegion方法，但event.region永远返回null)，只能基于isPointInPath和事件模拟

* 其他桌面浏览器(非chrome和firefox的桌面浏览器，下同)和ios移动端浏览器(未测安卓，下同)对gradient和pattern的渲染性能非常差， 如一些优化文章中所说，改成基于drawImage后性能显著提升

* 其他桌面浏览器和ios移动端浏览器不支持CanvasPattern的setTransform

* firefox的currentTransform返回数组而非SVGMatrix, 其他桌面浏览器和ios移动端浏览器不支持context.currentTransform，用polyfill兼容

* safari下drawImage不支持绘制超出原图区域的空白部分，导致不报错但不执行，需要偏移转换为绘制较小区域

### 性能对比

* SVGMatrix和DOMMatrix的一般矩阵方法调用上性能相当

* 简单渐变前提下基于image的pattern性能低于createGradient
