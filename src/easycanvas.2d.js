import Scene from './core/Scene';
import Geometry from './core/Geometry';
import Text from './core/Text';
import ECImage from './core/ECImage';
import Sprite from './core/Sprite';
import Frame from './core/Frame';

Array.prototype.forEach = function(handler) {
  var i = 0, len = this.length;
  for (; i < len; i++) {
    handler(this[i], i, this);
  }
}

var EasyCanvas = {
  mode: '2d',

  ver: '1.0.0',

  Scene,

  Geometry,

  Text,

  ECImage,

  Sprite,

  Frame,

  assets: new Map,

  init: (selector, assets = []) => {
    //init container
    const container = document.querySelector(selector);
    if (getComputedStyle(container).position === 'static') {
      container.style.position = 'relative';
    }
    EasyCanvas.container = container;

    //load all assets
    let loadAssets = assets.map((asset, i) => {
      return new Promise((resolve, reject) => {
        let img = new Image;
        img.onload = () => {
          EasyCanvas.assets.set(asset.name, img);
          resolve();
        };
        img.onerror = () => {
          reject(asset.url);
        };
        img.src = asset.url;
      });
    });

    return Promise.all(loadAssets);
  },

  addScene: () => {
    return new Scene(EasyCanvas.container);
  }

};

window.EC = EasyCanvas;