<template>
  <div>
    <br /><br /><br />
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
        <tr v-for="list in usersDataApi" :key="list.id">
          <td>{{ list.userName }}</td>
          <td>{{ list.userEmail }}</td>
          <td v-if="list.userIsActive == 1">ใช้งาน</td>
          <td v-else>ไม่ใช้งาน</td>
          <td>
            <b-button variant="warning" v-on:click="Login(list.userId)"
              >บัญชี</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
// import { defineComponent } from '@vue/composition-api'
export default {
  name: "users-Table",
  data() {
    return {
      usersDataApi: null,
      userIdObj: {
        UserId: "",
      },
    };
  },
  methods: {
    Login(id) {
      this.userIdObj = {
        UserId: parseInt(id),
      };
      this.axios
        .post("http://localhost:29245/Home/login", this.userIdObj)
        .then((response) => {
          console.log(response.data);
          this.$emit("subcom", 1);
        });
    },
    Search() {
      this.axios
        .post("http://localhost:29245/Home/Userlist", this.searchObj)
        .then((response) => {
          this.usersDataApi = response.data;
        });
    },
  },
  mounted() {
    this.Search();
  },
};
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
</style>
