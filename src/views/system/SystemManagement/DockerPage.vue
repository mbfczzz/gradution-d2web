<template>
    <iframe
      class="d2-container-frame"
      :src="src"
      frameborder="0"/>
</template>

<script>
export default {
  name: 'KibanaPage',
  data(){
   return {
      src:"http://112.124.6.43:9000"
    }
  }
  }
</script>

<style lang="scss" scoped>
.d2-container-frame {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
}
</style>