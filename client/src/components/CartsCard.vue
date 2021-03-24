<template>
  <section>
    <div>
      <img :src="cart.Product.image_url" class="card-img-top" :alt="cart.Product.name">
      <div class="card-body">
        <h5 class="card-title">{{ cart.Product.name }}</h5>
        <p class="card-text">Price = {{ changesToIdr }}</p>
        <button class="btn btn-success" @click.prevent="plus(cart.id)">+</button>
        <p class="card-text">Jumlah Pembelian = {{ cart.amount }}</p>
        <button class="btn btn-warning" @click.prevent="minus(cart.id)">-</button>
        <p class="card-text">Stock tersedia = {{ cart.Product.stock }}</p>
        <a @click.prevent="checkout" class="btn btn-success mx-1">Checkout</a>
        <a @click.prevent="deleteCart(cart.id)" class="btn btn-danger">Delete Cart</a>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  methods: {
    fetchCartForCard () {
      const timing = setInterval(() => {
        this.$store.dispatch('fetchCarts')
        clearInterval(timing)
      }, 300)
    },
    plus (id) {
      this.$store.dispatch('operatorStock', { id, operator: 'plus' })
      this.fetchCartForCard()
    },
    minus (id) {
      this.$store.dispatch('operatorStock', { id, operator: 'minus' })
      this.fetchCartForCard()
    },
    deleteCart (id) {
      this.$swal.fire({
        title: 'Are you sure to delete this cart?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('deleteCart', id)
          this.$swal.fire(
            'Deleted!',
            'Your cart has been deleted.',
            'success'
          )
          this.fetchCartForCard()
          this.alert()
        }
      })
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
      }, 300)
    }
  },
  computed: {
    ...mapState(['errors', 'response']),
    changesToIdr: function () {
      const convert = new Intl.NumberFormat('id-RP', { style: 'currency', currency: 'IDR', maximumSignificantDigits: 6 }).format(this.cart.Product.price)
      return convert
    }
  },
  props: ['cart']
}
</script>

<style>

</style>
