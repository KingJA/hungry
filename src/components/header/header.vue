<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="" width="64" height="64">
      </div>

      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="support" v-if="seller.supports">
          <span class="icon" v-bind:class="discountMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>


    </div>
    <div class="bulletin-wrapper"></div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        discountMap: []
      }

    },
    created() {
      this.discountMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    color #fff
    background #000
    .content-wrapper
      padding 24px 12px 18px 24px
      font-size 0px
      .avatar
        display inline-block
        vertical-align top
        img
          border-radius 2px
      .content
        display inline-block
        margin-left 16px
        .title
          margin-bottom 10px
          .brand
            vertical-align top
            width 30px
            height 18px
            margin-right 6px
            display inline-block
            bg-icon('brand')
            background-size 30px 18px
            background-repeat no-repeat
          .name
            font-size 16px
            line-height 18px
            font-weight bold
        .description
          margin-bottom 10px
          line-height 12px
          font-size 12px
        .support
          .icon
            display inline-block
            vertical-align top
            width 12px
            height 12px
            margin-right 4px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-icon('decrease_1')
            &.discount
              bg-icon('discount_1')
            &.guarantee
              bg-icon('guarantee_1')
            &.invoice
              bg-icon('invoice_1')
            &.special
              bg-icon('special_1')
          .text
            line-height 12px
            font-size 10px

</style>
