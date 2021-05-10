<template>
  <div>
    <bank-modal>
      <template v-slot:header>
        <h3>เพิ่มบัญชี</h3>
      </template>
      <template v-slot:body>
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="เลขบัญชี"
            label-for="name-input"
            invalid-feedback="Name is required"
            :state="nameState"
          >
            <b-form-input
              v-if="modalType == 2"
              id="name-input"
              v-model="ModalData.account_number"
              :state="nameState"
              required
              disabled
            ></b-form-input>
            <b-form-input
              v-else
              id="name-input"
              v-model="ModalData.account_number"
              :state="nameState"
              required
              maxlength="10"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="ชื่อย่อบัญชี"
            label-for="name-input"
            invalid-feedback="Name is required"
            :state="nameState"
          >
            <b-form-input
              id="name-input"
              v-model="ModalData.account_name"
              :state="nameState"
              maxlength="30"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="checkstatus">
            <input
              type="radio"
              :state="nameState"
              id="one"
              value="1"
              name="check"
              required
              v-model="ModalData.account_status"
            />
            <label for="one">ใช้งาน</label>
            <input
              type="radio"
              :state="nameState"
              id="two"
              value="2"
              name="check"
              required
              v-model="ModalData.account_status"
            />
            <label for="two">ไม่ใช้งาน</label>
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
  props: {
    accountDetail: Object,
    modalType: String,
  },
  data() {
    return {
      nameState: null,
      ModalData: {
        account_id: "",
        account_number: "",
        account_name: "",
        account_status: "",
      },
    };
  },
  mounted() {
    this.setModal();
  },
  methods: {
    setModal() {
      (this.ModalData.account_id = this.accountDetail.acId),
        (this.ModalData.account_name = this.accountDetail.acName),
        (this.ModalData.account_number = this.accountDetail.acNumber),
        (this.ModalData.account_status = this.accountDetail.acIsActive),
        (this.nameState = null);
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.ModalData = {
        account_id: "",
        account_name: "",
        account_number: "",
        account_status: "",
      };
      this.nameState = null;
      this.$nextTick(() => {
        this.$bvModal.hide("modal-detail-account");
      });
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      if (this.modalType == "1") {
        this.accountDetail = {
          acNumber: this.ModalData.account_number,
          acName: this.ModalData.account_name,
          acIsActive: parseInt(this.ModalData.account_status),
        };
        this.axios
          .post("http://localhost:29245/Home/Add", this.accountDetail)
          .then((response) => {
            console.log(response);
            this.$emit("saveData", response.data);
          });
      } else {
        this.accountDetail = {
          acId: parseInt(this.ModalData.account_id),
          acNumber: this.ModalData.account_number,
          acName: this.ModalData.account_name,
          acIsActive: parseInt(this.ModalData.account_status),
        };
        this.axios
          .post("http://localhost:29245/Home/Update", this.accountDetail)
          .then((response) => {
            console.log(response);
            //
            this.$emit("saveData", response.data);
          });
      }
      this.nameState = null;
      this.$nextTick(() => {
        this.$bvModal.hide("modal-detail-account");
      });
    },
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
