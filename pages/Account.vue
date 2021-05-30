<template>
  <div>
    <AccountTable />
  </div>
</template>

<script lang="ts">
import AccountTable from '~/components/AccountTable.vue'
export default {
  layout: 'empty',
  asyncData() {
    if (process.server) {
      console.log('server')
    }
    return { view: 'hoooo' }
  },
  components: {
    AccountTable,
  },
}
</script>

<style></style>
