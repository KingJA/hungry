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
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :select-type="selectType" :desc="desc" :only-content="onlyContent"
                        :ratings="food.ratings" @toggle="toggleContent" @select="selectRating"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings&&food.ratings.length">
              <li v-for="rating in food.ratings" class="rating-item border-1px"
                  v-show="needShow(rating.rateType,rating.text)">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" width="12" height="12" class="avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </p>

              </li>

            </ul>
            <div class="no-rating" v-show="!food.ratings||!food.ratings.length">暂时没有评论</div>

          </div>
        </div>
      </div>


    </div>


  </transition>

</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import split from 'components/split/split'
  import ratingselect from 'components/ratingselect/ratingselect'
  import {formatDate} from 'common/js/date.js'
  import Vue from 'vue'

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    components: {
      cartcontrol, split, ratingselect
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    props: {
      food: {
        type: Object
      }
    },
    mounted() {
      this.$nextTick(function () {
      });
    },
    filters:{
      formatDate(time) {
        let date=new Date(time);
        return formatDate(date,'yyyy-MM-dd hh:mm');
      }

    },
    methods: {
      show() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
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
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.foodScroll.refresh();
        });
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.foodScroll.refresh();
        });
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .food
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 30
    width 100%
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
    .rating
      padding-top 18px
      .title
        color rgb(7, 17, 27)
        line-height 14px
        margin-left 18px
        font-size 14px
      .rating-wrapper
        padding 0 18px
        .rating-item
          position relative
          padding 16px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .user
            position absolute
            right 0
            top 16px
            .name
              font-size 10px
              line-height 12px
              color rgb(147, 153, 159)
              margin-right 6px
            .avatar
              border-radius 50%
          .time
            font-size 10px
            line-height 12px
            color rgb(147, 153, 159)
            margin-bottom 6px
          .text
            font-size 12px
            line-height 16px
            color rgb(7, 17, 27)
            .icon-thumb_up, .icon-thumb_down
              font-size 12px
              line-height 16px
              margin-right 4px
            .icon-thumb_up
              color rgb(0, 160, 220)
            .icon-thumb_down
              color rgb(147, 153, 159)
        .no-rating
          padding: 16px 0
          font-size 12px
          color rgb(147, 153, 159)

</style>
