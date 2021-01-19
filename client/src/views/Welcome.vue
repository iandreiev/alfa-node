<template>
  <main class="form-signin text-center">
      <h1>Добрый день, {{user[0].firstName + ' ' + user[0].lastName}}!</h1>
     <b-button @click="logout()" block variant="success">Выйти</b-button>
      
  </main>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data(){
    return{}
  },
  methods:{
    logout(){
      this.$store.commit('LOGOUT')
      this.$router.push({name:'Login'})
    }
  },
  computed:{
    ...mapState(['user'])
  }
}
</script>

<style>

</style>