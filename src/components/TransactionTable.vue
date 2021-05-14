<template>
  <div>
    <br />
    <button-add-transaction
      @setValueSearch="setValueSearch"
      @OpenModal="OpenModal"
    />
    <modal-deposit-withdraw
      v-if="type.type_wepositWithdraw == true"
      @saveData="saveData"
      :trasactionDetail="trasactionDetail"
    />
    <modal-tranfer
      v-else
      @saveData="saveData"
      :trasactionDetail="trasactionDetail"
    />
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
        <tr v-for="list in tansactionDataApi" :key="list.id">
          <td>{{ list.date1 }}</td>
          <td>{{ list.name }}</td>
          <td>{{ list.tsDetail }}</td>
          <td
            v-if="
              list.tsType == 1 ||
                (list.tsType == 4 && list.tsAcDestinationId != 0)
            "
          >
            -
          </td>
          <td
            v-if="
              list.tsType == 1 ||
                (list.tsType == 4 && list.tsAcDestinationId != 0)
            "
          >
            {{ list.tsMoney }}
          </td>
          <td
            v-if="
              (list.tsType == 2 && list.tsAcDestinationId == 0) ||
                list.tsType == 3
            "
          >
            {{ list.tsMoney }}
          </td>
          <td
            v-if="
              (list.tsType == 2 && list.tsAcDestinationId == 0) ||
                list.tsType == 3
            "
          >
            -
          </td>
          <td>{{ list.tsBalance }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ModalTranfer from "./ModalTranfer.vue";
import ModalDepositWithdraw from "./ModalDepositWithdraw.vue";
import ButtonAddTransaction from "./ButtonAddTransaction.vue";
export default {
  components: {
    ButtonAddTransaction,
    ModalTranfer,
    ModalDepositWithdraw,
  },
  props: {},
  data() {
    return {
      type: {
        type_tranfer: false,
        type_wepositWithdraw: false,
      },
      transactionDataApi: null,
      searchObj: { keyword: "", date_begin: "", date_end: "", TsDetail: "" },
      trasactionDetail: {
        TsAcId: null,
        TsType: null,
        TsMoney: null,
        TsDetail: "",
        TsNote: "",
        TsAD: "",
      },
    };
  },
  mounted() {
    this.Search();
  },
  methods: {
    OpenModal(type) {
      if (type == 1) {
        this.type = {
          type_tranfer: true,
          type_wepositWithdraw: false,
        };
      } else {
        this.type = {
          type_tranfer: false,
          type_wepositWithdraw: true,
        };
      }
      this.$bvModal.show("modal-detail");
    },
    setValueSearch(value) {
      this.searchObj = {
        keyword: value.keyword,
        date_begin: value.dateBegin,
        date_end: value.dateEnd,
        TsDetail: value.keyword,
      };
      this.Search();
    },
    Search() {
      this.$store.dispatch("transaction/Seacrh", this.searchObj);
    },
    saveData(Status) {
      if (Status == "success") {
        alert("success");
      } else {
        alert("error");
      }
      this.Search();
    },
  },
  computed: {
    ...mapState("transaction", ["tansactionDataApi"]),
  },
};
</script>
<style scoped>
table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 75%;
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
