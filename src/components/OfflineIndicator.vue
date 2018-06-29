<script>
import VueOfflineMixin from "vue-offline/mixin";

export default {
  mixins: [VueOfflineMixin],
  data() {
    return {
      whenOnline: false,
      whenOffline: false,
    }
  },
   created () {
    this.$on('online', function () {
      this.whenOnline = true;
      this.whenOffline = false;
      setTimeout(() => {
      this.whenOnline = false;
      }, 1500);
    })
    this.$on('offline', function () {
     this.whenOffline = true;
     this.whenOnline = false;
     setTimeout(() => {
      this.whenOffline = false;
      }, 1500)
    })
  }
};
</script>


<template>
<div class="indicator">

      <transition name="fade" mode="in-out">
      <span class="indicator__online" v-show="whenOnline">you're online</span>
      </transition>
      <transition name="fade" mode="in-out">
      <span class="indicator__offline" v-show="whenOffline">you're offline</span>
      </transition>

</div>

  
</template>

<style scoped>

.indicator__offline {
  position: fixed;
  left: 10rem;
  bottom: 10rem;
  background-color: red;
  color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1.6rem;
}
.indicator__online {
  position: fixed;
  left: 10rem;
  bottom: 10rem;
  background-color: green;
  color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1.6rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

@media only screen and (max-width: 60rem) {

.indicator__offline {
  position: fixed;
  left: 1rem;
  bottom: 1rem;
}

.indicator__online {
  position: fixed;
  left: 1rem;
  bottom: 1rem;
}

}


</style>
