import {
  Component,
  Input,
  HostBinding,
} from '@angular/core';

import {
  BindedKeyModel,
} from '../keyboards/models';


@Component({
  selector: 'mq-ergodox-key',
  templateUrl: './key.html',
  styleUrls: [ './key.less' ],
})
export default class KeyComponent {
  @Input() model: BindedKeyModel;
  @Input() shape: string;

  @HostBinding('class.keep-pressed')
  get isPressed(): boolean {
    return this.model && this.model.isPressOnly;
  }

  @HostBinding('class.long')
  get isLong(): boolean {
    return this.shape === 'long';
  }

  @HostBinding('class.tall')
  get isTall(): boolean {
    return this.shape === 'tall';
  }

  @HostBinding('class.double')
  get isDouble(): boolean {
    return this.shape === 'double';
  }
}
