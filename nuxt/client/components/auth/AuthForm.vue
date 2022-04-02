<template>
  <div>
    <form
      class="grid grid-cols-1 gap-6"
      @submit.prevent="type === 'login' ? userLogin() : userRegister()"
    >
      <label v-if="type === 'register'" class="block">
        <span>Name</span>
        <input v-model="login.name" type="text" class="mt-1 block w-full" />
      </label>
      <label class="block">
        <span>Email</span>
        <input
          v-model="login.email"
          placeholder="your.name@vu.edu.au"
          type="email"
          class="mt-1 block w-full"
        />
      </label>
      <label class="block">
        <span>Password</span>
        <input
          v-model="login.password"
          type="password"
          class="mt-1 block w-full"
          placeholder="secure passphrase"
        />
      </label>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <div>
      <slot />
    </div>
    <div>
      <p>{{ feedback }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'login',
    },
  },
  data() {
    return {
      login: {
        name: '',
        email: '',
        password: '',
      },
      feedback: '',
    }
  },
  methods: {
    userRegister() {
      this.$store
        .dispatch('register', { ...this.login })
        .then(() => {
          this.userLogin()
        })
        .then(() => {
          this.$router.push('/dashboard')
        })
        .catch(() => {
          this.feedback =
            'An error occurred. Please check your details and try again.'
        })
    },
    async userLogin() {
      try {
        await this.$auth.loginWith('local', {
          data: this.login,
        })
        this.$router.push('/dashboard')
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)

        try {
          // eslint-disable-next-line no-console
          console.log('local strategy failed! attempting auth0 login...')
          await this.$auth.loginWith('auth0')
          this.$router.push('/dashboard')
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err)
        }
      }
    },
  },
}
</script>
