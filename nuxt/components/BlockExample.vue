<template>
  <DruxtBlock>
    <template #default="{ block }">
      <!-- Do whatever you want here -->
      <DruxtDebug :json="block" open />
    </template>
  </DruxtBlock>
</template>

<script>
import { DruxtBlocksBlockMixin } from "druxt-blocks";
export default {
  mixins: [DruxtBlocksBlockMixin],
};
</script>
