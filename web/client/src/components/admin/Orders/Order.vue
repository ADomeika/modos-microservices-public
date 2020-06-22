<template>
  <router-link class="card" :to="'/admin/uzsakymai/' + order._id">
    <div class="card-body">
      <div>
        <div class="info">
          <h4 class="order-number">Užsakymo nr: {{ order._id }}</h4>
          <p class="name">Vardas: {{ order.firstName }}</p>
          <p class="name">Pavardė: {{ order.lastName }}</p>
          <p class="email">El. Paštas: {{ order.email }}</p>
          <p class="tel">Telefonas: {{ order.telephone }}</p>
          <p class="delivery">Pasirinktas pristatymo tipas: {{ deliveryType }}</p>
          <p class="delivery">Suma: {{ order.totalPrice | currency }}</p>
          <p class="delivery">Adresas arba paštomatas: {{ order.address || order.pastomatas }}</p>
        </div>
        <div class="info"><h4 class="order-number">Užsakytos prekės:</h4></div>
        <div
          v-for="product in order.products"
          :key="product.id + product.size">
          Prekė: {{ product.id }}, Dydis: {{ product.size }}, Kiekis: {{ product.quantity }}
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ['order'],
  computed: {
    deliveryType () {
      switch (this.order.deliveryType) {
        case 'esValstybese':
          return 'Europos Valstybėje'
        case 'ktValstybese':
          return 'Kitoje Valstybėje'
        case 'ltPastu':
          return 'Lietuvos Paštu'
        case 'pastomatu':
          return 'Paštomatu'
        default:
          return 'Kažkas negerai..'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  margin: 10px 1%;
  width: 98%;
  background-color: #222;
  box-shadow: -2px 5px 20px 0px rgba(255,255,255,0.3);
  padding: 15px;
  border-radius: 10px;
  transition: transform .2s;
  &:hover {
    transform: translateY(-5px);
    cursor: pointer;
  }
  @media screen and (min-width: 768px) {
    width: 48%;
  }
  @media screen and (min-width: 1368px) {
    width: 31%;
  }
}
.image {
  text-align: center;
  margin-bottom: 10px;
}
.image img {
  width: 100%;
  object-fit: cover;
  max-width: 250px;
}
.order-number {
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: 5px;
}
.name {
  font-size: 18px;
}
.name,
.email,
.tel,
.delivery {
  color: #fff;
  margin-bottom: 5px;
}
</style>
