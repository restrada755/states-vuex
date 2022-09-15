<template>
  <div class="card">
    <img
      :src="product.image"
      class="transition lazyloaded"
      :data-src="product.image"
    />
    <span class="card-title">{{ product.title }}</span>
    <span class="card-subtitle"> {{ product.price | toCurrency }}</span>
    <button
      @click="addToCart"
      class="
        card-action-btn
        btn btn--full btn-theme
        product-form__cart-submit product-form__cart-submit--outline
      "
    >
      <span id="AddToCartText-product-template-1"> Agregar al carrito </span>
    </button>
  </div>
</template>

<script>
export default {
  props: { product: {} },
  methods:{
    addToCart(){
        console.log("Se agrega el producto: ", this.product)
        this.$store.dispatch("cart/add", this.product)
    }
  }
};
</script>

<style scoped>
.card {
  -webkit-box-shadow: -2px 1px 10px 1px #000000;
  box-shadow: -2px 1px 10px 1px #000000;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}
.card-action-btn {
    cursor: pointer;
  background: #222;
  transition: all 0.3s ease-out 0s;
}
.card-action-btn:hover {
  background: #dd3d27;
}
.btn-theme {
  height: 45px;
  text-align: center;
  vertical-align: middle;
  color: #fff;
  border: 1px solid transparent;
  appearance: none;
  font-size: 14px;
  font-weight: 600;
}
.card-title{
    font-size: 20px;
  font-weight: 600;
  padding: 5px;
}
.card-subtitle{
    font-size: 15px;
  font-weight: 200;
  padding: 5px;
}
</style>