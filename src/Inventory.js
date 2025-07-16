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
}
module.exports = Inventory; //Exporting the inventory class
