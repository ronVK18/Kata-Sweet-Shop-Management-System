class Sweet {
    constructor(name,price,quantity,category){
        this.id=Math.floor(Math.random() * 10000); // unique id for each sweet
        this.name=name;  // name of the sweet e.g. : "Kaju Katli","Gulab Jamun", etc.
        this.price=price;  // price of the sweet in rupees 
        this.quantity=quantity;  // quantity of the sweet
        this.category=category; // category of sweet like "Milk-Based","Nut-Based" ,"Flour-Based" ,"Vegetable-Based" ,"Fried"
    } 
}
module.exports = Sweet; //  Exporting the sweet class
