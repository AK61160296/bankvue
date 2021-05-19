<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand style="font-size: 30px"><b> BANK</b></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            to="/Account"
            :class="menuClass(1, component)"
            v-on:click="subComponent(1)"
            >บัญชี</b-nav-item
          >
          <b-nav-item
            to="/Transaction"
            :class="menuClass(2, component)"
            v-on:click="subComponent(2)"
            >ธุรกรรม</b-nav-item
          >
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              {{ userName }}
            </template>

            <b-dropdown-item to="/" v-on:click="subComponent(3)"
              >Sign Out</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'header-navbar',
  data() {
    return {
      component: null,
      isActive: false,
      hasError: false,
    }
  },
  methods: {
    menuClass(menuId, currentMenuId) {
      return {
        active: menuId === currentMenuId,
      }
    },
    subComponent(value) {
      if (value == 1) {
        this.isActive = true
        this.hasError = false
      } else if (value == 2) {
        this.hasError = true
        this.isActive = false
      } else {
        this.$store.dispatch('user/logOut')
      }
      this.component = value
      this.$emit('subcom', this.component)
    },
  },
  computed: {
    ...mapState('user', ['userName']),
  },
}
</script>
<style scoped>
.active {
  font-size: 18px;
  color: red;
}
</style>
