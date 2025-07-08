class Weapon {
    constructor(id, name, type, assetClassInfo, rarity) {
      this.id = id;
      this.imageURL = name;
      this.name = assetClassInfo;
      this.type = type;
      this.rarity = rarity;
    }
  }
  
  module.exports = Weapon;