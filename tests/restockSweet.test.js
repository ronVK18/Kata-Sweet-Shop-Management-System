const Sweet = require("../src/Sweets");
const Inventory = require("../src/Inventory");
describe("Restock Sweet Feature", () => {
  let inventory;

  beforeEach(() => {
    inventory = new Inventory();
  });
  // test to check if we can restock a sweet from the inventory
  test("should allow restock of a sweet from the inventory", () => {
    let sweet = new Sweet("Kaju Katli", 50, 10, "Milk-Based");
    inventory.addSweet(sweet);
    let id = sweet.id; // getting the id of the sweet to restock
    // Simulating restock logic
    inventory.reStockSweet(id, 5); // restocking 5 units of the sweet
    const sweets = inventory.getAllSweets();
    expect(sweets.length).toBe(1); // check if sweet is still present
    expect(sweets[0].name).toBe("Kaju Katli"); // verifying the name of the sweet that is restocked
    expect(sweets[0].price).toBe(50); // verifying the price of the sweet that is restocked
    expect(sweets[0].quantity).toBe(15); // verifying the quantity of the sweet after restocked
    expect(sweets[0].category).toBe("Milk-Based"); // verifying the category of the sweet that is restocked
  });
  // test to check if we can restock a sweet that does not exist, it should throw an error
  test("should throw error when try to restock a sweet that doesn't exist", () => {
    let id = 12; // getting the id of the sweet to restock
    expect(() => {
      inventory.reStockSweet(id, 5); // trying to restock a sweet that does not exist
    }).toThrow(
      "Sweet with this ID does not exist that you are trying to restock"
    );
  });

  // test to check if we can restock a sweet with negative quantity, it should throw an error
  test("should throw error when we try to restock a sweet with negative quantity", () =>{ 
    let sweet = new Sweet("Kaju Katli", 50, 10, "Milk-Based");
    inventory.addSweet(sweet);
    let id = sweet.id; // getting the id of the sweet to restock
    // Simulating restock logic
    expect(() => {
      inventory.reStockSweet(id, -5); // trying to restock a sweet with negative quantity
    }).toThrow("Quantity cannot be negative");
  });

 
});
