<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <i class="icon-shopping_cart" ></i>
          </div>
        </div>
        <div class="price"></div>
        <div class="desc"></div>
      </div>
      <div class="content-right"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "shopcart"
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .shopcart
    position fixed
    right 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      height 48px
      display flex
      background #141d27
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          background #6bcaff
          border-radius 50%
          box-sizing border-box
          .logo
            width 100%
            height 100%
            border-radius 50%
            background #2b343c
        .price
          display inline-block
        .desc
          display inline-block
      .content-right
        flex 0 0 105px
        width 105px

</style>
