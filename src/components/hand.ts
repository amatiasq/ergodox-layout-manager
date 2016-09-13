import {
  EventEmitter,
  Component,
  Input,
  Output,
  HostBinding,
} from '@angular/core';

import { BindedKeyModel } from '../keyboards/models';
import config from './hand.config';


@Component({
  selector: 'mq-ergodox-hand',
  templateUrl: './hand.html',
  styleUrls: [ './hand.less' ],
})
export default class HandComponent {
  @Input() model: BindedKeyModel[];
  @Input() selected: BindedKeyModel;
  @Input() direction: string;
  @Output('key-selected') keySelected = new EventEmitter();

  @HostBinding('class.left')
  get isLeft(): boolean {
    return this.direction === 'left';
  }

  @HostBinding('class.right')
  get isRight(): boolean {
    return this.direction === 'right';
  }

  get config() {
    return config[this.direction];
  }

  onKeySelected({ id }: { id: number }) {
    if (!this.model[id])
      this.model[id] = new BindedKeyModel();

    console.log(this.model[id]);
    this.keySelected.emit(this.model[id]);
  }
}
