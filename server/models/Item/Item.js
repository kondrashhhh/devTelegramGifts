class Item {
  constructor(data) {
    this.item_id = data.item_id;
    this.name = data.name;
    this.type = data.type;
    this.price = data.price;
    this.price_ton = data.price_ton;
    this.image = data.image;
    this.rarity_category = data.rarity_category;
    this.percent = data.percent;
  }

  isNFT() {
    return this.type === 'nftgift';
  }

  getRarity() {
    return this.percent < 1 ? 'Legendary' :
           this.percent < 5 ? 'Epic' :
           this.percent < 15 ? 'Rare' : 'Common';
  }
}

module.exports = Item;