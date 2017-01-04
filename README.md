## 状态|Status
基础开发中，现存代码可能会有大量调整。

### 相比比几年前easycanvas的几个优化点：
* 结构层级更完善
* new Path2D替代beginPath
* 独立扩展的transform
* 独立且支持固定帧率的帧动画
* Sprite支持
* addHitRegion兼容
* 资源加载promise

[示例](https://www.gitbook.com/book/sjli/easycanvas_2d/)


### 遇到的问题
* CanvasRenderingContext2D支持的transform是SVGMatrix，而非规范中的DOMMatrix
* 除chrome以外的浏览器不支持addHitRegion，(准确得说，实现了addHitRegion方法，但event.region永远返回null)，只能基于isPointInPath和事件模拟
* Safari和ios移动端浏览器(未测安卓，下同)对gradient和pattern的渲染性能非常差， 如一些优化文章中所说，改成基于drawImage后性能显著提升
* Safari和ios移动端浏览器不支持CanvasPattern的setTransform

### 性能对比
* SVGMatrix和DOMMatrix的一般矩阵方法调用上性能相当
* 简单渐变前提下基于image的pattern性能低于createGradient
