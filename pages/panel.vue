<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4">
            <a href="/"><img
              src="../assets/img/tribal.png"
              width="180px"
              style="float: left; margin-top: 10px"
              
            /></a>
          </el-col>

          <el-col :span="20">
          <el-input  v-loading = "loading" 
                  placeholder="Introduzca su busqueda"
                  v-model="search"
                  class="input-with-select"
                  size="large"
                  style="float:left;margin-top:30px;width: 60%;"
                >
                  <el-button
                    slot="append"
                    @click="submit()"
                    icon="el-icon-search"
                  ></el-button>
                </el-input>
          </el-col>

          <el-col :span="6">
          <el-tag type="warning" style="margin-top:10px;"><i class="el-icon-search"></i> Todos</el-tag>
  </el-tabs>
          </el-col>
        </el-row>
        
      </el-header>
      <el-container>
        <el-main style="background-color:white;">
         

          <el-row :gutter="20">
            <el-col :span="24">
              <div >
                <br />
                <h4>Cerca de {{quantity}} resultados</h4>
                <br />

                <!--colocar aca resumen de factura -->

                <div class="container">
                  <div class="row">
                    <div class="col-lg-8">
                      <div class="table-cart">
                        <div v-for="data in datas">
                          <span style="font-size:13px;color:grey;">{{data.url}} </span>
                          <br><br><a style="font-size:23px;color:#1a32ca;text-decoration:none;" :href=data.url>{{data.name}}</a>
                          <p style="color:#4d5156;margin-top:7px;">{{data.description}} </p><br>
                         

                          </div>
                      </div>
                    </div>
                    <!-- /.col-lg-8 -->

                    <br />
                  </div>
                </div>
              </div>
              <br /><br /><br /><br
            /></el-col>
          </el-row>
        </el-main>

       <center><el-footer style="background-color: white"
      ><div style="padding-bottom: 20px; margin-top: 20px">
        <a style="color: grey">© Copyright Tribal 2020</a>
      </div>
    </el-footer></center>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      datas:'',
      quantity: 0,
      loading: false
    };
  },
  mounted() {
    const data = this.$route.params.data
    this.init(data)
  },

  methods: {
    async init(data) {
      this.datas = data
      this.quantity = data.length
    },
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
              this.quantity = response.data.length;
              console.log('esta es la respuesta', response.data)
              this.loading = false
              this.init(response.data)
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
  computed: {

  },
};
</script>

<style>



h1 {
  font-size: 28px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.grid-content {
  border-radius: 2px;
  min-height: 36px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #ffffff;
  box-shadow: 2px 2px 2px 1px #eaeae9;
}

.el-footer {
  background-color: #3b3a3a;
  color: white;
  text-align: center;
  padding-bottom: 50px;
}

.el-header {
  background-color: #ffffff;
  padding-left: 90px;
  padding-right: 90px;
  margin-top: -10px;
  height: 130px !important;
  box-shadow: 2px 2px 5px #eaeae9;
}

.el-main {
  padding-left: 90px;
  padding-right: 90px;
  background-color: #f9f9f9;
  color: #333;
}

.el-container {
  margin-top: 5px;
}
</style>
