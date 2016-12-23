import Scene from './core/Scene';
import Geometry from './core/Geometry';
import Text from './core/Text';
import Frame from './core/Frame';

var EasyCanvas = {
  mode: '2d',

  ver: '1.0.0',

  Scene,

  Geometry,

  Text,

  Frame,

  assets: [],

  init: (selector, urls = []) => {
    //init container
    const container = document.querySelector(selector);
    if (getComputedStyle(container).position === 'static') {
      container.style.position = 'relative';
    }
    EasyCanvas.container = container;

    //load all assets
    let loadUrls = urls.map((url, i) => {
      return new Promise((resolve, reject) => {
        let img = new Image;
        img.onload = () => {
          EasyCanvas.assets[i] = img;
          resolve();
        };
        img.onerror = () => {
          reject(img.src);
        };
        img.src = url;
      });
    });

    return Promise.all(loadUrls);
  },

  addScene: () => {
    return new Scene(EasyCanvas.container);
  }

};

window.EC = EasyCanvas;