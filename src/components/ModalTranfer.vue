<template>
  <div>
    <bank-modal>
      <template v-slot:header>
        <h3>โอนเงิน</h3>
      </template>
      <template v-slot:body>
        <form ref="form" >
          <b-form-group
            label="จาก"
            label-for="name-input"
            invalid-feedback="Name is required"
            :state="nameState"
          >
            <b-form-select
              v-on:change="getBalance(ModalData.tranfer_account)"
              v-model="ModalData.tranfer_account"
              :options="options"
            >
            </b-form-select>
            <span v-if="show" id="hide">ยอดเงินคงเหลือ {{ balance }} THB</span>
          </b-form-group>

          <b-form-group
            label="ไปที่"
            label-for="name-input"
            invalid-feedback="Name is required"
            :state="nameState"
          >
            <b-form-input
              id="name-input"
              v-model="ModalData.tranfer_payee"
              :state="nameState"
              required
              maxlength="10"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="จำนวนเงิน"
            label-for="name-input"
            invalid-feedback="Name is required"
            :state="nameState"
          >
            <b-form-input
              id="name-input"
              v-model="ModalData.tranfer_monney"
              :state="nameState"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="หมายเหตุ"
            label-for="name-input"
            invalid-feedback="Name is required"
            :state="nameState"
          >
            <b-form-textarea
              id="textarea-small"
              size="sm"
              v-model="ModalData.tranfer_note"
            >
            </b-form-textarea>
          </b-form-group>
        </form>
      </template>
      <template v-slot:footer>
        <b-button variant="secondary" v-on:click="resetModal">ยกเลิก</b-button>
        <b-button variant="primary" v-on:click="handleOk">บันทึก</b-button>
      </template>
    </bank-modal>
  </div>
</template>

<script>
import BankModal from "./BankModal.vue";
export default {
  components: {
    BankModal,
  },
  data() {
    return {
      balance: 0,
      show: false,
      nameState: null,
      ModalData: {
        tranfer_account: "",
        tranfer_payee: "",
        tranfer_monney: "",
        tranfer_detail: "",
        tranfer_note: "",
      },
      trasactionDetail: {
        TsAcId: null,
        TsType: null,
        TsMoney: null,
        TsDetail: "",
        TsNote: "",
        TsAD: "",
      },
      postAccountId: {
        TsAcId: "",
      },
      options: [
        { value: "", text: "-- กรุณาเลือกเลขบัญชี --", disabled: true },
      ],
    };
  },
  props: {
    accountData: Array,
  },
  methods: {
    getBalance(Account) {
      this.show = true;
      this.postAccountId.TsAcId = Account;
      this.$store
        .dispatch("transaction/getBalance", this.postAccountId)
        .then((response) => {
          this.balance = response.data;
        });
    },
    optionAccount() {
      this.accountData.forEach((element) => {
        this.options.push({
          value: element.acId,
          text: element.acNumber,
        });
      });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.show = false;
      (this.ModalData = {
        tranfer_account: "",
        tranfer_payee: "",
        tranfer_monney: "",
        tranfer_detail: "",
        tranfer_note: "",
      }),
        (this.nameState = null);
      this.$nextTick(() => {
        this.$bvModal.hide("modal-detail");
      });
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.trasactionDetail = {
        TsAcId: parseInt(this.ModalData.tranfer_account),
        TsType: 3,
        TsMoney: parseInt(this.ModalData.tranfer_monney),
        TsDetail: "โอนเงิน",
        TsNote: this.ModalData.tranfer_note,
        TsAD: this.ModalData.tranfer_payee,
      };
      this.$store
        .dispatch("transaction/Transfer", this.trasactionDetail)
        .then((response) => {
          this.$emit("showRecordingResults", response.data);
        });

      this.nameState = null;
      this.$nextTick(() => {
        this.$bvModal.hide("modal-detail");
      });
    },
  },
  mounted() {
    this.optionAccount();
  },
};
</script>
<style scoped>
#checkstatus label {
  margin-left: 10px;
}
#two {
  margin-left: 10px;
}
</style>
