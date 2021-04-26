<template>
  <div class="small-container">
    <my-header @subcom="switchcomponent" color="red" />
    <br/>
    <br/>
    <h1 v-if="subaccount == true">รายการบัญชี</h1>
    <h1 v-else>รายการธุรกรรม</h1>
    <button-add-account v-if="subaccount" />
    <modal-add-account @add:account1="addAccount" />
    <modal-deposit-withdraw :listaccount="listaccount"/>
    <modal-tranfer :listaccount="listaccount"/>
    <account-table v-if="subaccount" :listaccount="listaccount" />
    <transaction-table v-else :listtransaction="listtransaction" />
    <br/>
    <br/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import AccountTable from "./components/AccountTable.vue";
import Header from "./components/Header.vue";
import TransactionTable from "./components/TransactionTable.vue";
import ButtonAddAccount from "./components/ButtonAddAccount.vue";
import ModalAddAccount from "./components/ModalAddAccount.vue";

import ModalTranfer from "./components/ModalTranfer.vue";
import ModalDepositWithdraw from "./components/ModalDepositWithdraw.vue";
export default {
  name: "App",
  components: {
    AccountTable,
    "my-header": Header,
    TransactionTable,
    ButtonAddAccount,
    ModalAddAccount,
    ModalTranfer,
    ModalDepositWithdraw
  },
  data() {
    return {
      subaccount: true,
      subtransaction: false,
      listaccount: [
        {
          id: 1,
          account_name: "View",
          account_number: "121212122",
          account_status: "1",
        },
        {
          id: 2,
          account_name: "Test",
          account_number: "13123123",
          account_status: "2",
        },
      ],
      listtransaction: [
        {
          id: 1,
          transaction_date: "20/04/2555",
          transaction_number: "111111111",
          transaction_detail: "โอนเงิน",
          transaction_deduction: "100",
          transaction_Addmonney: "-",
          transaction_balance: "100",
        },
        {
          id: 2,
          transaction_date: "20/04/2555",
          transaction_number: "222222222",
          transaction_detail: "ฝากเงิน",
          transaction_deduction: "-",
          transaction_Addmonney: "1000",
          transaction_balance: "1000",
        },
      ],
    };
  },
  methods: {
    addAccount(acccount_data) {
      const last_id =
        this.listaccount.length > 0
          ? this.listaccount[this.listaccount.length - 1].id
          : 0;
      const id = last_id + 1;
      const new_account_data = { ...acccount_data, id };
      this.listaccount = [...this.listaccount, new_account_data];
      console.log(this.listaccount);
    },
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
