<template>
  <div>
    <b-form inline class="form">
      วันที่เริ่มต้น :
      <b-form-input type="date" v-model="searchObj.dateBegin" reset-button />

      วันที่สิ้นสุด :
      <b-form-input type="date" v-model="searchObj.dateEnd" reset-button />

      คำค้นหา :
      <b-form-input
        placeholder="เลขบัญชี รายละเอียด"
        v-model="searchObj.keyword"
      ></b-form-input>

      <b-button class="btn" variant="danger" v-on:click="Search()"
        >ค้นหา</b-button
      >
      <b-button variant="primary" class="btn" @click="OpenModal(1)"
        >โอนเงิน</b-button
      >
      <b-button variant="primary" class="btn" @click="OpenModal(2)"
        >ฝาก-ถอน</b-button
      >
    </b-form>
  </div>
</template>
<script>
export default {
  name: "Button-transaction",
  data() {
    return {
      searchObj: {
        dateBegin: "",
        dateEnd: "",
        keyword: "",
      },
    };
  },
  methods: {
    Search() {
      this.$emit("setValueSearch", this.searchObj);
    },
    OpenModal(type) {

      this.$emit("OpenModal", type);
    },
  },
};
</script>
<style scoped>
.btn1 {
  margin-left: 70.6rem;
  margin-right: 10px;
  margin-bottom: 10px;
  /* background-color: #008cba; */
}
.btn2 {
  margin-bottom: 10px;
  /* background-color: #008cba; */
}
button {
  margin-right: 15px;
}
input {
  margin-left: 5px;
  margin-right: 15px;
}
.form {
  margin-left: 13rem;
  margin-right: 10px;
  margin-bottom: 10px;
  /* background-color: #008cba; */
}
</style>
