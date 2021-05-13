<template>
  <div>
    <bank-modal>
      <template v-slot:header>
        <h3>ฝาก-ถอน</h3>
      </template>

      <template v-slot:body>
        <form ref="form">
          <b-form-group
            label="เลขบัญชี"
            label-for="name-input"
            invalid-feedback="Name is required"
            :state="nameState"
          >
            <b-form-select
              v-model="ModalData.accountId"
              :options="optionsAccount"
            >
            </b-form-select>
          </b-form-group>

          <b-form-group
            label="ประเภท"
            label-for="name-input"
            invalid-feedback="Name is required"
            :state="nameState"
          >
            <b-form-select v-model="ModalData.type" :options="optionsType">
            </b-form-select>
          </b-form-group>
          <b-form-group
            label="จำนวนเงิน"
            label-for="name-input"
            invalid-feedback="Name is required"
            :state="nameState"
          >
            <b-form-input
              id="name-input"
              v-model="ModalData.monney"
              :state="nameState"
              required
            ></b-form-input>
          </b-form-group>
        </form>
      </template>
      <template v-slot:footer>
        <b-button variant="secondary" v-on:click="resetModal">CLOSE</b-button>
        <b-button variant="primary" v-on:click="handleOk">OK</b-button>
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
      accountNumber: null,
      nameState: null,
      ModalData: {
        accountId: "",
        monney: "",
        type: "",
        detail: "",
      },
      optionsAccount: [
        { value: "", text: "-- กรุณาเลือกเลขบัญชี --", disabled: true },
      ],
      optionsType: [
        { value: "", text: "-- ประเภทรายการ --", disabled: true },
        { value: "1", text: "ฝาก" },
        { value: "2", text: "ถอน" },
      ],
    };
  },
  props: {
    trasactionDetail: Object,
  },
  methods: {
    optionAccount() {
      this.axios
        .post("http://localhost:29245/Transaction/Option_account")
        .then((response) => {
          response.data.forEach((element) => {
            this.optionsAccount.push({
              value: element.acId,
              text: element.acNumber,
            });
          });
        });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      (this.ModalData = {
        accountId: "",
        monney: "",
        type: "",
        detail: "",
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
      if (this.ModalData.type == 1) {
        this.trasactionDetail = {
          TsAcId: parseInt(this.ModalData.accountId),
          TsType: parseInt(this.ModalData.type),
          TsMoney: parseFloat(this.ModalData.monney),
          TsDetail: "ฝากเงิน",
          TsNote: "",
          TsAD: "",
        };
      } else {
        this.trasactionDetail = {
          TsAcId: parseInt(this.ModalData.accountId),
          TsType: parseInt(this.ModalData.type),
          TsMoney: parseFloat(this.ModalData.monney),
          TsDetail: "ถอนเงิน",
          TsNote: "",
          TsAD: "",
        };
      }
      this.axios
        .post(
          "http://localhost:29245/Transaction/Deposit_Withdraw",
          this.trasactionDetail
        )
        .then((response) => {
          console.log(response);
          this.$emit("saveData", response.data);
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
