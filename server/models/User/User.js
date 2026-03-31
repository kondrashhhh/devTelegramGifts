class User {
  constructor(userData) {
    this.userData = userData;
    this.itemsData = [];
  }

  addItem(item) {
    this.itemsData.unshift(item);
  }
}

module.exports = User;