<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2 class="title">起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="title">商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="title">平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>

      </div>
      <split></split>

      <div class="bulletin">

        <h1 class="title">公告与活动</h1>
        <div class="bulletin-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>

        <ul v-if="seller.supports" class="support-wrapper">
          <li v-for="support in seller.supports">
            <div class="support">
              <span class="icon" v-bind:class="discountMap[support.type]"></span>
              <span class="text">{{support.description}}</span>
            </div>

          </li>
        </ul>

      </div>


    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star'
  import split from 'components/split/split'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star, split
    },
    data() {
      return {
        discountMap: [],
      }
    },
    created() {
      this.discountMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .seller
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
      padding 18px
      .title
        font-size 14px
        line-height 14px
        color rgb(7, 17, 27)
        margin-bottom 8px
      .desc
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size 0
        .star
          display inline-block
          margin-right 8px
          vertical-align top
        .text
          margin-right 12px
          display inline-block
          vertical-align top
          line-height 18px
          font-size 10px
          color rgb(77, 85, 93)
      .remark
        padding-top 18px
        display flex
        .block
          flex 1
          text-align center
          border-right 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border none
          .title
            line-height 10px
            font-size 10px
            color rgb(77, 85, 93)
          .stress
            line-height 24px
            font-size 24px
            color rgb(7, 17, 27)
            font-weight 200

    .bulletin
      padding 18px
      .bulletin-wrapper
        padding 8px 12px 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        .content
          font-size 12px
          line-height 24px
          font-weight 200
          color rgb(240, 20, 20)
    .support-wrapper
      .support
        .icon
          vertical-align middle
          display inline-block
          width 12px
          height 12px
          margin-right 4px
          background-size 12px 12px
        .text
          vertical-align middle
          display inline-block
          font-size 12px
          line-height 12px
</style>
