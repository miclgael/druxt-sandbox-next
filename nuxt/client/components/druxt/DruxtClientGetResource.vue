<template>
  <div class="card card-side bg-base-100 shadow-xl">
    <figure class="min-w-[200px]">
      <img :src="thumbnail.src" :alt="thumbnail.alt" loading="lazy" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ title }}</h2>
      <p>{{ summary | stripHTML }}</p>
      <div class="card-actions justify-end">
        <nuxt-link :to="permalink" class="btn btn-primary"
          >Read Article</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { DruxtClient } from 'druxt'

export default {
  name: 'DruxtClientGetResource',
  data: () => ({
    article: null,
    resource: null,
    image: null,
    imageMeta: null,
  }),
  async fetch() {
    const druxt = new DruxtClient('http://drupal.ddev.site', {
      endpoint: 'en/jsonapi',
      // Enable debug console log messages.
      debug: true,
    })
    await druxt
      .getResource('node--article', 'bff95e08-34bf-443d-b78c-5c54391a46a2')
      .then((resource) => {
        this.article = resource.data.attributes
        this.resource = resource
      })
    await druxt
      .getResource('file--file', '2bc2a5c9-63be-4571-9fad-61a0846518d4')
      .then((resource) => {
        this.image = resource.data.attributes
      })
    await druxt
      .getResource('media--image', '651ff165-9187-4d32-ac22-3142f380c32f')
      .then((resource) => {
        this.imageMeta = resource.data.attributes
      })
  },
  computed: {
    summary() {
      return (
        this.article?.body?.summary ||
        this.article?.body?.value.substring(0, 220)
      )
    },
    permalink() {
      return this.article?.path?.alias || '/404'
    },
    title() {
      return this.article?.title || ''
    },
    thumbnail() {
      return {
        src: 'http://drupal.ddev.site/' + this.image?.uri?.url || '',
        alt: this.imageMeta?.name || '',
      }
    },
  },
}
</script>
