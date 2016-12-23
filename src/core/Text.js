import Transform from './Transform'

/*todos:
line-height & auto line-break(after over maxWidth): there is a way to loop measuretext width, but performance?
*/


class Text {

  constructor(rawText = '') {
    this._rawText = rawText;
    this.transform = new Transform;
    this.setStyle();
  }

  get content() {
    return this._rawText.split(/\n|\<br\>/);
  }

  set content(rawText = '') {
    this._rawText = rawText;
  }

  setStyle({
    stroke = '',
    fill = '',
    shadowOffsetX = '',
    shadowOffsetY = '',
    shadowBlur = '',
    shadowColor = '',
    filter = '',
    fontSize = 10,
    fontFamily = 'sans-serif',
    lineHeight = 1,
    textAlign = '',
    textBaseline = 'top', //default start as the left-top corn, same as dom
    direction = '',
    maxWidth = 9999
  } = {}) {
    fontSize = parseInt(fontSize);
    var font = fontSize + 'px ' + fontFamily;
    this.style = {stroke, fill, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor,
                 filter, fontSize, fontFamily, font, lineHeight, textAlign, textBaseline, direction, maxWidth};
  }

  get pos() {    
    return [
      this.transform.e,
      this.transform.f
    ]
  }

  set pos([x, y] = [0, 0]) {
    this.transform.e = x;
    this.transform.f = y;
  }

  scale(sx, sy) {
    this.transform.scaleSelf(sx, sy);
  }

  rotate(deg) {
    this.transform.rotateSelf(deg);
  }

}

export default Text;