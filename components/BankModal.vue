<template>
  <div>
    <b-modal
      id="modal-detail"
      @show="setModal"
    >
      <template v-slot:modal-header>
        <slot  name="header">
        </slot>
      </template>
 
        <slot name="body"> </slot>

      <template v-slot:modal-footer>
        <slot name="footer"> </slot>
      </template>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: "bankModal",
  methods: {
    close() {
      this.$emit("close");
    },
    setModal() {
      this.$emit("setValueInModal");
    },
  },
};
</script>
