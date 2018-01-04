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
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorited}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>

      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="bulletin-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="support-wrapper">
          <li v-for="support in seller.supports" class="support-item">
            <div class="support border-1px">
              <span class="icon" v-bind:class="discountMap[support.type]"></span>
              <span class="text">{{support.description}}</span>
            </div>

          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pics-wrapper" ref="picsWrapper">
          <ul class="pics-ul" ref="pics">
            <li v-for="pic in seller.pics" class="pics-item">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="seller-info">
        <div class="title border-1px">商家信息</div>
        <ul>
          <li v-for="info in seller.infos" class="info-item border-1px">{{info}}</li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star'
  import split from 'components/split/split'
  import BScroll from 'better-scroll'
  import {saveToLocal, loadFromLocal} from 'common/js/store';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    computed: {
      favoriteText() {
        return this.favorited ? '已收藏' : '收藏';
      }
    },
    methods: {
      _initScroll() {
        if (!this.sellerScroll) {
          this.sellerScroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.sellerScroll.refresh();
        }
      },
      _initPics() {
        if (!this.seller.pics) {
          return;
        }
        let picWidth = 120;
        let marginRight = 6;
        let picWrapperWidth = (picWidth + marginRight) * this.seller.pics.length - marginRight;
        this.$refs.pics.style.width = picWrapperWidth + 'px';

        if (!this.picsScroll) {
          this.picsScroll = new BScroll(this.$refs.picsWrapper, {
            scrollX: true,
            eventPassthrough: 'vertical'
          });
        } else {
          this.picsScroll.refresh();
        }

      },
      toggleFavorite(event) {
        console.log(1);
        if (!event._constructed) {
          return;
        }
        this.favorited = !this.favorited;
        saveToLocal(this.seller.id, 'favorited', this.favorited);
      }
    },
    components: {
      star, split
    },
    data() {
      return {
        // discountMap: [],
        favorited: (() => {
          return loadFromLocal(this.seller.id, 'favorited', false);
        })()
      }
    },
    mounted() {
      this.$nextTick(function () {
        this._initScroll();
        this._initPics();
      });
    },
    watch: {
      'seller'() {
        this.$nextTick(function () {
          this._initScroll();
          this._initPics();
        });
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
      position relative
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
      .favorite
        width 50px
        position absolute
        top 18px
        right 11px
        text-align center
        .icon-favorite
          font-size 24px
          line-height 24px
          display block
          margin-bottom 4px
          color #d4d6d9
          &.active
            color rgb(240, 20, 20)
        .text
          font-size 10px
          line-height 10px
          color rgb(77, 85, 93)
    .bulletin
      padding 18px 18px 0 18px
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
          padding 16px
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
          .icon
            vertical-align middle
            display inline-block
            width 12px
            height 12px
            margin-right 4px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-icon('decrease_4')
            &.discount
              bg-icon('discount_4')
            &.guarantee
              bg-icon('guarantee_4')
            &.invoice
              bg-icon('invoice_4')
            &.special
              bg-icon('special_4')
          .text
            vertical-align middle
            display inline-block
            font-size 12px
            line-height 12px
    .pics
      padding 18px
      .title
        margin-bottom 12px
        font-size 14px
        line-height 14px
        color rgb(7, 17, 27)
      .pics-wrapper
        width 100%
        .pics-ul
          overflow hidden
          white-space nowrap
          .pics-item
            display inline-block
            margin-right 6px
            &:last-child
              margin-right 0
    .seller-info
      padding 18px 18px 0 18px
      .title
        font-size 14px
        line-height 14px
        color rgb(7, 17, 27)
        padding-bottom 12px
        border-1px(rgba(7, 17, 27, 0.1))
      .info-item
        padding 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size 12px
        line-height 16px
        font-weight 200
        color rgb(7, 17, 27)
        &:last-child
          border-none()
</style>
