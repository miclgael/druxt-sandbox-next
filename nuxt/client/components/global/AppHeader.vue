<template>
  <header>
    <div class="flex justify-center">
      {{ loggedInMessage }}
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  computed: {
    loggedInMessage() {
      const message = this.$auth.loggedIn
        ? `🔑 logged in as ${this.$auth?.user?.name}`
        : '🔒 not logged in'

      return message
    },
  },
}
</script>
