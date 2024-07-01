<template>
  <Header />
  <div class="main-page">
    <form @submit.prevent>
      Выберите продукцию
      <Select class="main-page__control" :options="selectOptions" v-model="selectedProduct"/>

      <Input class="main-page__control" name="Введите количество" label="Введите количество" type="number" v-model="countProduct"/>

      <Button label="Добавить" @click="addProduct" :disabled="!selectedProduct.length && countProduct <= 0 "/>
    </form>

    <ProductsTable :products="chosenProducts"/>
  </div>
  <Footer />
</template>


<script setup>
import Select from "../components/UI/Select.vue";
import {ref, onMounted} from 'vue'
import {getProducts} from "../../api/products.js";
import Input from "../components/UI/Input.vue";
import Button from "../components/UI/Button.vue";
import ProductsTable from "../components/ProductsTable.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

const selectOptions = ref([])
const selectedProduct = ref({})

const chosenProduct = ref({})
const chosenProducts = ref([])
const countProduct = ref(0)

const addProduct = () => {
  chosenProduct.value = Object.assign({...selectedProduct.value, quantity: +countProduct.value})

  chosenProducts.value.push(chosenProduct.value)
}

onMounted(async () => {
  const response = await getProducts()
  if (response.success) {
    selectOptions.value = response.products
  }
})
</script>

<style lang="scss" scoped>
.main-page {
  display: grid;
  grid-template-columns: 4fr 8fr;
  gap: 50px;
  padding: 40px 50px 64px 26px;
  flex: 1;

  &__control {
    margin-bottom: 40px;
  }
}
</style>
