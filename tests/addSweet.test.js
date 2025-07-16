const Sweet = require("../src/Sweets");
const Inventory = require("../src/Inventory");

describe("Add Sweet Feature", () => {
  let inventory;

  beforeEach(() => {
    inventory = new Inventory();
  });
  // test to check if a sweet can be added to the inventory
  test("should add a sweet to the inventory",()=>{
    let sweet = new Sweet("Kaju Katli","500","10","Milk-Based");
    inventory.addSweet(sweet);
    const sweets = inventory.getAllSweets();

    expect(sweets.length).toBe(1);      // check if sweet is added or not                        
    expect(sweets[0].name).toBe("Kaju Katli");         // verifying the name of the sweet that is enter        
    expect(sweets[0].price).toBe(50);                     // verifying the price of the sweet that is enter
    expect(sweets[0].quantity).toBe(10);                  // verifying the quantity of the sweet that is enter
    expect(sweets[0].category).toBe("Milk-Based");        // verifying the category of the sweet that is enter
  })

 
});
