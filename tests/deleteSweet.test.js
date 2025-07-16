const Sweet = require("../src/Sweets");
const Inventory = require("../src/Inventory");
describe("Delete Sweet Feature", () => {
  let inventory;

  beforeEach(() => {
    inventory = new Inventory();
  });
  // test to check if a sweet can be added to the inventory
  test("should delete a sweet to the inventory", () => {
    let sweet = new Sweet("Kaju Katli", 50, 10, "Milk-Based");
    inventory.addSweet(sweet);
    let id=sweet.id // getting the id of the sweet to delete
    inventory.deleteSweet(id); // deleting the sweet from the inventory
    const sweets = inventory.getAllSweets();
    expect(sweets.length).toBe(0); // check if sweet is deleted or not 
  });
});
