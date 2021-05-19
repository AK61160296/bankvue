<template>
  <div>
    <bank-modal @setValueInModal="setValueInModal">
      <template v-slot:header>
        <h3 v-if="modalType == 1">เพิ่มบัญชี</h3>
        <h3 v-else>เเก้ไขบัญชี</h3>
      </template>
      <template v-slot:body>
        <form ref="form">
          <b-form-group
            label="เลขบัญชี"
            label-for="name-input"
            invalid-feedback="กรุณากรอกเลขบัญชี"
            :state="nameState"
          >
            <b-form-input
              :disabled="modalType == 2"
              id="name-input"
              v-model="ModalData.account_number"
              :state="nameState"
              required
              maxlength=""
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="ชื่อย่อบัญชี"
            label-for="name-input"
            invalid-feedback="กรุณากรอกชื่อย่อบัญชี"
            :state="nameState"
          >
            <b-form-input
              :disabled="statusModal"
              id="name-input"
              v-model="ModalData.account_name"
              :state="nameState"
              maxlength="30"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="checkstatus"
            label-for="name-input"
            invalid-feedback="กรุณาเลือกสถานะ"
            :state="nameState"
          >
            <input
              :disabled="statusModal"
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
              :disabled="statusModal"
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
        <b-button variant="secondary" v-on:click="resetModal">ยกเลิก</b-button>
        <b-button variant="primary" v-on:click="handleOk">บันทึก</b-button>
      </template>
    </bank-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
      accountAddDetail: {
        acId: "",
        acNumber: "",
        acName: "",
        acIsActive: "",
        userId: 0,
      },
    };
  },
  mounted() {},
  methods: {
    setValueInModal() {
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
        this.$bvModal.hide("modal-detail");
      });
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    async handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }

      this.$nextTick(() => {
        this.$bvModal.hide("modal-detail");
      });

      if (this.modalType == "1") {
        this.accountAddDetail = {
          acNumber: this.ModalData.account_number,
          acName: this.ModalData.account_name,
          acIsActive: parseInt(this.ModalData.account_status),
          userId: this.userIdLogin,
        };
        this.$store
          .dispatch("account/addAccoount", this.accountAddDetail)
          .then((response) => {
            this.$emit("showRecordingResults", response.data);
          });
      } else {
        this.accountDetail = {
          acId: parseInt(this.ModalData.account_id),
          acNumber: this.ModalData.account_number,
          acName: this.ModalData.account_name,
          acIsActive: parseInt(this.ModalData.account_status),
          userId: this.userIdLogin,
        };
        this.$store
          .dispatch("account/updateAccount", this.accountDetail)
          .then((response) => {
            this.$emit("showRecordingResults", response.data);
          });
      }
      this.nameState = null;
    },
  },
  computed: {
    statusModal() {
      return this.accountDetail.acIsActive === 2;
    },
    ...mapState("user", ["userIdLogin"]),
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
