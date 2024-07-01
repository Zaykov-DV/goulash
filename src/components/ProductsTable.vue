<template>
  <div class="products-table">
    <table class="products-table__table">
      <thead>
      <tr>
        <td>Название товара</td>
        <td>Количество</td>
        <td>Стоимость</td>
      </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.title }}</td>
          <td>{{ product.quantity }} шт.</td>
          <td>{{ productPrice(product) }}</td>
        </tr>
      </tbody>
      <tfoot class="products-table__table-footer">
      <tr>
        <td>Итого: {{totalPrice()}}</td>
      </tr>
      </tfoot>
    </table>
    <Button class="products-table__button" label="Сохранить" @click="orderProducts" color="secondary"/>
  </div>
</template>

<script setup>
import Button from "./UI/Button.vue";
import {saveProducts} from "../../api/save.js";

const props = defineProps({
  products: {
    type: Array,
    default: () => {}
  }
})

const orderProducts = async () => {
  const mapProducts = props.products.map((product => {
    return {
      product_id: product.id,
      quantity: product.quantity
    }
  }))

  await saveProducts(mapProducts).then((response => {
    if(response.success) {
      alert(`Номер заказа: ${response.code}`)
    }
  }))
}

const productPrice = (product) => {
  return product.price * product.quantity
}

const totalPrice = () => {
  return props.products.reduce((currentSum, product) => {
    return currentSum + productPrice(product)
  }, 0)
}
</script>

<style scoped lang="scss">
.products-table {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  &__table {
    height: 100%;
  }

  &__button {
    margin-top: 40px;
  }
}
</style>
