<template>
  <div>
    <br /><br /><br />
      <h1>รายการบัญชี</h1>
    <table>
      <thead>
        <tr>
          <th>ชื่อ</th>
          <th>อีเมล์</th>
          <th>สถานะ</th>
          <th>เครื่องมือ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="list in userList" :key="list.userId">
          <td>{{ list.userName }}</td>
          <td>{{ list.userEmail }}</td>
          <!-- <td > <span v-if="list.userIsActive == 1"> ใช้งาน</span> <span v-else>ไม่ใช้งาน</span></td> -->
          <td>{{ list.userIsActive == 1 ? 'ใช้งาน' : 'ไม่ใช้งาน' }}</td>
          <td>
              <b-button variant="warning"  to="/Account" v-on:click="Login(list.userId)"
                >บัญชี</b-button
              >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapState } from 'vuex'
// import { defineComponent } from '@vue/composition-api'
export default {
  name: 'users-Table',
  data() {
    return {
      userDetail: {
        userName: '',
        userID: '',
      },
    }
  },
  methods: {
    Login(id) {
      const row = this.userList.find((element) => element.userId == id)
      ;(this.userDetail = {
        userName: row.userName,
        userId: row.userId,
      }),
        this.$store.dispatch('user/logIn', this.userDetail)
      // this.$emit('subcom', 1)
    },
    Search() {
      this.$store.dispatch('user/getUserData')
    },
  },
  mounted() {
    this.Search()
  },
  computed: {
    ...mapState('user', ['userList']),
  },
}
</script>
<style scoped>
table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}
table thead th {
  text-align: center;
  height: 40px;
}
table td,
table th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  height: 35px;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}

table tr:hover {
  background-color: #ddd;
}
.form {
  margin-left: 52rem;
  margin-right: 10px;
  margin-bottom: 10px;
  /* background-color: #008cba; */
}
table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #008cba;
  color: white;
}
button {
  margin-right: 34px;
}
input {
  margin-left: 15px;
}
h1 {
  margin-left: 230px;
  margin-bottom: 50px;
}
</style>
