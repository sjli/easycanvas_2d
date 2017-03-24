import ECObject from './ECObject'

let gridIndex = 0;

class ECGrid extends ECObject {

  constructor({
    name = '',
    size = 10,
    cols = 1,
    rows = 1,
    observable = false
  }) {
    super();
    this.id = '__grid__' + imageIndex++;
    
    Object.assign(this, {name, size, cols, rows, observable});
  }

  

  render(context) {

    

  }

}

export default ECImage; 