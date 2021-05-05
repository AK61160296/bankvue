<template>
  <div>
    <b-modal
      id="modal-tranfer"
      ref="modal"
      title="โอนเงิน"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="จาก"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-select v-model="ModalData.tranfer_account" :options="options">
            
            <!-- <option value="" disabled>-กรุณาเลือกบัญชี-</option>
            <option
              v-for="list in accountNumberApi"
              :key="list.id"
              v-bind:value="list.acId"
            >
              {{ list.acNumber }}
            </option> -->
          </b-form-select>

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
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accountNumberApi: null,
      nameState: null,
      ModalData: {
        tranfer_account: "",
        tranfer_payee: "",
        tranfer_monney: "",
        tranfer_detail: "",
        tranfer_note: "",
      },
      options: [
          { value: '', text: '-- กรุณาเลือกเลขบัญชี --' ,disabled: true },
        ]
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
          response.data.forEach(element => {
            this.options.push({value:element.acId,text:element.acNumber})
          });
          this.accountNumberApi = response.data;
        });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      (this.ModalData = {
        tranfer_account: "",
        tranfer_payee: "",
        tranfer_monney: "",
        tranfer_detail: "",
        tranfer_note: "",
      }),
        (this.nameState = null);
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
      this.axios
        .post( "http://localhost:29245/Transaction/Transfer", this.trasactionDetail)
        .then((response) => {
          this.$emit("checkStatus", response.data);
        });
      this.nameState = null;
      this.$nextTick(() => {
        this.$bvModal.hide("modal-tranfer");
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
