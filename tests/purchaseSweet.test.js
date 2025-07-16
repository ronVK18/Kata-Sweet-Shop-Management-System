const Sweet = require("../src/Sweets");
const Inventory = require("../src/Inventory");
describe("Purchase Sweet Feature", () => {
  let inventory;

  beforeEach(() => {
    inventory = new Inventory();
  });
  // test to check if we can buy a sweet from the inventory
  test("should allow purchase of a sweet from the inventory", () => {
    let sweet = new Sweet("Kaju Katli", 50, 10, "Milk-Based");
    inventory.addSweet(sweet);
    let id = sweet.id; // getting the id of the sweet to purchase
    // Simulating purchase logic
    inventory.purchaseSweet(id, 5); // buying 5 units of the sweet
    const sweets = inventory.getAllSweets();
    expect(sweets.length).toBe(1); // check if sweet is still present
    expect(sweets[0].name).toBe("Kaju Katli"); // verifying the name of the sweet that is purchased
    expect(sweets[0].price).toBe(50); // verifying the price of the sweet that is purchased
    expect(sweets[0].quantity).toBe(5); // verifying the quantity of the sweet after purchase
    expect(sweets[0].category).toBe("Milk-Based"); // verifying the category of the sweet that is purchased
  });
  // test to check if we can buy a sweet that does not exist, it should throw an error
  test("should throw error when try to buy a sweet that doesn't exist", () => {
    let id = 12; // getting the id of the sweet to purchase
    expect(() => {
      inventory.purchaseSweet(id, 5); // trying to purchase a sweet that does not exist
    }).toThrow(
      "Sweet with this ID does not exist that you are trying to purchase"
    );
  });

  // test to check if we can buy more quantity than available, it should throw an error
  test("should throw error when we try to buy quantity more than available", () => {
    let sweet = new Sweet("Kaju Katli", 50, 10, "Milk-Based");
    inventory.addSweet(sweet);
    let id = sweet.id; // getting the id of the sweet to purchase
    // Simulating purchase logic
    expect(() => {
      inventory.purchaseSweet(id, 15); // trying to purchase a sweet that does not exist
    }).toThrow(
      "Sweet with this ID does not have enough quantity available for purchase"
    );
  });
});
