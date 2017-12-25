<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
            @click="selectMenu(index)">
          <span class="text border-1px">
            <span class="icon" v-show="item.type>0" :class="discountMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list" ref="foodList">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="description">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span><span v-if="food.oldPrice"
                                                                class="now">¥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>


    </div>
    <shopcart :deliveryPrice="seller.deliveryPrice" :selectFoods="selectFoods" :minPrice="seller.minPrice"></shopcart>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import shopcart from 'components/shopcart/shopcart'
  import cartcontrol from 'components/cartcontrol/cartcontrol'

  export default {
    components: {
      shopcart, cartcontrol
    },
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        discountMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
        goods: [],
        listHeight: [],
        scrollY: 0
      }
    },
    created() {
      this.$http.get('api/goods').then((response) => {
        var res = response.data;
        if (res.errno === 0) {
          this.goods = res.data;
          this.$nextTick(() => {
            this.initScroll();
            this.calcHeight();
          });
        }
      })
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }

    },
    methods: {
      selectMenu(index) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodList;
        let targetItem = foodList[index];
        this.foodsScroll.scrollToElement(targetItem, 300);

      },
      initScroll() {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });

      },
      calcHeight() {
        let foodList = this.$refs.foodList;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        width 56px
        height 56px
        line-height 14px
        padding 0 12px
        &.current
          position relative
          z-index 10
          margin-top -1px
          font-weight 700
          background #fff
          .text
            border-none()
        .icon
          vertical-align middle
          display inline-block
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-icon('decrease_3')
          &.discount
            bg-icon('discount_3')
          &.guarantee
            bg-icon('guarantee_3')
          &.invoice
            bg-icon('invoice_3')
          &.special
            bg-icon('special_3')
        .text
          display table-cell
          font-size 12px
          vertical-align middle
          border-1px(rgba(7, 17, 27, 0.1))
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        line-height 26px
        height 26px
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
        border-left 2px solid #d9dde1
    .food-item
      display flex
      margin 12px
      padding-bottom 12px
      border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom 0px
      .icon
        flex 0 0 57px
        margin-right 10px
      .content
        .name
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .description, .extra
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
        .description
          margin-bottom 8px
        .extra
          .count
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
          right 0
          bottom 12px
</style>
