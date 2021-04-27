<template>
  <div class="small-container">
    <my-header @subcom="switchcomponent" color="red" />
    <br />
    <br />
    <h1 v-if="subaccount == true">รายการบัญชี</h1>
    <h1 v-else>รายการธุรกรรม</h1>
    <account-table v-if="subaccount"  />
    <transaction-table v-else  />
    <br />
    <br />
  </div>
</template>

<script>
import AccountTable from "./components/AccountTable.vue";
import Header from "./components/Header.vue";
import TransactionTable from "./components/TransactionTable.vue";
export default {
  name: "App",
  components: {
    AccountTable,
    "my-header": Header,
    TransactionTable,
  },
  data() {
    return {
      subaccount: true,
      subtransaction: false,
    };
  },
  methods: {
    switchcomponent(value) {
      this.subtransaction = value.TrasactionTable;
      this.subaccount = value.AccountTable;
    },
  },
};
</script>

<style>
* {
  margin: 0;
}
h1 {
  margin-left: 230px;
  margin-bottom: 50px;
}
</style>
