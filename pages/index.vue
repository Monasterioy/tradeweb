<template>
  <div>
    <el-container>
      <el-main
        style="background-color: white; margin-top: 50px; padding-bottom: 110px"
      >
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="container">
              <center>
                <img
                  src="../assets/img/tribal.png"
                  width="400px"
                  style="margin-top: 50px"
                />
              </center>

              <center>
                <el-input  v-loading = "loading" 
                  placeholder="Introduzca su busqueda"
                  v-model="search"
                  class="input-with-select"
                  size="large"
                  style="width: 60%"
                >
                  <el-button
                    slot="append"
                    @click="submit()"
                    icon="el-icon-search"
                  ></el-button>
                </el-input>
              </center>
            </div>
            <br /><br /><br /><br
          /></el-col>
        </el-row>
      </el-main>
    </el-container>

    <center><el-footer style="background-color: white"
      ><div style="padding-bottom: 20px; margin-top: 20px">
        <a style="color: grey">© Copyright Tribal 2020</a>
      </div>
    </el-footer></center>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      loading: false,
    };
  },
  mounted() {},

  methods: {
    submit() {
      if (!this.search) {
        this.$notify.warning({
          title: "Datos Vacios",
          message: "Debe Ingresar datos para realizar la busqueda",
        });
      } else {
        this.loading = true;
        this.$axios
          .$get(`${process.env.API_URL}/query/search/${this.search}`)
          .then((response) => {
            console.log(response);
            if (response) {
              this.loading = false;
              this.$router.push("/panel");
              this.$router.push({name: 'panel', params: response })
            }
          })
          .catch((err) => {
            this.loading = false;
            this.$notify.error({
              title: "Error",
              message: "Error en la busqueda por favor intente nuevamente",
            });
          });
      }
    },
  },
  computed: {},
};
</script>

<style>
</style>
