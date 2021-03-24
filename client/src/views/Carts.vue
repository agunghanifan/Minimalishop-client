<template>
  <section>
    <Navbar />
    <div class="container mt-5">
      <h1 class="text-center">Selamat Datang di Keranjang Anda</h1>
        <div v-if="!carts.length" class="mt-5">
          <h1>Tidak ada Product pada keranjang, kembali ke <router-link to='/'>beranda</router-link></h1>
        </div>
        <div v-else-if="carts.length">
          <div class="row mx-auto d-flex justify-content-center" style="width:100%">
            <CartsCard v-for="(cart, id) in carts" :key="id" :cart="cart" class="card col-6 m-2 border-0 shadow" style="width: 18rem;">
            </CartsCard>
          </div>
        </div>
     </div>
  </section>
</template>

<script>
import Navbar from '../components/Navbar'
import { mapState } from 'vuex'
import CartsCard from '../components/CartsCard'

export default {
  methods: {
    fetchdata () {
      this.$store.dispatch('fetchCarts')
    }
  },
  computed: {
    ...mapState(['carts'])
  },
  components: {
    Navbar, CartsCard
  },
  created () {
    this.fetchdata()
  }
}
</script>

<style>
</style>
