<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div>
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from 'components/star/star'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ratings
    position absolute
    top 174px
    bottom 0px
    left 0
    width 100%
    overflow hidden
    .overview
      display flex
      padding 18px 0
      .overview-left
        margin 6px 0
        text-align center
        flex 0 0 147px
        width 147px
        border-right 1px solid rgba(7, 17, 27, 0.1)
        .score
          margin-bottom 6px
          font-size 24px
          line-height 28px
          color rgb(255, 153, 0)
        .title
          margin-bottom 8px
          font-size 12px
          line-height 12px
          color rgb(7, 17, 27)
        .rank
          font-size 12px
          line-height 12px
          color rgb(147, 153, 159)
      .overview-right
        flex 1
        padding 0 24px
        .score-wrapper
          margin-bottom 8px
          line-height 18px
          .star
            display inline-block
            margin 0 12px
            vertical-align top
          .title
            font-size 12px
            line-height 18px
            color rgb(7, 17, 27)
          .score
            font-size 12px
            line-height 18px
            color rgb(255, 153, 0)
        .time
          font-size 12px
          line-height 12px
          color rgb(147, 153, 159)

</style>
