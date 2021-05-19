<template>
  <div>
    <Header />
    <br><br>
    <TransactionTable />
  </div>
</template>

<script lang="ts">
import Header from '~/components/Header.vue'
import TransactionTable from '~/components/TransactionTable.vue'
export default {
  components: {
    TransactionTable,
    Header,
  },
}
</script>

<style></style>
