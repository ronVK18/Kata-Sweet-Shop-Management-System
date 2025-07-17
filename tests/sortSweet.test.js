const Sweet = require("../src/Sweets");
const Inventory = require("../src/Inventory");
describe("Sort Sweet Feature", () => {
  let inventory;

  beforeEach(() => {
    inventory = new Inventory();
  });
  // test to check if a sort sweet according to name is working or not
  test("should sort the sweet according to the name", () => {
    let sweet1 = new Sweet("Kaju Katli", 50, 10, "Milk-Based");
    let sweet2 = new Sweet("Gulab Jamun", 50, 10, "Milk-Based");
    inventory.addSweet(sweet1);
    inventory.addSweet(sweet2);
    // For Ascending order
    const sweetsAsc = inventory.sortAccordingToName(true); // true for ascending order
    expect(sweetsAsc.length).toBe(2); // check if both sweets are added or  not
    expect(sweetsAsc[0].name).toBe("Gulab Jamun"); // check if the first sweet is Gulab Jamun
    expect(sweetsAsc[1].name).toBe("Kaju Katli"); // check if the second sweet is Kaju Katli   

    // For Descending order     

    const sweetsDesc = inventory.sortAccordingToName(false); // false for descending order
    expect(sweetsDesc.length).toBe(2); // check if both sweets are added or  not
    expect(sweetsDesc[0].name).toBe("Kaju Katli"); // check if the first sweet is Kaju Katli
    expect(sweetsDesc[1].name).toBe("Gulab Jamun"); // check if the second sweet is Gulab Jamun
  });
  // test to check if a sort sweet according to price is working or not
  test("should sort the sweet according to the price", () => {
    let sweet1 = new Sweet("Kaju Katli", 100, 10, "Milk-Based");
    let sweet2 = new Sweet("Gulab Jamun", 50, 10, "Milk-Based");
    inventory.addSweet(sweet1);
    inventory.addSweet(sweet2);
    // For Ascending order
    const sweetsAsc = inventory.sortAccordingToPrice(true); // true for ascending order
    expect(sweetsAsc.length).toBe(2); // check if both sweets are added or  not
    expect(sweetsAsc[0].name).toBe("Gulab Jamun"); // check if the first sweet is Gulab Jamun
    expect(sweetsAsc[1].name).toBe("Kaju Katli"); // check if the second sweet is Kaju Katli   
    // For Ascending order
    const sweetsDesc = inventory.sortAccordingToPrice(false); // true for ascending order
    expect(sweetsDesc.length).toBe(2); // check if both sweets are added or  not
    expect(sweetsDesc[0].name).toBe("Kaju Katli"); // check if the first sweet is Kaju Katli   
    expect(sweetsDesc[1].name).toBe("Gulab Jamun"); // check if the second sweet is Gulab Jamun
  });

});
