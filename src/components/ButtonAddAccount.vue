<template>
  <div>
    <b-button variant="primary" class="btn1"  @click="$bvModal.show('modal-add-account')">เพิ่มบัญชี</b-button>
  </div>
</template>
<script>
export default {
  name: "Button",
};
</script>
<style scoped>
.btn1 {
  margin-left: 76.2rem;
  margin-right: 10px;
  margin-bottom: 10px;
    /* background-color: #008cba; */
}
</style>
