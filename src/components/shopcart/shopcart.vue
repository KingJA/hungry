<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totleCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totleCount>0}"></i>
            </div>
            <div class="num" v-show="totleCount>0">{{totleCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totleCount>0}">¥{{totlePrice}}</div>
          <div class="desc">另需配送费¥{{deliveryPrice}}</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
      </div>

      <div class="shopcart-list">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="food in selectGoods">
              <span class="name">{{food.name}}</span>
            </li>
          </ul>

        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      selectGoods: {
        type: Array,
        default() {
          return [{price: 18, count: 1}];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totlePrice() {
        let totalPrice = 0;
        this.selectGoods.forEach((good) => {
          totalPrice += good.price * good.count;
        });
        return totalPrice;
      },
      totleCount: function () {
        let totleCount = 0;
        this.selectGoods.forEach((good) => {
          totleCount += good.count;
        });
        return totleCount;
      },
      payDesc() {
        if (this.totlePrice === 0) {
          return `¥${this.minPrice}元起送`;
        } else if (this.totlePrice < this.minPrice) {
          let left = this.minPrice - this.totlePrice;
          return `还差¥${left}元起送`;
        }
        else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totlePrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      }
    }

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
      display flex
      background #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          position relative
          font-size 0px
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          background #141d27
          border-radius 50%
          box-sizing border-box
          .logo
            width 100%
            height 100%
            border-radius 50%
            background #2b343c
            text-align center
            &.highlight
              background rgb(0, 160, 220)
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
              &.highlight
                color #fff
          .num
            position absolute
            right 0
            top 0
            display inline-block
            width 24px
            height 16px
            line-height 16px
            font-size 10px
            background rgb(240, 20, 20)
            border-radius 16px
            color #fff
            text-align center
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)

        .price
          display inline-block
          vertical-align top
          box-sizing border-box
          line-height 24px
          margin-top 12px
          padding-right 12px
          font-size 16px
          border-right 1px solid rgba(255, 255, 255, 0.1)
          color rgba(255, 255, 255, 0.4)
          &.highlight
            color #fff
        .desc
          display inline-block
          margin-left 12px
          font-size 12px
          line-height 48px
          text-align center
          vertical-align top
          color rgba(255, 255, 255, 0.4)
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          color rgba(255, 255, 255, 0.4)
          text-align center
          font-size 12px
          line-height 48px
          font-weight 700
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color #fff
    .shopcart-list
      position absolute
      left 0
      top 0
      z-index -1
      width 100%
</style>
