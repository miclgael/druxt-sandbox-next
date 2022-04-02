<template>
  <div>
    <slot name="field_ingredients" />
    <DruxtDebug :json="entity" />
  </div>
</template>

<script>
import { DruxtEntityMixin } from 'druxt-entity'
export default {
  mixins: [DruxtEntityMixin],
  druxt: {
    query: {
      fields: ['field_ingredients', 'path'],
    },
  },
}
</script>
