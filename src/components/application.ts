import {
  KeyModel,
  KeyboardModel,
  BindedKeyModel,
} from '../keyboards/models';

import { Component } from '@angular/core';
import { LayoutModel } from './layout';
import Spanish from '../keyboards/es_ES_mac';
import Layers from './application.config';
import generateCode from '../code-generator';

const STORAGE_KEY = 'STORED';


@Component({
  selector: 'mq-ergodox-layout-manager',
  templateUrl: './application.html',
  styleUrls: [ './application.less' ],
})
export default class Application {
  keyboard: KeyboardModel = Spanish;
  layerKeys = Layers;
  layers: LayoutModel[] = load(Spanish);
  selected: BindedKeyModel;

  constructor() {
    this.selected = this.layers[0].left[0];

    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (!this.selected) return;
      const char = String.fromCharCode(event.keyCode).toLowerCase();

      this.keyboard.some((key: KeyModel) => {
        if (key.label === char) {
          this.selected.key = key;
          return true;
        }
      });
    });
  }

  onKeySelected(key: BindedKeyModel) {
    this.selected = key;
  }

  generate() {
    console.log(generateCode(this.layers));
  }

  apply(selected) {
    let hand: string = null;;
    let index = -1;

    this.layers.forEach((layer: any) => {
      layer.left.forEach((entry: BindedKeyModel, i: number) => {
        if (entry === selected) {
          hand = 'left';
          index = i;
          return true;
        }
      });

      layer.right.forEach((entry: BindedKeyModel, i: number) => {
        if (entry === selected) {
          hand = 'right';
          index = i;
          return true;
        }
      });
    });

    if (index === -1) return;

    console.log(hand, index);
    this.layers.forEach((layer: any) => {
      layer[hand][index] = selected.clone();
    });
  }

  save() {
    this.layers.forEach((layer: any) => {
      layer.left = layer.left.map((entry: BindedKeyModel) => entry && entry.isAssigned ? entry : null);
      layer.right = layer.right.map((entry: BindedKeyModel) => entry && entry.isAssigned ? entry : null);
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.layers));
  }
}


function load(keyboard: KeyboardModel) {
  const json = localStorage.getItem(STORAGE_KEY);
  if (!json) {
    return [{
      left: [],
      right: [],
    }];
  }

  const data = JSON.parse(json);

  data.forEach((layer: any) => {
    layer.left = layer.left.map((entry: any) => jsonToKey(entry, keyboard));
    layer.right = layer.right.map((entry: any) => jsonToKey(entry, keyboard));
  });

  console.log(data);

  return data;
}


function jsonToKey(entry: any, keyboard: KeyboardModel) {
  if (!entry || !entry.key) return;

  const bind = new BindedKeyModel();
  Object.assign(bind, entry);

  const keyFound = keyboard.some((key: KeyModel): boolean => {
    if (JSON.stringify(key) === JSON.stringify(entry.key)) {
      bind.key = key;
      return true;
    }
  });

  const layerFound = Layers.some((key: KeyModel): boolean => {
    if (JSON.stringify(key) === JSON.stringify(entry.key)) {
      bind.key = key;
      return true;
    }
  });

  return keyFound || layerFound ? bind : null;
}
