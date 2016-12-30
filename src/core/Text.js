import ECObject from './ECObject'

/*todos:
line-height & auto line-break(after over maxWidth): there is a way to loop measuretext width, but performance?
*/

let textIndex = 0;

class Text extends ECObject {

  constructor(rawText = '') {
    super();
    this.id = '__text__' + textIndex++;
    this._rawText = rawText;
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

}

export default Text;