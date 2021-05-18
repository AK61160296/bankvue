<template>
  <div class="small-container">
    <Header v-if="subcomponent != 3" @subcom="switchcomponent" color="red" />
    <br />
    <br />
    <h1 v-if="subcomponent == 1">รายการบัญชี</h1>
    <h1 class="headerTransaction" v-if="subcomponent == 2">รายการธุรกรรม</h1>
    <h1 v-if="subcomponent == 3">รายการผู้ใช้</h1>
    <account-table v-if="subcomponent == 1" />
    <transaction-table v-if="subcomponent == 2" />
    <users-table v-if="subcomponent == 3" @subcom="switchcomponent" />
    <br />
    <br />
 
  </div>
</template>

<script>
import UsersTable from "./components/UsersTable.vue";
import AccountTable from "./components/AccountTable.vue";
import Header from "./components/Header.vue";
import TransactionTable from "./components/TransactionTable.vue";
export default {
  name: "App",
  components: {
    AccountTable,
    Header,
    TransactionTable,
    UsersTable,
  },
  data() {
    return {
      name:"",
      subcomponent: 3,
      subaccount: true,
      subtransaction: false,
    };
  },
  methods: {
    switchcomponent(value) {
      this.subcomponent = value;
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
.headerTransaction {
  margin-left: 12rem;
}
</style>
