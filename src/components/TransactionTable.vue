<template>
  <div>
    <button-add-transaction />
    <modal-deposit-withdraw :listaccount="listaccount" />
    <modal-tranfer :listaccount="listaccount" />
    <table>
      <thead>
        <tr>
          <th>วันที่</th>
          <th>เลขบัญชี</th>
          <th>รายละเอียด</th>
          <th>หักบัญชี</th>
          <th>เข้าบัญชี</th>
          <th>ยอดเงินคงเหลือ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="list in listtransaction" :key="list.id">
          <td>{{ list.transaction_date }}</td>
          <td>{{ list.transaction_number }}</td>
          <td>{{ list.transaction_detail }}</td>
          <td>{{ list.transaction_deduction }}</td>
          <td>{{ list.transaction_Addmonney }}</td>
          <td>{{ list.transaction_balance }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ModalTranfer from "./ModalTranfer.vue";
import ModalDepositWithdraw from "./ModalDepositWithdraw.vue";
import ButtonAddTransaction from "./ButtonAddTransaction.vue";
export default {
  components: {
    ButtonAddTransaction,
    ModalTranfer,
    ModalDepositWithdraw
  },
  props: {
    listaccount: Array,
  },
  data(){
    return{
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
    }
  }
};
</script>
<style scoped>
table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}
table thead th {
  text-align: center;
  height: 40px;
}
table td,
table th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  height: 35px;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}

table tr:hover {
  background-color: #ddd;
}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #008cba;
  color: white;
}
</style>
