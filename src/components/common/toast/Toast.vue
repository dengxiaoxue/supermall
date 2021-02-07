<template>
  <div class="toast" v-show="isShow">{{msg}}</div>
</template>
<script>
export default {
  name:"Toast",
  data(){
    return{
      msg:'222333',
      isShow:false
    }
  },
  methods:{
    show(message='默认消息',time=2000){
      this.isShow=true;
      this.msg=message;
      setTimeout(()=>{
        this.isShow=false;
        this.msg=''
      },time)
    }
  }
}
</script>
<style scoped>
.toast{
  position: fixed;
  padding: 10px 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: rgba(0,0,0,.6);
  color: #fff;
  border-radius: 8%;
  z-index: 999;
}
</style>