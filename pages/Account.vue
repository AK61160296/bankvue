<template>
  <div>
    <Header/>
    <AccountTable />
  </div>
</template>

<script lang="ts">
import Header from '~/components/Header.vue'
import AccountTable from '~/components/AccountTable.vue'
export default {
  components: {
    AccountTable,
    Header
  },
}
</script>

<style></style>
