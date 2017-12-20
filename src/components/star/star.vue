<template>

  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>

</template>

<script type="text/ecmascript-6">
  const FULL_COUNT = 5;
  const ON = 'on';
  const OFF = 'off';
  const HALF = 'half';
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
      starType: function () {
        return 'star-' + this.size;
      },
      itemClasses() {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimals = score % 1 !== 0;
        let integer = Math.floor(score);
        for (let i = 0; i < integer; i++) {
          result.push(ON);
        }
        if (hasDecimals) {
          result.push(HALF);
        }
        while (result.length < FULL_COUNT) {
          result.push(OFF);
        }
        return result;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .star
    font-size 0px
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &.on
          bg-icon('star48_on')
        &.off
          bg-icon('star48_off')
        &.half
          bg-icon('star48_half')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &.on
          bg-icon('star36_on')
        &.off
          bg-icon('star36_off')
        &.half
          bg-icon('star36_half')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &.on
          bg-icon('star24_on')
        &.off
          bg-icon('star24_off')
        &.half
          bg-icon('star24_half')

</style>
