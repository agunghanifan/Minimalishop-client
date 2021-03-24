<template>
  <section>
    <Navbar></Navbar>
    <div class="container">
      <div class="card-login">
        <div class="col-12 text-center mb-5">
          <h1>Welcome to Minimalishop</h1>
          <h5>Please login below here</h5>
        </div>
        <div class="row justify-content-md-center">
          <div class="col-6 align-self-center">
            <img src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/9094123f-f624-4f32-9df8-9093bcc4c0ee/flyby-mid-basketball-shoe-Q2Gp58.jpg" style="">
          </div>
          <div class="col-6 align-self-center">
              <form @submit.prevent="logIn">
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
                <button type="submit" class="btn btn-primary">Sign In</button>
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
      email: '',
      password: ''
    }
  },
  methods: {
    logIn () {
      const body = {
        email: this.email,
        password: this.password
      }
      // console.log(body)
      this.$store.dispatch('login', body)
      this.alert()
      this.$store.commit('CLEAR_ERRORS')
    },
    alert () {
      const timing = setInterval(() => {
        if (this.errors.length > 0) {
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: this.errors
          })
        } else {
          this.$swal({
            icon: 'success',
            title: 'Congrats',
            text: 'Berhasil Login!'
          })
        }
        clearInterval(timing)
      }, 300)
      this.email = ''
      this.password = ''
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
  /* border: 1px solid black; */
  /* background-color: black; */
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
