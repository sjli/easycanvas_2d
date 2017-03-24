import Scene from './core/Scene';
import Vector2 from './core/Vector2';
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

  Vector2,

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
        var request = new XMLHttpRequest();
        request.onloadstart = () => {
          container.innerHTML += 'asset ' + asset.name + ' start load...<br>';
        }
        request.onprogress = (e) => {
          var percent = (e.loaded / e.total * 100).toFixed(2) + '%';
          var reg = new RegExp(asset.name + '[^\>]+\>');
          container.innerHTML = container.innerHTML.replace(reg, asset.name + ' loaded ' + percent + '<br>');
        }

        request.onload = () => {
          var options = {}
          var headers = request.getAllResponseHeaders();
          var m = headers.match(/^Content-Type\:\s*(.*?)$/mi);

          if (m && m[1]) {
            options.type = m[1];
          }

          var blob = new Blob([request.response], options);
          let img = document.createElement('img');
          img.onload = () => {
            EasyCanvas.assets.set(asset.name, img);
            resolve();
          };
          img.src = window.URL.createObjectURL(blob);
        }

        request.onerror = () => {
          reject(asset.url);
        }

        request.responseType = 'arraybuffer';

        request.open('GET', asset.url, true);
        request.overrideMimeType('text/plain; charset=x-user-defined');
        request.send(null);
      });
    });

    return Promise.all(loadAssets);
  },

  addScene: () => {
    return new Scene(EasyCanvas.container);
  }

};

window.EC = EasyCanvas;