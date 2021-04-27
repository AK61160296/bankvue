<template>
  <div>
    <b-modal
      id="modal-edit-account"
      ref="modal"
      title="เเก้ไขบัญชี"
      @show="setModal"
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
            v-model="acccount_data.account_number_edit"
            :state="nameState"
            required
            disabled
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
            v-model="acccount_data.account_name_edit"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>

        <template v-if="acccount_data.account_status_edit == 1">
          <b-form-group id="checkstatus">
            <input
              type="radio"
              :state="nameState"
              id="one"
              value="1"
              name="check"
              v-model="acccount_data.account_status_edit"
              checked
            />
            <label for="one">ใช้งาน</label>
            <input
              else
              type="radio"
              :state="nameState"
              id="two"
              value="2"
              name="check"
              v-model="acccount_data.account_status_edit"
            />
            <label for="two">ไม่ใช้งาน</label>
          </b-form-group>
        </template>

        <template v-else>
          <b-form-group id="checkstatus">
            <input
              type="radio"
              :state="nameState"
              id="one"
              value="1"
              name="check"
              v-model="acccount_data.account_status_edit"
            />
            <label for="one">ใช้งาน</label>
            <input
              else
              type="radio"
              :state="nameState"
              id="two"
              value="2"
              name="check"
              v-model="acccount_data.account_status_edit"
              checked
            />
            <label for="two">ไม่ใช้งาน</label>
          </b-form-group>
        </template>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "modal-edit-account",
  props: {
    detail: Object,
    global: Object,
  },
  data() {
    return {
      nameState: null,
      acccount_data: {
        account_id: "",
        account_name_edit: "",
        account_number_edit: "",
        account_status_edit: "",
      },
    };
  },
  methods: {
    setModal() {
      // alert("set");
      this.acccount_data = {
        account_id: this.detail.account_id,
        account_name_edit: this.detail.account_name_edit,
        account_number_edit: this.detail.account_number_edit,
        account_status_edit: this.detail.account_status_edit,
      };
      this.nameState = null;
    },
    resetModal() {
      // alert("reset");
      this.acccount_data = {
        account_id:"",
        account_name_edit: "",
        account_number_edit: "",
        account_status_edit: "",
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
      console.log(this.acccount_data);
      // Exit when the form isn't valid
      // if (!this.checkFormValidity()) {
      //   return;
      // }

      this.$emit("edit:accountedit", this.acccount_data);

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-edit-account");
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
