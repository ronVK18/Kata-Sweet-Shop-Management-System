class Inventory {
  constructor() {
    this.sweets = new Map(); // Map to store sweet with id as it's key
  }
  addSweet(sweet) {
    // Check if ID already exists
    if (this.sweets.has(sweet.id)) {
      throw new Error("Sweet with this ID already exists.");
    }

    //  Check if name already exists
    for (const existingSweet of this.sweets.values()) {
      if (existingSweet.name.toLowerCase() === sweet.name.toLowerCase()) {
        throw new Error("Sweet with this name already exists.");
      }
    }

    this.sweets.set(sweet.id, sweet); //Adding sweet to the inventory
  }
  getAllSweets() {
    return Array.from(this.sweets.values()); //Returning all sweets present in inventory
  }
  deleteSweet(id){
    // Check if sweet with given ID exists
    if(!this.sweets.has(id)){
        throw new Error("Sweet with this ID does not exist");
    }
    this.sweets.delete(id) // Deleting sweet from the inventory 
  }
  purchaseSweet(id,quantity){
    // Check if sweet with given ID exists
    if(!this.sweets.has(id)){
        throw new Error("Sweet with this ID does not exist that you are trying to purchase");
    }
    const sweet = this.sweets.get(id);
    // Check if enough quantity is available
    if(sweet.quantity < quantity){
        throw new Error("Sweet with this ID does not have enough quantity available for purchase");
    }
    sweet.quantity -= quantity; // Decreasing the quantity of the sweet after purchase
  }
  reStockSweet(id,quantity){
    // Check if sweet with given ID exists
    if(!this.sweets.has(id)){
        throw new Error("Sweet with this ID does not exist that you are trying to restock");
    }
    const sweet = this.sweets.get(id);
    
    sweet.quantity += quantity; // increasing the quantity of the sweet after restock
  }
  searchSweetByName(name){
    // Searching for sweet by name
    const foundSweet = Array.from(this.sweets.values()).find(s => s.name.toLowerCase() === name.toLowerCase());
    return foundSweet; // Returning the found sweet or undefined if not found
  }
  searchSweetByCategory(category) {
    // Searching for sweets by category
    const foundSweets = Array.from(this.sweets.values()).filter(s => s.category.toLowerCase() === category.toLowerCase());
    return foundSweets.length > 0 ? foundSweets : undefined; // Returning the found sweets or undefined if not found
  }
  searchSweetByPriceRange(minPrice, maxPrice) {
    // Searching for sweets within a price range
    const foundSweets = Array.from(this.sweets.values()).filter(s => s.price >= minPrice && s.price <= maxPrice);
    return foundSweets.length > 0 ? foundSweets : undefined; // Returning the found sweets or undefined if not found
  }
}
module.exports = Inventory; //Exporting the inventory class
