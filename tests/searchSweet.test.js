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
    // test to check if we can search a sweet by category
    test("should allow search of a sweet by category",()=>{
        let sweet = new Sweet("Kaju Katli", 50, 10, "Milk-Based");
        inventory.addSweet(sweet);
        let searchCategory = "Milk-Based"; // name of the sweet to search
        
        const foundSweet = inventory.searchSweetByCategory(searchCategory);
        expect(foundSweet).toBeDefined(); // check if sweet is found
        expect(foundSweet[0].category).toBe("Milk-Based"); // verifying the category of the sweet that is searched
    })
    // test to check if we can search a sweet in a price range
    test("should allow search of a sweet in a price range",()=>{
        let sweet1 = new Sweet("Kaju Katli", 30, 10, "Milk-Based");
        let sweet2= new Sweet("Gulab Jamun", 50, 70, "Milk-Based");
        inventory.addSweet(sweet1);
        inventory.addSweet(sweet2);
        
        let minPrice = 40; // minimum price of the sweet to search
        let maxPrice = 80; // maximum price of the sweet to search
        const foundSweet = inventory.searchSweetByPriceRange(minPrice,maxPrice);
        expect(foundSweet).toBeDefined(); // check if sweet is found
        expect(foundSweet.length).toBe(1); // verifying the number of sweets found in the price range
    })
    // test to check if we can search a sweet that is not present , it should return undefined
    test("should return undefined when  search of a sweet that is not present",()=>{
        let sweet = new Sweet("Kaju Katli", 50, 10, "Milk-Based");
        inventory.addSweet(sweet);
        let searchName = "Gulab Jamun"; // name of the sweet to search
        const foundSweet = inventory.searchSweetByName(searchName);
        expect(foundSweet).toBeUndefined(); // check if sweet is not found
    })
});
