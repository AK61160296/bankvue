<template>
  <div>
    <b-modal
      id="modal-depositWithdraw"
      ref="modal"
      title="ฝาก-ถอน"
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
          <b-form-select>
            <option v-for="list in listaccount" :key="list.id">{{
              list.account_number
            }}</option>
          </b-form-select>
        </b-form-group>

        <b-form-group
          label="ประเภท"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-select>
            <option>ฝาก</option>
            <option>ถอน</option>
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
            v-model="acccount_data.account_name"
            :state="nameState"
            required
          ></b-form-input>
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
        account_name_edit: "",
        account_number_edit: "",
      },
    };
  },
  props: {
    listaccount: Array,
  },
  methods: {},
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
