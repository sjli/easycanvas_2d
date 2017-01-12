import Layer from './Layer';
import Geometry from './Geometry';
import ECImage from './ECImage';

class BackLayer extends Layer {

  createBG({
    img = null,
    fill = '',
    sx = 0,
    sy = 0,
    sw = 0,
    sh = 0,
    dx = 0,
    dy = 0,
    dw = 0,
    dh = 0,
  } = {}) {
    if (img) {
      var ecImg = new ECImage({
        name: 'bg',
        img,
        sx,
        sy,
        dx,
        dy,
        sw: sw <= img.width && sw || img.width,
        sh: sw <= img.height && sh || img.height,
        dw: dw || this.canvas.width,
        dh: dh || this.canvas.height
      });
      this.addImage(ecImg);
      return ecImg;
    } else if (fill) {
      var bg = new Geometry;
      bg.path.rect(0, 0, this.canvas.width, this.canvas.height);
      this.addGeom(bg);
      bg.setStyle({
        fill
      })
      return bg;
    }
  }

}

export default BackLayer;