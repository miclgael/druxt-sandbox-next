<template>
  <div class="max-w-md">
    <h1 class="text-4xl">Register New User</h1>
    <AuthForm type="register">
      <p>
        Already registered? Please
        <nuxt-link to="/login" class="underline">log in</nuxt-link>
      </p>
    </AuthForm>
  </div>
</template>

<script>
export default {
  name: 'AuthRegister',
  auth: false,
}
</script>
