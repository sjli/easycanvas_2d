import Scene from './core/Scene';
import Transform from './core/Transform';
import Geometry from './objects/Geometry';
import Text from './objects/Text';
import ECImage from './objects/ECImage';
import Sprite from './objects/Sprite';
import Animation from './animation/Animation';

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

  Transform,

  Geometry,

  Text,

  ECImage,

  Sprite,

  Animation,

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