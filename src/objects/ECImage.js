import ECObject from './ECObject'

let imageIndex = 0;

class ECImage extends ECObject {

  constructor({
    name = '',
    img = null,
    sx = 0,
    sy = 0,
    sw = img.width - sx,
    sh = img.height - sy,
    dx = 0,
    dy = 0,
    dw = sw,
    dh = sh,
    observable = false
  }) {
    super();
    this.id = '__image__' + imageIndex++;
    let path = new Path2D;
    path.rect(dx, dy, dw, dh);
    Object.assign(this, {name, img, sx, sy, sw, sh, dx, dy, dw, dh, path, observable});
  }

  

  render(context) {

    let {img, sx, sy, sw, sh, dx, dy, dw, dh} = this;

    context.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);

  }

}

export default ECImage; 