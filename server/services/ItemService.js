class itemService {
  constructor(itemRepository) {
    this.itemRepository = itemRepository;
  }

  getItems = function (userId) {
    return this.itemRepository.fetchAll(userId);
  };

  addItem = function (item, userId) {
    return this.itemRepository.addItem(item, userId);
  };

  deleteItem = function (itemId, userId) {
    return this.itemRepository.deleteItem(itemId, userId);
  };
}

module.exports = itemService;
