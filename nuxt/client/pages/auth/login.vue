<template>
  <div class="max-w-md">
    <h1 class="text-4xl">Login existing user</h1>
    <AuthForm type="login">
      <p>
        If you don't already have an account, you can
        <nuxt-link to="/register" class="underline">Register</nuxt-link>
      </p>
    </AuthForm>
  </div>
</template>

<script>
export default {
  name: 'AuthLogin',
  auth: false,
}
</script>
