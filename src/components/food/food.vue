<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"> </i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">¥{{food.price}}</span>
            <span v-if="food.oldPrice" class="old">¥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <div class="buy" v-show="!food.count||food.count===0" @click="addFirst">马上购买</div>
        </div>
        <split v-if="food.info"></split>
        <div class="info" v-if="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text" >{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <h1 class="title">商品评价</h1>
          <h1 class="title">商品评价</h1>
          <h1 class="title">商品评价</h1>
          <h1 class="title">商品评价</h1>
          <h1 class="title">商品评价</h1>
          <h1 class="title">商品评价</h1>
          <h1 class="title">商品评价</h1>
        </div>
      </div>


    </div>



  </transition>

</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import split from 'components/split/split'
  import Vue from 'vue'

  export default {
    components: {
      cartcontrol, split
    },
    data() {
      return {
        showFlag: false
      }
    },
    props: {
      food: {
        type: Object
      }
    },
    mounted() {
      this.$nextTick(function () {
        console.log(this.food);
      });
    },
    methods: {
      show() {
        this.showFlag = true;
        this.$nextTick(() => {
          if (!this.foodScroll) {
            this.foodScroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.foodScroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, "count", 1);
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 30
    width 100%
    height 100%
    background #fff
    transform translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition all 0.2s linear
    &.move-enter, &.move-leave-to
      transform translate3d(100%, 0, 0)
    .image-header
      position relative
      width 100%
      height 0
      padding-top 100%
      img
        position absolute
        left 0
        top 0
        width 100%
        height 100%
      .back
        position absolute
        top 10px
        left 0
        .icon-arrow_lift
          display block
          padding 18px
          font-size 20px
          color #fff
    .content
      position relative
      padding 18px
      .title
        font-size 14px
        line-height 14px
        font-weight 700
        color rgb(7, 17, 27)
        margin-bottom 8px
      .detail
        font-size 12px
        line-height 12px
        color rgb(147, 153, 159)
      .sell-count, .rating
        font-size 12px
        color rgb(147, 153, 159)
      .sell-count
        margin-right 12px

      .price
        line-height 24px
        font-weight 700
        .now
          margin-right 8px
          font-size 14px
          color rgb(240, 20, 20)
        .old
          text-decoration line-through
          font-size 10px
          color rgb(147, 153, 159)
    .cartcontrol-wrapper
      position absolute
      right 12px
      bottom 12px
    .buy
      position absolute
      right 18px
      bottom 18px
      z-index 10
      height 24px
      line-height 24px
      padding 0 12px
      box-sizing border-box
      font-size 12px
      background rgb(0, 160, 220)
      border-radius 12px
      color #fff
    .info
      padding 18px
      .title
        color rgb(7, 17, 27)
        line-height 14px
        font-size 14px
      .text
        font-size 12px
        line-height 24px
        color rgb(77, 85, 93)
        font-weight 200
        margin-top 6px
</style>
