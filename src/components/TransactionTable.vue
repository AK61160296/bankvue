<template>
  <div>
    <button-add-transaction/>
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
import ButtonAddTransaction from './ButtonAddTransaction.vue';
export default {
  components: {
    ButtonAddTransaction
  },
  props: {
    listtransaction: Array,
  },
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
