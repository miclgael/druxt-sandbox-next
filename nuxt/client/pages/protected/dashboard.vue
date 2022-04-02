<template>
  <div>
    <h1 class="text-4xl capitalize">Hello, {{ userNickname || userName }}!</h1>

    <img v-if="userAvatar" :src="userAvatar" :alt="`${userName}'s avatar`" />
    <p>This is your dashboard</p>
    <p class="badge">⚠️ Protected route</p>
  </div>
</template>

<script>
export default {
  name: 'ProtectedDashboard',
  computed: {
    userNickname() {
      return this.$auth?.user?.nickname
    },
    userName() {
      return this.$auth?.user?.name || 'user'
    },
    userAvatar() {
      return this.$auth?.user?.picture
    },
  },
}
</script>

<style lang="postcss" scoped>
.badge {
  @apply inline-flex bg-gray-200 rounded-full 
    px-3 py-3 text-sm font-semibold text-gray-700;

  &:hover {
    @apply bg-gray-300;
  }
}
</style>
