<template>
  <div>
    <AccountTable />
  </div>
</template>

<script lang="ts">
import AccountTable from '~/components/AccountTable.vue'
export default {
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
