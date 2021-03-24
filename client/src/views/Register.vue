<template>
  <section>
    <Navbar></Navbar>
    <div class="container">
      <div class="card-login">
        <div class="col-12 text-center mb-5">
          <h1>Welcome to Minimalishop</h1>
          <h5>Please Register below here</h5>
        </div>
        <div class="col-12" v-if="errors.length > 0">
          <div v-for="(error, id) in errors" :key="id" class="alert alert-danger" role="alert">
            {{ error }}
          </div>
        </div>
        <div class="row justify-content-md-center">
          <div class="col-6 align-self-center">
            <img src="https://image.freepik.com/free-photo/various-sport-tools-grass_93675-26732.jpg">
          </div>
          <div class="col-6 align-self-center">
              <form @submit.prevent="register">
                <div class="mb-3">
                  <label for="name" class="form-label"
                    >Your Name</label
                  >
                  <input
                    v-model="name"
                    type="text"
                    class="form-control"
                    id="name"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label"
                    >Email address</label
                  >
                  <input
                    v-model="email"
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" class="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label"
                    >Password</label
                  >
                  <input
                    v-model="password"
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <button type="submit" class="btn btn-success">Sign Up</button>
              </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Navbar from '../components/Navbar'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      const body = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      // console.log(body)
      this.$store.dispatch('register', body)
      const timing = setInterval(() => {
        this.$store.commit('CLEAR_ERRORS')
        clearInterval(timing)
      }, 3000)
    }
  },
  computed: {
    ...mapState(['errors'])
  },
  components: {
    Navbar
  }
}
</script>

<style scoped>
.card-login {
  margin-top: 200px;
}
form {
  justify-content: center;
  align-items: center;
}
img {
  width: 400px;
  height: 400px;
}
</style>
