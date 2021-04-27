<template>
  <div>
    <button-add-account />
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
            <b-button variant="warning" v-on:click="onClickOpenModal(list.id)"
              >เเก้ไข</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>
    <modal-add-account @add:account1="addAccount" />
    <modal-edit-account
      @edit:accountedit="editAccount"
      :detail="detail"
    />
  </div>
</template>

<script>
import ButtonAddAccount from "./ButtonAddAccount.vue";
import ModalAddAccount from "./ModalAddAccount.vue";
import ModalEditAccount from "./ModalEditAccount.vue";
export default {
  components: {
    ModalEditAccount,
    ButtonAddAccount,
    ModalAddAccount,
  },
  name: "account-table",
  data() {
    return {
      listaccount: [
        {
          id: 1,
          account_name: "View",
          account_number: "1111111111",
          account_status: "1",
        },
      ],
      detail: {
        account_id: "",
        account_name_edit: "",
        account_number_edit: "",
        account_status_edit: "",
      },
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
    },
    editAccount(acccount_data) {
      const row = this.listaccount.find(element => element.id == acccount_data.account_id);
      row.account_name = acccount_data.account_name_edit;
      row.account_status = acccount_data.account_status_edit;
    },
    onClickOpenModal(id) {
      const row = this.listaccount.find(element => element.id == id);
      this.detail.account_id = id;
      this.detail.account_name_edit = row.account_name;
      this.detail.account_number_edit = row.account_number;
      this.detail.account_status_edit = row.account_status;
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
