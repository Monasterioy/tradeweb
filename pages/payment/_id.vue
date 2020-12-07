<template>
  <div>
    <section class="content content_content" style="width: 70%; margin: auto">
      <section class="invoice" style="padding-left: 40px; padding-right: 40px">
        <!-- title row -->
        <el-row>
          <el-col :span="24"
            ><div class="grid-content">
              <el-button
                type="primary"
                style="width: 20%; margin-top: 10px; float: right"
                v-if="invoice.status === 'To pay'"
                @click="payInvoice()"
                >Pagar Factura</el-button
              >
              <el-button
                type="primary"
                style="width: 20%; margin-top: 10px; float: right"
                v-if="invoice.status === 'Payment'"
                @click="redirect()"
                >Salir</el-button
              >
            </div></el-col
          >
        </el-row>
        <center>
          <img
            src="../../assets/img/epayco.png"
            width="220px"
            style="margin-top: 30px"
          />
        </center>
        <el-row>
          <el-col :span="12"
            ><div class="grid-content">
              <p style="color: transparent">Factura</p>
            </div></el-col
          >
          <el-col :span="12"
            ><div class="grid-content" style="float: right"></div
          ></el-col>
        </el-row>

        <el-row style="margin-top: 40px">
          <el-col :span="8"
            ><div class="grid-content">
              <p style="color: #3e3e3e">De</p>
              <p class="mb-1">{{ creator.name }} {{ creator.lastName }}</p>
              <p class="mb-1">{{ creator.email }}</p>
            </div></el-col
          >
          <el-col :span="8"
            ><div class="grid-content">
              <p style="color: #3e3e3e">Para</p>
              <p class="mb-1">{{ client.name }} {{ client.lastName }}</p>
              <p class="mb-1">{{ client.address}} </p>
              <p class="mb-1">{{ client.email }}</p>
            </div></el-col
          >
          <el-col :span="8"
            ><div class="grid-content" style="float: right">
              <p style="color: #3e3e3e; font-size: 20px">
                Factura Nº {{ invoice.code }}
              </p>
              <br />
              <p class="mb-1"><span class="text-muted">ID: </span> 10253642</p>
              <p class="mb-1">
                <span class="text-muted">Status: </span>{{ invoice.status === 'To pay' ? 'Por Pagar' : 'Cancelada' }}
              </p>
              <p class="mb-1">
                <span class="text-muted">Emisión:</span> {{dateEmited}}
              </p>
            </div></el-col
          >
        </el-row>

        <el-row style="margin-top: 40px">
          <el-col :span="24">
            <div class="grid-content">
              <el-table :data="tableData" height="350" style="width: 100%">
                <el-table-column prop="name" label="Producto">
                </el-table-column>
                <el-table-column
                  prop="description"
                  label="Descripcion"
                  width="180"
                >
                </el-table-column>
                <el-table-column prop="price" label="Total" width="180">
                </el-table-column>
              </el-table></div
          ></el-col>
        </el-row>

        <el-row>
          <el-col :span="6"
            ><div class="grid-content" style="background-color: #272727">
              <br /><br />
              <div class="mb-2" style="color: transparent">Discount</div>
              <div class="h2 font-weight-light" style="color: transparent">
                10%
              </div>
              <br /><br /></div
          ></el-col>
          <el-col :span="6"
            ><div
              class="grid-content"
              style="
                background-color: #272727;
                color: white;
                padding-left: 60px;
              "
            >
              <br /><br />
              <div class="mb-2">
                Subtotal<br /><b>${{ invoice.subtotal }}</b>
              </div>
              <br /><br /></div
          ></el-col>
          <el-col :span="6"
            ><div
              class="grid-content"
              style="
                background-color: #272727;
                color: white;
                padding-left: 60px;
              "
            >
              <br /><br />
              <div class="mb-2">
                Descuento<br /><b>${{ invoice.discount}}</b>
              </div>
              <br /><br /></div
          ></el-col>
          <el-col :span="6"
            ><div
              class="grid-content"
              style="
                background-color: #272727;
                color: white;
                padding-left: 60px;
              "
            >
              <br /><br />
              <div class="mb-2">
                Total<br /><b>${{ invoice.total }}</b>
              </div>
              <br /><br /></div
          ></el-col>
        </el-row>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("este es el mounted");
    console.log(this.$route.params.id);
    this.init();
  },
  data() {
    return {
      tableData: [],
      dateEmited: "",
      invoice: "",
      client: "",
      creator: "",
      labelPosition: "top",
      formLabelAlign: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async init() {
      this.invoice = "";
      this.$axios
        .$get(`${process.env.API_URL}/invoice/get-one/${this.$route.params.id}`)
        .then((response) => {
          this.dateEmited = this.$moment(response.data.createdAt).format("YYYY-MM-DD");
          this.invoice = response.data;
          this.client = response.data.client;
          this.creator = response.data.creator;
          this.tableData = [];
          this.tableData = response.data.products.map((product) => {
            const response = {
              name: product.name,
              price: product.price,
              description: product.description,
            };
            return response;
          });
        });
    },
    async redirect() {
      this.$router.push("/");
    }, 
    async payInvoice() {
      this.$axios
        .$get(`${process.env.API_URL}/invoice/pay/${this.$route.params.id}`)
        .then((response) => {
          this.invoice = response.data;
          this.client = response.data.client;
          this.$notify({
            title: "Factura Cancelada Satisfactoriamente",
            message: "La factura se ha generado de forma satisfactoria",
            type: "success",
          });
        })
        .catch((err) => {
          this.$notify({
            title: "Error al genaral factura",
            message: "Ha ocurrido un error inesperado al generar la factura",
            type: "error",
          });
        });
    },
  },
};
</script>

<style>
p {
  font-family: Source Sans Pro;
  color: #8a8a8a;
}

.invoice {
  position: relative;
  background: #fff;
  border: 1px solid #f4f4f4;
  padding: 20px;
  margin: 10px 25px;
}
.page-header {
  margin: 10px 0 20px 0;
  font-size: 22px;
}

div #payment {
  background-color: white;
  background-size: cover;
  padding: 72px;
}

.Form {
  margin-top: -20px;
}
.form-heading {
  color: #fff;
  font-size: 23px;
}
.panel p {
  color: #777777;
  font-size: 14px;
  margin-bottom: 30px;
  line-height: 24px;
}

.main-div {
  background: #ffffff none repeat scroll 0 0;
  border-radius: 2px;
  margin: 10px auto 30px;
  max-width: 38%;
  padding: 50px 70px 70px 71px;
  opacity: 93%;
}
</style>
