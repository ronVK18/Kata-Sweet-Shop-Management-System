const Sweet = require("../src/Sweets");
const Inventory = require("../src/Inventory");
describe("Search Sweet Feature", () => {
  let inventory;

  beforeEach(() => {
    inventory = new Inventory();
  });
    // test to check if we can search a sweet by name
    test("should allow search of a sweet by name",()=>{
        let sweet = new Sweet("Kaju Katli", 50, 10, "Milk-Based");
        inventory.addSweet(sweet);
        let searchName = "Kaju Katli"; // name of the sweet to search
        
        const foundSweet = inventory.searchSweetByName(searchName);
        expect(foundSweet).toBeDefined(); // check if sweet is found
        expect(foundSweet.name).toBe("Kaju Katli"); // verifying the name of the sweet that is searched
    })
    // test to check if we can search a sweet that is not present , it should return undefined
    test("should return undefinde when  search of a sweet that is not present",()=>{
        let sweet = new Sweet("Kaju Katli", 50, 10, "Milk-Based");
        inventory.addSweet(sweet);
        let searchName = "Gulab Jamun"; // name of the sweet to search
        const foundSweet = inventory.searchSweetByName(searchName);
        expect(foundSweet).toBeUndefined(); // check if sweet is not found
    })
});
