import {request} from './request.js'


export function getDetail(iid){
    return request({
        url:'/detail',
        params:{
            iid 
        }
    })
}
//Baseinfo
export class DBaseInfo{
    constructor(iteminfo,columns,services){
        this.title = iteminfo.title
        this.desc = iteminfo.desc
        this.newPrice = iteminfo.price
        this.oldPrice = iteminfo.oldPrice
        this.discount = iteminfo.discountDesc
        this.realPrice = iteminfo.lowNowPrice
        this.discountBgColor=iteminfo.discountBgColor
        this.columns = columns
        this.services = services
        this.realPrice = iteminfo.lowNowPrice
    }
}

export class ShopInfo {
    constructor(shopInfo) {
      this.logo = shopInfo.shopLogo;
      this.name = shopInfo.name;
      this.fans = shopInfo.cFans;
      this.sells = shopInfo.cSells;
      this.score = shopInfo.score;
      this.goodsCount = shopInfo.cGoods
    }
  }

  export class GoodsParams{ 
      constructor(info,rule){
        this.image = info.images ? info.images[0]:''
        this.infos = info.set
        this.sizes= rule.tables
      }
  }


  export function getRecommend() {
    return request({
      url: '/recommend'
    })
  }