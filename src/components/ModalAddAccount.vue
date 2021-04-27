<template>
  <div>
    <b-modal
      id="modal-add-account"
      ref="modal"
      title="เพิ่มบัญชี"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="เลขบัญชี"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="acccount_data.account_number"
            :state="nameState"
            required
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
            v-model="acccount_data.account_name"
            :state="nameState"
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
            v-model="acccount_data.account_status"
          />
          <label for="one">ใช้งาน</label>
          <input
            type="radio"
            :state="nameState"
            id="two"
            value="2"
            name="check"
            v-model="acccount_data.account_status"
          />
          <label for="two">ไม่ใช้งาน</label>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameState: null,
      acccount_data: {
        account_name: "",
        account_number: "",
        account_status: "",
      },
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.acccount_data = {
        account_name: "",
        account_number: "",
        account_status: "",
      };
      this.nameState = null;
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

      this.$emit("add:account1", this.acccount_data);

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-add-account");
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
