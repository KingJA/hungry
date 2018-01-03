<template>
  <div class="ratings" ref="ratings">
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
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :select-type="selectType" :desc="desc" :only-content="onlyContent"
                    :ratings="ratings" @toggle="toggleContent" @select="selectRating"></ratingselect>
      <div class="ratings-list">
        <div>
          <ul v-if="ratings.length">
            <li v-for="rating in ratings" class="rating-item border-1px"v-show="needShow(rating.rateType,rating.text)" >
              <span class="rate-time">{{rating.rateTime | formatDate}}</span>
              <div class="avatar">
                <img :src="rating.avatar" width="28" height="28">
              </div>
              <div class="content">
                <div class="name">{{rating.username}}</div>
                <div class="star-wrapper">
                  <star :size="24" :score="rating.score"></star>
                  <span class="delivery-time">{{rating.deliveryTime}}分钟送达</span>
                </div>
                <p class="text">{{rating.text}}</p>
                <div class="recommend-wrapper">
                  <span class="icon-thumb_up"></span>
                  <span class="recommend" v-if="rating.recommend.length" v-for="recommend in rating.recommend">{{recommend}}</span>

                </div>
              </div>
            </li>

          </ul>
        </div>


      </div>

    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  import star from 'components/star/star'
  import split from 'components/split/split'
  import ratingselect from 'components/ratingselect/ratingselect'
  import BScroll from 'better-scroll'
  import {formatDate} from 'common/js/date.js'

  const ALL = 2;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star, split, ratingselect
    },
    methods: {
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.ratingsScroll.refresh();
        });
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.ratingsScroll.refresh();
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
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    data() {
      return {
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        },
        ratings: []
      }
    },
    mounted() {
      this.$http.get('api/ratings').then((response) => {
        var res = response.data;
        if (res.errno === 0) {
          this.ratings = res.data;
          this.$nextTick(function () {
            this.ratingsScroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          });
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
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
      font-size 0px
      .overview-left
        margin 6px 0
        text-align center
        flex 0 0 147px
        width 147px
        border-right 1px solid rgba(7, 17, 27, 0.1)
        @media only screen and (max-width: 320px)
          flex 0 0 120px
          width 120px
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
        padding 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left 6px
        .score-wrapper
          margin-bottom 8px
          font-size: 0
          .star
            display inline-block
            vertical-align top
            margin 0 12px
            @media only screen and (max-width: 320px)
              margin 0 6px
          .title
            display: inline-block
            vertical-align: top
            font-size 12px
            line-height 18px
            color rgb(7, 17, 27)
          .score
            display: inline-block
            vertical-align: top
            font-size 12px
            line-height 18px
            color rgb(255, 153, 0)
        .delivery-wrapper
          .title
            margin-right 12px
            font-size 12px
            line-height 12px
            color rgb(7, 17, 27)
          .time
            font-size 12px
            line-height 12px
            color rgb(147, 153, 159)

    .ratings-list
      padding 0 18px
      .rating-item
        position relative
        display flex
        padding 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .rate-time
          position absolute
          right 0
          top 18px
          font-size 10px
          line-height 12px
          color rgb(147, 153, 159)
          font-weight 200
        .avatar
          flex 0 0 28px
          margin-right 12px
          width 28px
          display inline-block
          img
            border-radius 50%
        .content
          flex 1
          display inline-block
          .name
            margin-bottom 4px
            font-size 10px
            line-height 12px
            color rgb(7, 17, 27)
          .star-wrapper
            margin-bottom 6px
            .star
              display inline-block
            .delivery-time
              font-size 10px
              line-height 12px
              font-weight 200
              color rgb(147, 153, 159)
          .text
            font-size 12px
            line-height 18px
            color rgb(7, 17, 27)
            margin-bottom 8px
          .recommend-wrapper
            font-size 0px
            line-height 16px
            .icon-thumb_up, .recommend
              display inline-block
              margin 0 8px 4px 0
            .icon-thumb_up
              font-size 12px
              color rgb(0, 160, 220)
            .recommend
              padding 0 6px
              font-size 9px
              line-height 16px
              color rgb(147, 153, 159)
              border 1px solid rgba(7, 17, 27, 0.1)
              background rgb(255, 255, 255)
              border-radius 2px
</style>
