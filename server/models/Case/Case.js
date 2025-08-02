const Item = require("../Item/Item");

class Case {
  constructor(data) {
    this.translit_name = data.translit_name;
    this.name = data.name;
    this.name_eng = data.name_eng;
    this.price = data.price;
    this.tickets_price = data.tickets_price;
    this.case_free = data.case_free;
    this.case_for_tickets = data.case_for_tickets;
    this.case_for_promo = data.case_for_promo;
    this.user_activeted_promo = data.user_activeted_promo;
    this.image = data.image;
    this.conditions_desc = data.conditions_desc;
    this.conditions_desc_eng = data.conditions_desc_eng;
    this.category = {
      category_id: data.category.category_id,
      name: data.category.name,
      name_eng: data.category.name_eng
    };
    this.items = data.items.map(item => new Item(item));
  }

  open() {
    const weights = this.items.map(item => {
      const priceRatio = item.price / this.price;
      return 1 / Math.pow(priceRatio, 1); 
    });

    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    const normalizedWeights = weights.map(w => w / totalWeight);

    let random = Math.random();
    let weightSum = 0;

    for (let i = 0; i < normalizedWeights.length; i++) {
      weightSum += normalizedWeights[i];
      if (random <= weightSum) {
        return this.items[i];
      }
    }

    return this.items.reduce((cheapest, item) => 
      item.price < cheapest.price ? item : cheapest
    );
  }

  getBasicInfo() {
    return {
      name: this.name,
      name_eng: this.name_eng,
      price: this.price,
      image: this.image,
      isFree: this.case_free,
      itemsCount: this.items.length
    };
  }

  getCategoryInfo() {
    return {
      id: this.category.category_id,
      name: this.category.name,
      name_eng: this.category.name_eng
    };
  }

  getNFTItems() {
    return this.items.filter(item => item.isNFT());
  }

  getMostValuableItem() {
    return this.items.reduce((prev, current) => 
      (prev.price > current.price) ? prev : current
    );
  }

  getItemsByRarity(rarity) {
    const rarityThresholds = {
      'Legendary': 1,
      'Epic': 5,
      'Rare': 15,
      'Common': Infinity
    };
    return this.items.filter(item => 
      item.percent < rarityThresholds[rarity] && 
      (rarity === 'Common' || item.percent >= rarityThresholds[rarity] / 5)
    );
  }

  getTotalValue() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}

module.exports = Case;