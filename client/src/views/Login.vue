<template>
 <main class="form-signin text-center">
   <h1>Авторизация</h1>
     <b-form-group
      id="fieldset-1"
      label="Введите логин"
      label-for="login"
    >
      <b-form-input id="login" placeholder="Логин" type="text" v-model="form.username"></b-form-input>
    </b-form-group>
         <b-form-group
      id="fieldset-2"
      label="Введите пароль"
      label-for="password"
    >
      <b-form-input id="password" placeholder="Пароль" type="password" v-model="form.password"></b-form-input>
    </b-form-group>
     <b-button @click="authToService()" block variant="success">Войти</b-button>

      <div class="error-section">
         <div class="alert alert-danger"  v-if="errors.length > 0" >
          <p v-for="(error,index) in errors" :key="index">{{error}}</p>
        </div>
      </div>
    
</main>
</template>

<script>
/* eslint-disable */

export default {
  data() {
    return {
      form: {
        username: null,
        password: null,
      },
      remember: false,
      errors: [],
      success: false,
      passwordState: true,
      loginState: true
    };
  },
  methods: {
    authToService(e) {
      if (this.form.username && this.form.password) {
        this.success = true;

        let postUserData = {
          url: 'users/authenticate',
          method: 'post',
          data: this.form
        }

        this.$http(postUserData)
        .then(res=>{
          let getUser = {
            url: 'users/',
            method: 'get',
            data: {
              username: res.data.username,
              password: this.form.password
            },
            headers:{
              'Authorization':`Bearer ${res.data.token}`
            }
          }
          this.$http(getUser)
          .then(res=>{
            this.$store.commit('SAVE_USER',res.data)
            this.$router.push({name:'Welcome'})
          })
        })
        .catch(err=>{
          this.errors.push('Логин или пароль неправильный. Повторите попытку')
        this.success = false;
        })
          

      }

      this.errors = [];

      if (!this.form.username) {
        this.errors.push("Требуется указать почту.");
        this.loginState = false;
      }
      if (!this.form.password) {
        this.errors.push("Требуется указать пароль.");
        this.passwordState = false;
      }

      // e.preventDefault();
    },
  },
  computed: {
    },
  mounted() {},
};
</script>

<style>
.error-section{
  margin-top: 1em;
}
</style>