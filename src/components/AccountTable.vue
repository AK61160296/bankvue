<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>เลขบัญชี</th>
          <th>ชื่อย่อบัญชี</th>
          <th>ยอดคงเหลือ</th>
          <th>สถานะ</th>
          <th>เครื่องมือ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="list in listaccount" :key="list.id">
          <td>{{ list.account_number }}</td>
          <td>{{ list.account_name }}</td>
          <td>0</td>
          <td v-if="list.account_status == 1">ใช้งาน</td>
          <td v-else>ไม่ใช้งาน</td>
          <td>
            <b-button variant="warning" v-on:click="checkvalue(list.id)"
              >เเก้ไข</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>
    <modal-edit-account :listaccount_edit="listaccount_edit" />
  </div>
</template>

<script>
import ModalEditAccount from "./ModalEditAccount.vue";
export default {
  components: {
    ModalEditAccount,
  },
  name: "account-table",
  data() {
    return {
      accountmodal: false,
      listaccount_edit: {
        account_name_edit: "",
        account_number_edit: "",
        account_status_edit: "",
      },
    };
  },
  props: {
    listaccount: Array,
  },
  methods: {
    checkvalue(id) {
      // alert("step1")
      this.listaccount_edit = {
        account_name_edit: this.listaccount[id - 1].account_name,
        account_number_edit: this.listaccount[id - 1].account_number,
        account_status_edit: this.listaccount[id - 1].account_status,
      };
      this.$bvModal.show("modal-edit-account");
    },
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
