<template>
  <div class="card">
    <DruxtEntity :type="resourceType" :uuid="uuid" :settings="settings">
      <template #default="{ entity }">
        <!-- Do whatever you want here -->
        <h1>{{ entity.attributes.title }}</h1>
        <p>{{ entity.attributes.field_summary.value }}</p>

        <h2>Difficulty</h2>
        <p>{{ entity.attributes.field_difficulty }}</p>

        <h2>Time:</h2>
        <p>{{ entity.attributes.field_cooking_time }} mins</p>
      </template>
      <DruxtDebug :json="entity" open summary="Foo bar"
        >Debug information</DruxtDebug
      >
    </DruxtEntity>
  </div>
</template>

<script>
import { DruxtEntityMixin } from "druxt-entity";
export default {
  data() {
    return {
      resourceType: "node--recipe",
      uuid: "a2c4ea99-4aca-4431-96b2-dd5a68fe8fdc", // change uuid
      settings: {
        query: {
          fields: [
            "title",
            "field_summary",
            "field_difficulty",
            "field_cooking_time",
          ],
        },
        schema: false,
      },
    };
  },
  mixins: [DruxtEntityMixin],
};
</script>
