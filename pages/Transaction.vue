<template>
  <div>
    <br /><br />
    <TransactionTable />
  </div>
</template>

<script lang="ts">
import TransactionTable from '~/components/TransactionTable.vue'
export default {
  layout: 'empty',
  components: {
    TransactionTable,
  },
}
</script>

<style></style>
