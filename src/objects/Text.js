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
    rules = {}
  } = {}) {
    var defaultRules = {
      shadowOffsetX: '',
      shadowOffsetY: '',
      shadowBlur: '',
      shadowColor: '',
      filter: '',
      fontSize: 10,
      fontFamily: 'sans-serif',
      lineHeight: 1,
      textAlign: '',
      textBaseline: 'top', //default start as the left-top corn, same as dom
      direction: '',
      maxWidth: 9999
    }
    this.style = this.style || {rules: defaultRules};
    Object.assign(this.style.rules, rules);

    this.style.rules.fontSize = parseInt(this.style.rules.fontSize);
    this.style.rules.font = this.style.rules.fontSize + 'px ' + this.style.rules.fontFamily;
    
    if (stroke) {
      this.style.stroke = stroke;
    }
    if (fill) {
      this.style.fill = fill;
    }
    
    this.event.emit('styleUpdate');
  }

  render(context) {

    let {stroke, fill, rules} = this.style;

    for (var rule in rules) {
      context[rule] = rules[rule];
    }

    //multi line
    this.content.forEach((content, i) => {
      //emulate line-height 
      if (i > 0) {
        context.translate(0, rules.fontSize * rules.lineHeight);
      }

      if (stroke) {
        context.strokeStyle = stroke;
        context.strokeText(content, 0, 0, rules.maxWidth);
      } 

      if (fill) {
        context.fillStyle = fill;
        context.fillText(content, 0, 0, rules.maxWidth);
      }
    });

  }

}

export default Text;