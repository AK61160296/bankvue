<template>
  <div>
    <br>
    <b-form inline class="form">
      คำค้นหา : 
      <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input
          id="inline-form-input-username"
          placeholder="เลขบัญชี ชื่อย่อบัญชี"
          v-model="keyword"
          maxlength="20"
        ></b-form-input>
      </b-input-group>
      <b-button class="btn" variant="danger"  v-on:click="Search()">ค้นหา</b-button>
      <b-button class="btn" variant="primary" v-on:click="onClickOpenModal(0, '1')"
        >เพิ่มบัญชี</b-button
      >
    </b-form>

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
        <tr v-for="list in AccountDataApi" :key="list.id">
          <td>{{ list.acNumber }}</td>
          <td>{{ list.acName }}</td>
          <td>{{ list.acBalance }}<span style="font-size:11px"> THB</span></td>
          <td v-if="list.acIsActive == 1">ใช้งาน</td>
          <td v-else>ไม่ใช้งาน</td>
          <td>
            <b-button
              variant="warning"
              v-on:click="onClickOpenModal(list.acId, '2')"
              >เเก้ไข</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>
    <modal-detail-account
      v-if="modalType == '1'"
      @saveData="saveData"
      :modalType="modalType"
      :accountDetail="accountDetail"
    />
    <modal-detail-account
      v-else
      @saveData="saveData"
      :accountDetail="accountDetail"
      :modalType="modalType"
    />
  </div>
</template>

<script>
import ModalDetailAccount from "./ModalDetailAccount.vue";
export default {
  components: {
    ModalDetailAccount,
  },
  name: "account-table",
  data() {
    return {
      keyword:"",
      searchObj: { acNumber: "", acName: "" },
      AccountDataApi: null,
      modalType: "",
      accountDetail: {
        acId: "",
        acName: "",
        acNumber: "",
        acIsActive: "",
      },
    };
  },
  mounted() {
    this.Search();
  },
  methods: {
    Search() {
      this.searchObj={
        acNumber:this.keyword,
        acName:this.keyword
      }
      this.axios
        .post("http://localhost:29245/Home/Search", this.searchObj)
        .then((response) => {
          console.log(response.data)
          this.AccountDataApi = response.data;
        });
    },
    saveData(status) {
      alert(status);
      this.Search();
    },
    onClickOpenModal(id, Type) {

      this.modalType = Type;
      if (Type == "2" && id != 0) {
        const row = this.AccountDataApi.find((element) => element.acId == id);
        this.accountDetail.acId = id;
        this.accountDetail.acName = row.acName;
        this.accountDetail.acNumber = row.acNumber;
        this.accountDetail.acIsActive = row.acIsActive;
      } else {
        this.accountDetail.account_id = "";
        this.accountDetail.acName = "";
        this.accountDetail.acNumber = "";
        this.accountDetail.acIsActive = "";
      }
      console.log(this.accountDetail)
      this.$bvModal.show("modal-detail-account");
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
.form {
  margin-left: 52.1rem;
  margin-right: 10px;
  margin-bottom: 10px;
  /* background-color: #008cba; */
}
table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #008cba;
  color: white;
}
 button{
   margin-right: 15px;
 }
 input{
    margin-right: 10px;
    margin-left: 5px;
 }
</style>
