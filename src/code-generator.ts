import { BindedKeyModel } from './keyboards/models';



export default function generateCode(layers) {
  const bindings = layers.map((layer: any) => [].concat(layer.left, layer.right));

  const keys = bindings.reduce((value: string, binding: BindedKeyModel[], index: number) => {
    return `${value}
      // LAYER $index
      KB_MATRIX_LAYER(0, ${getLayerKeys(binding)}),
    `;
  }, '');

  const press = bindings.reduce((value: string, binding: BindedKeyModel[], index: number) => {
    return `${value}
      // LAYER $index
      KB_MATRIX_LAYER(NULL, ${getPressed(binding)}),
    `;
  }, '');


  const release = bindings.reduce((value: string, binding: BindedKeyModel[], index: number) => {
    return `${value}
      // LAYER $index
      KB_MATRIX_LAYER(NULL, ${getRelease(binding)}),
    `;
  }, '');

  return `
    ${getHeaders()}

    // LAYOUT ---------------------------------------------------------------------
    const uint8_t PROGMEM _kb_layout[KB_LAYERS][KB_ROWS][KB_COLUMNS] = {
      ${keys}
    };
    // ----------------------------------------------------------------------------

    // PRESS ----------------------------------------------------------------------
    const void_funptr_t PROGMEM _kb_layout_press[KB_LAYERS][KB_ROWS][KB_COLUMNS] = {
      ${press}
    };
    // ----------------------------------------------------------------------------

    // RELEASE --------------------------------------------------------------------
    const void_funptr_t PROGMEM _kb_layout_release[KB_LAYERS][KB_ROWS][KB_COLUMNS] = {
      ${release}
    };
    // ----------------------------------------------------------------------------
  `;
}


function getLayerKeys(binding: BindedKeyModel[]) {
  return binding
    .map((bind: BindedKeyModel) => {
      if (!bind || !bind.key)
        return 0;

      if ('layer' in bind.key)
        return bind.key.layer;

      return bind.key.code;
    })
    .join(', ');
}


function getPressed(binding: BindedKeyModel[]) {
  return binding
    .map((bind: BindedKeyModel) => {
      if (!bind || !bind.key)
        return 'NULL';

      return 'layer' in bind.key ?
        'lpush' + getHandler(bind) :
        getHandler(bind);
    })
    .join(', ');
}


function getRelease(binding: BindedKeyModel[]) {
  return binding
    .map((bind: BindedKeyModel) => {
      if (!bind || !bind.key || bind.isPressOnly)
        return 'NULL';

      return 'layer' in bind.key ?
        'lpop' + getHandler(bind) :
        getHandler(bind);
    })
    .join(', ');
}


function getHandler(bind: BindedKeyModel): string {
  if ('layer' in bind.key)
    return String(bind.key.layer);

  if (bind.isShift)
    return 'sshprre';

  if (bind.isAlt)
    return 'altprre';

  if (bind.isGui)
    return 'guiprre';

  if (bind.isCtrl)
    throw new Error('NOT IMPLEMENETED');

  return 'kprrel';
}


function getHeaders() {
  return `
#include <stdint.h>
#include <stddef.h>
#include <avr/pgmspace.h>
#include "../../../lib/data-types/misc.h"
#include "../../../lib/usb/usage-page/keyboard--short-names.h"
#include "../../../lib/key-functions/public.h"
#include "../matrix.h"
#include "../layout.h"

// FUNCTIONS ------------------------------------------------------------------
void kbfun_layer_pop_all(void) {
  kbfun_layer_pop_1();
  kbfun_layer_pop_2();
  kbfun_layer_pop_3();
  kbfun_layer_pop_4();
  kbfun_layer_pop_5();
  kbfun_layer_pop_6();
  kbfun_layer_pop_7();
  kbfun_layer_pop_8();
  kbfun_layer_pop_9();
  kbfun_layer_pop_10();
}

// DEFINITIONS ----------------------------------------------------------------
#define  kprrel   &kbfun_press_release
#define  ktog     &kbfun_toggle
#define  ktrans   &kbfun_transparent
#define  lpush0   &kbfun_layer_pop_all
#define  lpush1   &kbfun_layer_push_1
#define  lpush2   &kbfun_layer_push_2
#define  lpush3   &kbfun_layer_push_3
#define  lpush4   &kbfun_layer_push_4
#define  lpush5   &kbfun_layer_push_5
#define  lpush6   &kbfun_layer_push_6
#define  lpush7   &kbfun_layer_push_7
#define  lpush8   &kbfun_layer_push_8
#define  lpush9   &kbfun_layer_push_9
#define  lpush10  &kbfun_layer_push_10
#define  lpop0    &kbfun_layer_pop_all
#define  lpop1    &kbfun_layer_pop_1
#define  lpop2    &kbfun_layer_pop_2
#define  lpop3    &kbfun_layer_pop_3
#define  lpop4    &kbfun_layer_pop_4
#define  lpop5    &kbfun_layer_pop_5
#define  lpop6    &kbfun_layer_pop_6
#define  lpop7    &kbfun_layer_pop_7
#define  lpop8    &kbfun_layer_pop_8
#define  lpop9    &kbfun_layer_pop_9
#define  lpop10   &kbfun_layer_pop_10
#define  dbtldr   &kbfun_jump_to_bootloader
#define  sshprre  &kbfun_shift_press_release
#define  altprre  &kbfun_alt_press_release
#define  guiprre  &kbfun_gui_press_release
#define  s2kcap   &kbfun_2_keys_capslock_press_release
#define  slpunum  &kbfun_layer_push_numpad
#define  slponum  &kbfun_layer_pop_numpad

// ----------------------------------------------------------------------------


  `;
}