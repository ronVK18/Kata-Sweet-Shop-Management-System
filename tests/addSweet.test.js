const Sweet = require("../src/Sweets");
const Inventory = require("../src/Inventory");
describe("Add Sweet Feature", () => {
  let inventory;

  beforeEach(() => {
    inventory = new Inventory();
  });
  // test to check if a sweet can be added to the inventory
  test("should add a sweet to the inventory", () => {
    let sweet = new Sweet("Kaju Katli", 50, 10, "Milk-Based");
    inventory.addSweet(sweet);
    const sweets = inventory.getAllSweets();

    expect(sweets.length).toBe(1); // check if sweet is added or not
    expect(sweets[0].name).toBe("Kaju Katli"); // verifying the name of the sweet that is enter
    expect(sweets[0].price).toBe(50); // verifying the price of the sweet that is enter
    expect(sweets[0].quantity).toBe(10); // verifying the quantity of the sweet that is enter
    expect(sweets[0].category).toBe("Milk-Based"); // verifying the category of the sweet that is enter
  });
 // test to check if a sweet with the same name cannot be added
  test("should not allow duplicate sweet names", () => {
    let sweet1 = new Sweet( "Gulab Jamun",  20, 10 , "Milk-Based");
    let sweet2 = new Sweet( "Gulab Jamun",  25, 15 , "Milk-Based"); // same name, different ID

    inventory.addSweet(sweet1);

    expect(() => {
      inventory.addSweet(sweet2);
    }).toThrow("Sweet with this name already exists.");
  });
});
