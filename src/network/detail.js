import {request} from "./request";
//详情页请求
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
//商品请求
export class Goods {
  constructor(itemInfo, columns, services) {
    // this.title = itemInfo.title;
    // this.desc = itemInfo.desc;
    // this.newPrice = itemInfo.price;
    // this.oldPrice = itemInfo.oldPrice;
    // this.discount = itemInfo.discountDesc;
    // this.columns = columns;
    // this.services = services;
    // this.nowPrice = itemInfo.highNowPrice;
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.lowPrice;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.highNowPrice;

  }
}

//商店信息请求
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}
//详情页参数请求
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

//详情页推荐亲请求
export function getRecommend() {
  return request({
    url: '/recommend',
  })
}
