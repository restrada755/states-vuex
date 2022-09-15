<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9 mb-5">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Bienvenido</h1>
              <p class="text-lead text-white">
                Ingrese cualquier correo. <br />
                Contraseña: <strong style="color: crimson"> prueba</strong>
              </p>
            </b-col>
          </b-row>
        </div>
      </b-container>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Ingrese sus credenciales</small>
              </div>

              <b-form role="form">
                <b-form-input
                  class="mb-3"
                  name="Email"
                  placeholder="Email"
                  v-model="user.email"
                ></b-form-input>

                <b-form-input
                  class="mb-3"
                  name="Password"
                  type="password"
                  placeholder="Password"
                  v-model="user.password"
                ></b-form-input>

                <div class="text-center">
                  
                  <b-row v-if="loading" class="text-md-center">
                      <b-col md="12">
                        <b-icon
                          icon="three-dots"
                          animation="cylon"
                          font-scale="4"
                        ></b-icon>
                        <p>Espere un momento</p>
                      </b-col>
                    </b-row>
                    <b-button v-else @click="handleClick" class="my-4" variant="primary">
                    Autenticar
                  </b-button>
                </div>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    user: {},
    loading: false,
  }),
  methods: {
    handleClick() {
      this.loading = true;
      this.$store.dispatch("auth/login", this.user).then(
        (response) => {
          if (response && response === 200) {
            this.user = {};
            this.$router.push("/");
          }
          this.loading = false;
        },
        (e) => {
          console.log(e);
          this.user.password = "";
          this.loading = false;
        }
      );
    },
  },
};
</script>

<style css scoped>
.bg-gradient-success {
  background: linear-gradient(87deg, #2dce89, #2dcecc) !important;
}
.bg-secondary {
  background-color: #f7fafc !important;
}
.fill-default {
  background-color: #172b4d !important;
}
</style>