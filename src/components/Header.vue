<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand  style="font-size:30px"><b> BANK</b></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-bind:class="{ active: isActive }" v-on:click="account"
            >บัญชี</b-nav-item
          >
          <b-nav-item v-bind:class="{ active: hasError }" v-on:click="transac"
            >ธุรกรรม</b-nav-item
          >
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isActive: true,
      hasError: false,
      value: {
        AccountTable: true,
        TrasactionTable: true,
      },
    };
  },
  methods: {
    transac() {
      this.value = {
        AccountTable: false,
        TrasactionTable: true,
      };
      this.isActive = false,
      this.hasError = true,
      this.$emit("subcom", this.value);
    },
    account() {
      this.value = {
        AccountTable: true,
        TrasactionTable: false,
      };
      this.isActive = true,
      this.hasError = false,
      this.$emit("subcom", this.value);
    },
  },
};
</script>
<style scoped>
  .active{
    font-size: 18px;
    color:red;
  }
</style>
