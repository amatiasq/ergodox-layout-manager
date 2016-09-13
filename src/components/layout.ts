import {
  EventEmitter,
  Component,
  Input,
  Output,
} from '@angular/core';

import { BindedKeyModel } from '../keyboards/models';


@Component({
  selector: 'mq-ergodox-layout',
  templateUrl: './layout.html',
  styleUrls: [ './layout.less' ],
})
export default class LayoutComponent {
  @Input() model: LayoutModel;
  @Input() selected: BindedKeyModel;
  @Output('key-selected') keySelected = new EventEmitter();

  onKeySelected(key: BindedKeyModel) {
    this.keySelected.emit(key);
  }
}


export interface LayoutModel {
  left: BindedKeyModel[];
  right: BindedKeyModel[];
}
