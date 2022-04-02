<template>
  <div class="container mx-auto px-4">
    <AppHeader />
    <AppNavigation />
    <Nuxt />
  </div>
</template>

<script>
import AppHeader from '@/components/global/AppHeader.vue'
import AppNavigation from '@/components/global/AppNavigation.vue'
export default {
  name: 'DefaultLayout',
  components: {
    AppHeader,
    AppNavigation,
  },
}
</script>
