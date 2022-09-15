<template>
  <div class="main-content">
    <!-- EL HEADER DONDE ESTA EL TITULO, EL BOTON DE CARRITO Y LOGOUT -->
    <header class="header">
      <div class="header-title">
        <h3 class="title">SELECCIONE UNA REFACCION DE SU VEHICULO</h3>
      </div>
      <div class="header-buttons">
        <div class="header-button header_cart-demo cart-button">
          <b-dropdown variant="primary">
            <template #button-content>
              <!-- cartShop.length nos da el numero de elementos que contiene 
                  ese objeto de tipo array (productos agregados al carrito) -->
              <b-icon icon="cart" aria-hidden="true"></b-icon>
              {{ cartShop.length }}
            </template>
            <b-dropdown-item-button>
              <b-icon icon="credit-card-fil" aria-hidden="true"></b-icon>
              <!-- totalCompra nos da la suma de los precios 
                de cada productos agregados al carrito -->
              Total: <strong> {{ totalCompra | toCurrency }} </strong>
            </b-dropdown-item-button>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-group header="PRODUCTOS:" class="small">
              <!-- recorremos el array de productos agregados al carrito
              y cada uno lo asignamos al objeto c. i hace referencia al indice del elemento en el array -->
              <b-dropdown-item-button v-for="(c, i) in cartShop" :key="i">
                <b-icon icon="blank" aria-hidden="true"></b-icon>
                {{ c.title }} <span class="sr-only">(Not selected)</span>
              </b-dropdown-item-button>
            </b-dropdown-group>

            <b-dropdown-divider></b-dropdown-divider>
            <!-- con este boton ejecutamos la funcion handle_clearCart()
              en su evento click -->
            <b-dropdown-item-button
              variant="danger"
              @click="handle_clearCart()"
            >
              <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
              Borrar
            </b-dropdown-item-button>
          </b-dropdown>
        </div>
        <div class="header-button header_cart-demo cart-button">
        <!-- con este boton ejecutamos la funcion handle_signOut()
          en su evento click -->
          <b-button
            @click="handle_signOut()"
            variant="outline-info"
            class="ml-3"
          >
            <b-icon icon="power" aria-hidden="true"></b-icon> Logout
          </b-button>
        </div>
      </div>
    </header>
    <main class="main">
      <!-- validamos que el objeto de tipo array productsList no sea null o undefined -->
      <div class="row center" v-if="productsList">
        <!-- recorremos el array productsList
              y cada uno lo asignamos al objeto n. i hace referencia al indice del elemento en el array -->
        <div v-for="n in productsList" :key="n.id" class="col-3">
          <!-- en cada iteracion se reutiliza el componente ProductCard con su
          elemento correspondiente -->
          <ProductCard :product="n" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
//IMPORTAMOS EL COMPONENTE ProductCard
import ProductCard from "../components/ProductCard.vue";
export default {
  name: "HomeView",
  //DECLARAMOS EL COMPONENTE ProductCard QUE USAREMOS EN EL TEMPLATE
  components: { ProductCard },
  data: () => ({
      //DECLARAMOS UN OBJETO DE TIPO ARRAY CON INFORMACION DE 
      //LOS PRODUCTOS QUE PUEDEN SER AGREGADOS AL CARRITO
    productsList: [
      {
        id: 1,
        title: "Producto 1",
        price: 500.0,
        image:
          "//cdn.shopify.com/s/files/1/0071/6944/1892/files/ezgif.com-gif-maker_2_1920x.jpg?v=1614934127",
      },
      {
        id: 2,
        title: "Producto 2",
        price: 1500.0,
        image:
          "//cdn.shopify.com/s/files/1/0071/6944/1892/files/ezgif.com-gif-maker_12_1920x.jpg?v=1614936136",
      },
      {
        id: 3,
        title: "Producto 3",
        price: 700.0,
        image:
          "//cdn.shopify.com/s/files/1/0071/6944/1892/files/ezgif.com-gif-maker_3_1920x.jpg?v=1614934292",
      },
      {
        id: 4,
        title: "Producto 4",
        price: 2000.0,
        image:
          "//cdn.shopify.com/s/files/1/0071/6944/1892/files/ezgif.com-gif-maker_6_1920x.jpg?v=1614934767",
      },
    ],
  }),
  methods: {
    
    handle_signOut() {
      // ESTE METODO EJECUTA DEL STORE EL MODULO AUTH LA ACCION LOGOUT
      this.$store.dispatch("auth/logout");
      // Y NOS HACE NAVEGAR A LA VISTA LOGIN
      this.$router.push("/login");
    },
    handle_clearCart() {
       // ESTE METODO EJECUTA DEL STORE EL MODULO CART LA ACCION CLEAR PARA LIMPIAR EL CARRITO
      this.$store.dispatch("cart/clear");
    },
  },
  // EN COMPUTED SE DECLARAN OBJETOS QUE DETECTAN CAMBIOS 
  //Y LOS RETORNAN DE FORMA AUTOMATICA (REACTIVIDAD) PODRIAMOS DECIR QUE SON COMO LISTENER...PERO NO
  computed: {
    cartShop() {
        // AQUI SE RETORAN EL VALOR DEL ESTADO MYCART EN EL MODULO CART
        //POR EJEMPLO CADA QUE SE AGREGA UN PRODUCTO AL CARRITO Y SE ASIGNA A LA VARIABLE cartShop
      return this.$store.getters["cart/getMyCart"];
    },
    totalCompra() {
        // AQUI SE RETORAN EL VALOR DEL ESTADO TOTAL EN EL MODULO CART
        //CADA QUE SE AGREGA UN PRODUCTO AL CARRITO Y SE ASIGNA A LA VARIABLE totalCompra
      return this.$store.getters["cart/getTotal"];
    },
  },
};
</script>

<style scoped>
.main-content {
  margin: 0;
  display: block;
  left: 0;
  padding: 0;

  right: 0;
  top: 0;
}

.header {
  align-items: center;
  background: #2d394b;
  display: flex;
  height: 60px;
  left: 0;
  padding: 10px 70px 10px 30px;
  position: -webkit-sticky;
  position: sticky;
  right: 0;
  top: 0;
  z-index: 99999999999;
}

.header-title {
}

.header.header_hidden {
  height: 0;
  overflow: hidden;
  padding-bottom: 0;
  padding-top: 0;
}

.back-to-product-icon {
  border-color: #0000 #9cc8f5 #0000 #0000;
  border-style: solid;
  border-width: 5px 5px 5px 0;
  display: inline-block;
  height: 0;
  margin-right: 10px;
  width: 0;
}

.back-to-product {
  align-items: baseline;
  color: #9cc9f5;
  display: inline-block;
  font-size: 14px;
  line-height: 28px;
  margin-right: 20px;
  max-width: 45%;
  min-width: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.back-to-product:hover {
  color: #fff;
}

.back-to-product:hover .back-to-product-icon {
  border-color: #0000 #fff #0000 #0000;
}

@media (max-width: 719px) {
  .back-to-product {
    margin-right: 0;
  }
}

.header-buttons {
  margin-left: auto;
}

.header-btn,
.header-buttons {
  align-items: center;
  display: flex;
}

.header-btn {
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  line-height: 18px;
  margin-left: 30px;
  padding: 11px 20px;
  white-space: nowrap;
}

.header-btn-icon {
  height: 18px;
  margin-right: 8px;
  width: 18px;
}

.header-btn_cart {
  background: #31af36;
  color: #fff;
  justify-content: center;
  min-width: 160px;
  padding-left: 30px;
  padding-right: 30px;
}

@media (max-width: 360px) {
  .header-btn_cart {
    margin-left: 10px;
  }
}

@media (max-width: 959px) {
  .header-btn_cart {
    font-size: 0;
    min-width: auto;
  }

  .header-btn_cart .btn-icon {
    margin-right: 0;
  }
}

.header-btn_cart .header-btn-icon {
  fill: #fff;
}

.header-btn_cart:hover {
  background: #29a22e;
}

.header-btn_cart.header-btn_cart_active {
  background: #253143;
}

.header_cart-demo {
  color: #fff !important;
}

h3 {
  color: #ffffff;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
}

.btn-cart-count {
  margin-right: 7px;
  position: relative;
}
.main {
  padding: 15px;
}
.btn-sing-out {
  display: flex;
  flex-direction: column;
}
.row {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.col-3 {
  width: 33%;
  margin: 12px;
}

.center {
  text-align: center;
}
.btn-sign-out {
  height: 30px;
  margin-left: 5px;
}
</style>
