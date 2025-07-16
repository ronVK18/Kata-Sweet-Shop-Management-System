const Sweet = require("../src/Sweets");
const Inventory = require("../src/Inventory");
describe("See all Sweet Feature", () => {
  let inventory;

  beforeEach(() => {
    inventory = new Inventory();
  });
  // test to check if all sweets can be viewed from the inventory
  test("should view all sweets in the inventory", () => {
    let sweet1 = new Sweet("Gulab Jamun", 20, 10, "Milk-Based");
    let sweet2 = new Sweet("Kaju Katli", 25, 15, "Milk-Based");
    inventory.addSweet(sweet1);
    inventory.addSweet(sweet2);
    const sweets = inventory.getAllSweets();
    expect(sweets.length).toBe(2); // check if both sweets are present
    expect(sweets[0].name).toBe("Gulab Jamun"); // verifying the name of the first sweet
    expect(sweets[1].name).toBe("Kaju Katli"); // verifying the name of the second sweet
    expect(sweets[0].price).toBe(20); // verifying the price of the first sweet     
    expect(sweets[1].price).toBe(25); // verifying the price of the second sweet
    expect(sweets[0].quantity).toBe(10); // verifying the quantity of the first sweet
    expect(sweets[1].quantity).toBe(15); // verifying the quantity of
    expect(sweets[0].category).toBe("Milk-Based"); // verifying the category of the first sweet
    expect(sweets[1].category).toBe("Milk-Based"); // verifying the category
    
  });
});
