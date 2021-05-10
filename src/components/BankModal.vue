<template>
  <div>
    <b-modal
      id="modal-detail-account"
      ref="modal"
      hide-header
      hide-footer
      @show="setModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <header class="modal-header" >
        <slot name="header">
        </slot>
      </header>

      <body class="modal-body">
        <slot name="body"> </slot>
      </body>

      <footer class="modal-footer">
        <slot name="footer"> </slot>
      </footer>

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
  },
};
</script>
