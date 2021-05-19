<template>
  <div>
    <br><br>
    <h1>รายการบัญชี</h1>
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
      <b-button class="btn" variant="danger" v-on:click="Search()"
        >ค้นหา</b-button
      >
      <b-button
        class="btn"
        variant="primary"
        v-on:click="onClickSetDataInModal(0, '1')"
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
        <tr v-for="(list) in AccountDataApi" :key="list.id">
          <td>{{ list.acNumber }}</td>
          <td>{{ list.acName }}</td>
          <td>{{ list.acBalance }}<span style="font-size:11px"> THB</span></td>

          <td v-if="list.acIsActive == 1">
            <b-form-checkbox
              switch
              size="lg"
              @change="onChangeStatus(list.acId, list.acIsActive)"
              checked="true"
            ></b-form-checkbox>
          </td>
          
          <td v-else>
            <b-form-checkbox
              switch
              size="lg"
              @change="onChangeStatus(list.acId, list.acIsActive)"
            ></b-form-checkbox>
          </td>
          <td>
            <b-button
              variant="warning"
              v-on:click="onClickSetDataInModal(list.acId, '2')"
              >เเก้ไข</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>
    <modal-detail-account
      v-if="modalType == '1'"
      @showRecordingResults="showRecordingResults"
      :modalType="modalType"
      :accountDetail="accountDetail"
    />
    <modal-detail-account
      v-else
      @showRecordingResults="showRecordingResults"
      :accountDetail="accountDetail"
      :modalType="modalType"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

import ModalDetailAccount from "./ModalDetailAccount.vue";
export default {
  components: {
    ModalDetailAccount,
  },
  name: "account-table",
  data() {
    return {
      keyword: "",
      searchObj: { acNumber: "", acName: "", userId: "" },
      updateStatus: { acId: "", acIsActive: "" },
      modalType: "",
      accountDetail: {
        acId: "",
        acName: "",
        acNumber: "",
        acIsActive: "",
        userId: this.userIdLogin,
      },
    };
  },
  mounted() {
    this.Search();
  },
  methods: {
    async onChangeStatus(id, status) {
      if (status == 2) {
        status = 1;
      } else {
        status = 2;
      }
      this.updateStatus = {
        acId: id,
        acIsActive: status,
      };
      await this.$store.dispatch("account/updateStatus", this.updateStatus);
      //
      await this.Search();
    },
    Search() {
      this.searchObj = {
        acNumber: this.keyword,
        acName: this.keyword,
        userId: this.userIdLogin,
        //user
      };
      this.$store.dispatch("account/Seacrh", this.searchObj);
    },
    showRecordingResults(status) {
      if (status == "success") {
        alert("บันทึกข้อมูลสำเร็จ");
      }else{
         alert("ไม่สามารถบันทึกข้อมูลได้เนื่องจากเลขบัญชีซ้ำ");
      }
      this.Search();
    },
    async onClickSetDataInModal(id, Type) {
      this.modalType = Type;
      if (Type == "2" && id != 0) {
        await this.$store
          .dispatch("account/editAccount", id)
          .then((response) => {
            this.accountDetail.acId = response.data.acId;
            this.accountDetail.acName = response.data.acName;
            this.accountDetail.acNumber = response.data.acNumber;
            this.accountDetail.acIsActive = response.data.acIsActive;
          });
      } else {
        this.accountDetail.acName = "";
        this.accountDetail.acNumber = "";
        this.accountDetail.acIsActive = "";
      }
      await this.$bvModal.show("modal-detail");
    },
  },

  computed: {
    ...mapState("account", ["AccountDataApi"]),
    ...mapState("user", ["userIdLogin", "userName"]),
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
button {
  margin-right: 15px;
}
input {
  margin-right: 10px;
  margin-left: 5px;
}
h1 {
  margin-left: 230px;
  margin-bottom: 50px;
}
</style>
