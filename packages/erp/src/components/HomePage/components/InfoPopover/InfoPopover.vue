<template>
  <div />
</template>
<script setup lang="ts">
import { ref } from 'vue';
const k2 = ({
  infoPopoverActive: e,
  infoPopoverContent: t
}) => {
  const a = (t == null ? void 0 : t.definition) ?? '',
    s = (t == null ? void 0 : t.formula) ?? '',
    i = d.useRef(null),
    {
      mdUp: o
    }
      = ln();
  return d.useEffect(
    () => {
      var r;
      e &&
        ((r = i.current) == null || r.forceUpdatePosition())
    },
    [
      e
    ]
  ),
    n.jsx(
      Rn,
      {
        active: e,
        onClose: () => {
        },
        activator: n.jsx(
          'div',
          {
            className: U(pe.infoPopoverActivator, {
              [
                pe.leftAlign
              ]: o
            })
          }
        ),
        preferredAlignment: o ? 'right' : 'left',
        preferredPosition: o ? 'below' : 'above',
        ref: i,
        preferInputActivator: o,
        fullWidth: !0,
        autofocusTarget: 'none',
        children: n.jsx(Or, {
          definition: a,
          formula: s
        })
      }
    )
}
</script>
