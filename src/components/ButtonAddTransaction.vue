<template>
  <div>
    <b-button variant="primary" class="btn1" @click="$bvModal.show('modal-tranfer')">โอนเงิน</b-button>
    <b-button variant="primary" class="btn2" @click="$bvModal.show('modal-depositWithdraw')">ฝาก-ถอน</b-button>
  </div>
</template>
<script>
export default {
  name: "Button-transaction",
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
</style>
