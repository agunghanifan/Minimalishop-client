<template>
  <section>
    <div>
      <img :src="product.image_url" class="card-img-top" :alt="product.name">
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text">Price = {{ changesToIdr }}</p>
        <p class="card-text">Stock Product = {{ product.stock }}</p>
        <a @click.prevent="addCart" class="btn btn-primary">Add to Carts</a>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  methods: {
    addCart () {
      if (localStorage.access_token) {
        this.$store.dispatch('addtocart', this.product.id)
        this.alert()
      } else {
        this.$store.commit('PUSH_TO_LOGIN_PAGE')
      }
    },
    alert () {
      const timing = setInterval(() => {
        if (this.errors.length > 0) {
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: this.errors
          })
          this.$store.commit('CLEAR_ERRORS')
        } else {
          this.$swal({
            icon: 'success',
            title: 'Congrats',
            text: this.response
          })
        }
        clearInterval(timing)
      }, 1000)
    }
  },
  computed: {
    ...mapState(['errors', 'response']),
    changesToIdr: function () {
      const convert = new Intl.NumberFormat('id-RP', { style: 'currency', currency: 'IDR', maximumSignificantDigits: 6 }).format(this.product.price)
      return convert
    }
  },
  props: ['product']
}
</script>

<style>

</style>
