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
      <div class="support-count" v-if="seller.supports" @click="showDetail()">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail()">
      <span class="bulletin-icon"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <star :size="48" :score="seller.score"></star>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close" @click="hideDetail()"></i>
      </div>

    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import star from '../star/star';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        discountMap: [],
        detailShow: false
      }

    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail: function () {
        this.detailShow = false;
      }
    },

    created() {
      this.discountMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    },
    components:{
      star
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .header
    position relative
    overflow hidden
    background rgba(7, 17, 27, 0.5)
    color #fff
    .content-wrapper
      position relative
      padding 24px 12px 18px 24px
      .avatar
        display inline-block
        vertical-align top
        img
          border-radius 2px
      .content
        display inline-block
        margin-left 16px
        .title
          margin: 2px 0 8px 0
          .brand
            vertical-align top
            width 30px
            height 16px
            margin-right 6px
            display inline-block
            bg-icon('brand')
            background-size 30px 16px
            background-repeat no-repeat
          .name
            display inline-block
            font-size 16px
            line-height 16px
            font-weight bold
        .description
          margin-bottom 10px
          line-height 12px
          font-size 12px
        .support
          .icon
            vertical-align middle
            display inline-block
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
            vertical-align middle
            display inline-block
            font-size 12px
            line-height 12px
      .support-count
        position absolute
        right 12px
        bottom 14px
        height 24px
        line-height 24px
        padding 0 8px
        background rgba(0, 0, 0, 0.2)
        border-radius 14px
        text-align center
        font-size 0px
        .count
          font-size 10px
          margin-right 2px
        .icon-keyboard_arrow_right
          font-size 10px
          line-height 24px
    .bulletin-wrapper
      position relative
      background rgba(7, 7, 27, 0.2)
      font-size 10px
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      .bulletin-icon
        margin-right 4px
        vertical-align middle
        display inline-block
        width 22px
        height 12px
        bg-icon('bulletin')
        background-repeat no-repeat
        background-size 22px 12px
      .bulletin-text
        vertical-align middle
        font-size 12px
        line-height 12px
      .icon-keyboard_arrow_right
        position absolute
        font-size 10px
        right 12px
        bottom 8px
        vertical-align middle
    .background
      position absolute
      right 0px
      top: 0px
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
    .detail
      position fixed
      top 0
      left 0
      z-index 100
      width 100%
      height 100%
      overflow auto
      background rgba(7, 17, 27, 0.8)
      .detail-wrapper
        width 100%
        min-height 100%
        .detail-main
          margin-top 64px
          padding-bottom 64px
          .name
            font-size 16px
            line-height 16px
            font-weight 700
            text-align center
      .detail-close
        position relative
        width 32px
        height 32px
        margin -64px auto 0 auto
        clear both
        font-size 32px


</style>
