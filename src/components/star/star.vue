<template>
  <div class="star" :class="startType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      startType: function () {
        return 'star_' + this.size;
      },
      itemClasses() {
        let result=[];
        let score=Math.floor(this.score*2)/2;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
