<template>
  <q-form
    class="column q-gutter-y-md"
    @validation-error="onValidationError">
    <slot/>
  </q-form>
</template>
<script setup lang="ts">
import { scroll } from 'quasar';
import setVerticalScrollPosition = scroll.setVerticalScrollPosition;
async function onValidationError(ref: any) {
  const el = ref.getNativeElement()
  const { getScrollTarget } = scroll
  setVerticalScrollPosition(getScrollTarget(el), el.offsetTop, 200)
}
</script>
<style scoped>

</style>
