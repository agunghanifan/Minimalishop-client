<template>
  <section>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <div>
          <router-link to="/"><a class="navbar-brand">Minimalishop</a></router-link>
        </div>
        <div>
          <div v-if='showNavbarLogin === true'>
            <ul class="row nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="col nav-item">
                <router-link to="/login"><button class="btn btn-primary">Login</button></router-link>
              </li>
              <li class="col nav-item">
                <router-link to="/register"><button class="btn btn-success mx-3" style="color: white;">Register</button></router-link>
              </li>
            </ul>
          </div>
          <div v-if="showNavbarLogin === false">
            <ul class="row nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="col nav-item">
                <router-link to="/carts"><button class="btn btn-success mx-3" style="color: white;">Carts</button></router-link>
              </li>
              <li class="col nav-item">
                <button @click="logout" class="btn btn-danger" style="color: white;">Log Out</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      showNavbarLogin: true
    }
  },
  methods: {
    checkToken () {
      if (localStorage.access_token) this.showNavbarLogin = false
      else this.showNavbarLogin = true
    },
    logout () {
      this.$store.dispatch('logout')
      this.checkToken()
    }
  },
  computed: {
    ...mapState(['token'])
  },
  created () {
    this.checkToken()
  }
}
</script>

<style>
a {
  font-style: italic;
  text-decoration: none;
}
</style>
