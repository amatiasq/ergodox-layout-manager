export {
  KeyModel,
  KeyboardModel,
  BindedKeyModel,
};

type KeyboardModel = KeyModel[];

interface KeyModel {
  label: string;
  code?: number;
  layer?: number;
  shift?: string;
  alt?: string;
  ctrl?: string;
  gui?: string;
}

class BindedKeyModel {
  key: KeyModel;
  isShift: boolean;
  isAlt: boolean;
  isCtrl: boolean;
  isGui: boolean;
  isPressOnly: boolean;

  get isAssigned(): boolean {
    return Boolean(this.key);
  }

  get hasModifiers(): boolean {
    return this.isShift || this.isAlt || this.isCtrl || this.isGui;
  }

  get label(): string {
    return this.isAssigned ? this.getLabelFor(this.key) : null;
  }

  getLabelFor(key: KeyModel) {
    if (this.isShift)
      return key.shift || key.label;

    if (this.isAlt)
      return key.alt || key.label;

    if (this.isCtrl)
      return key.ctrl || key.label;

    if (this.isGui)
      return key.gui || key.label;

    return key.label;
  }

  clone() {
    return Object.assign(new BindedKeyModel(), this);
  }
}