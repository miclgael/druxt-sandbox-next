<template>
  <div class="navbar p-0 bg-base-100">
    <nav class="flex-1">
      <ul role="list" class="menu menu-horizontal p-0">
        <li role="listitem">
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li role="listitem">
          <nuxt-link to="/about">About</nuxt-link>
        </li>
        <li v-if="loggedIn" role="listitem">
          <nuxt-link to="/dashboard"> Dashboard </nuxt-link>
        </li>
        <li v-if="!loggedIn" role="listitem">
          <nuxt-link to="/login">Login</nuxt-link>
        </li>
        <li v-else role="listitem">
          <button class="capitalize" @click="logoutUser">Logout</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'AppNavigation',
  computed: {
    loggedIn() {
      return this.$auth.loggedIn
    },
  },
  methods: {
    async logoutUser() {
      await this.$store.dispatch('logout')
      this.$router.push('/')
    },
  },
}
</script>

<style lang="postcss" scoped>
li {
  text-transform: capitalize;
}
.nuxt-link-exact-active {
  text-decoration: underline;
  background-color: hsl(var(--bc) / var(--tw-bg-opacity));
  --tw-bg-opacity: 0.1;
}
</style>
