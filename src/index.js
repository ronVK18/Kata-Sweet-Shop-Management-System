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
  deleteSweet(id) {
    // Check if sweet with given ID exists
    if (!this.sweets.has(id)) {
      throw new Error("Sweet with this ID does not exist");
    }
    this.sweets.delete(id); // Deleting sweet from the inventory
  }
  purchaseSweet(id, quantity) {
    // Check if sweet with given ID exists
    if (!this.sweets.has(id)) {
      throw new Error(
        "Sweet with this ID does not exist that you are trying to purchase"
      );
    }
    const sweet = this.sweets.get(id);
    // Check if enough quantity is available
    if (sweet.quantity < quantity) {
      throw new Error(
        "Sweet with this ID does not have enough quantity available for purchase"
      );
    }
    sweet.quantity -= quantity; // Decreasing the quantity of the sweet after purchase
  }
  reStockSweet(id, quantity) {
    // Check if sweet with given ID exists
    if (!this.sweets.has(id)) {
      throw new Error(
        "Sweet with this ID does not exist that you are trying to restock"
      );
    }
    const sweet = this.sweets.get(id);

    sweet.quantity += quantity; // increasing the quantity of the sweet after restock
  }
  searchSweetByName(name) {
    // Searching for sweet by name
    const foundSweet = Array.from(this.sweets.values()).find(
      (s) => s.name.toLowerCase() === name.toLowerCase()
    );
    return foundSweet; // Returning the found sweet or undefined if not found
  }
  searchSweetByCategory(category) {
    // Searching for sweets by category
    const foundSweets = Array.from(this.sweets.values()).filter(
      (s) => s.category.toLowerCase() === category.toLowerCase()
    );
    return foundSweets.length > 0 ? foundSweets : undefined; // Returning the found sweets or undefined if not found
  }
  searchSweetByPriceRange(minPrice, maxPrice) {
    // Searching for sweets within a price range
    const foundSweets = Array.from(this.sweets.values()).filter(
      (s) => s.price >= minPrice && s.price <= maxPrice
    );
    return foundSweets.length > 0 ? foundSweets : undefined; // Returning the found sweets or undefined if not found
  }
  sortAccordingToName(ascending = true) {
    // Sorting sweets according to name
    const sortedSweets = Array.from(this.sweets.values()).sort((a, b) => {
      return ascending
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    return sortedSweets; // Returning the sorted sweets
  }
  sortAccordingToPrice(ascending = true) {
    // Sorting sweets according to price
    const sortedSweets = Array.from(this.sweets.values()).sort((a, b) => {
      return ascending ? a.price - b.price : b.price - a.price;
    });
    return sortedSweets; // Returning the sorted sweets
  }
}
// Initialize the inventory
let inventory;

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  // Create a new inventory instance
  inventory = new Inventory();

  // Add sample data
  addSampleData();

  // Initialize event listeners
  initializeEventListeners();

  // Display initial inventory
  displaySweets();
});

// Add sample data to the inventory
function addSampleData() {
  try {
    inventory.addSweet({
      id: 1001,
      name: "Kaju Katli",
      category: "Nut-Based",
      price: 50,
      quantity: 20,
    });

    inventory.addSweet({
      id: 1002,
      name: "Gajar Halwa",
      category: "Vegetable-Based",
      price: 30,
      quantity: 15,
    });

    inventory.addSweet({
      id: 1003,
      name: "Gulab Jamun",
      category: "Milk-Based",
      price: 10,
      quantity: 50,
    });
  } catch (error) {
    console.log("Sample data already exists or error occurred:", error.message);
  }
}

// Initialize all event listeners
function initializeEventListeners() {
  // Add sweet form - using both event listener and onclick for reliability
  const addSweetForm = document.getElementById("addSweetForm");
  if (addSweetForm) {
    addSweetForm.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    });
  }

  // Add sweet button
  const addSweetBtn = addSweetForm.querySelector(".btn-primary");
  if (addSweetBtn) {
    addSweetBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      handleAddSweet(e);
    });
  }

  // Search functionality
  document.getElementById("searchBtn").addEventListener("click", handleSearch);
  document
    .getElementById("searchType")
    .addEventListener("change", handleSearchTypeChange);

  // Sort functionality
  document.getElementById("sortBtn").addEventListener("click", handleSort);

  // Purchase functionality
  document
    .getElementById("purchaseBtn")
    .addEventListener("click", handlePurchase);

  // Restock functionality
  document
    .getElementById("restockBtn")
    .addEventListener("click", handleRestock);

  // Refresh inventory
  document
    .getElementById("refreshBtn")
    .addEventListener("click", displaySweets);

  // Handle search type change
  handleSearchTypeChange();
}

// Handle adding a new sweet
function handleAddSweet(event) {
    event.preventDefault();
    event.stopPropagation();

    const formData = {
        id: Math.floor(Math.random() * 10000), // Generate a random ID
        name: document.getElementById('sweetName').value.trim(),
        category: document.getElementById('sweetCategory').value.trim(),
        price: parseFloat(document.getElementById('sweetPrice').value),
        quantity: parseInt(document.getElementById('sweetQuantity').value)
    };

    // Validation
    if (!formData.name || !formData.category || isNaN(formData.price) || formData.price <= 0 || isNaN(formData.quantity) || formData.quantity < 0) {
        showToast('Please fill in all fields with valid values', 'error');
        return false;
    }

    try {
        inventory.addSweet(formData);
        
        // Show toast with all field values
        const details = `
✅ Sweet Added Successfully:
🆔 ID: ${formData.id}
🍬 Name: ${formData.name}
📦 Category: ${formData.category}
💰 Price: ₹${formData.price.toFixed(2)}
📊 Quantity: ${formData.quantity}
        `.trim();

        showToast(details, 'success');

        // Reset form & refresh display
        document.getElementById('addSweetForm').reset();
        displaySweets();

    } catch (error) {
        showToast(error.message, 'error');
    }

    return false;
}

// Handle search functionality
function handleSearch() {
    const searchType = document.getElementById('searchType')?.value;

    if (!searchType) {
        showToast('Search type not selected', 'error');
        return;
    }

    let results = [];

    try {
        if (searchType === 'price') {
            const minPriceInput = document.getElementById('minPrice');
            const maxPriceInput = document.getElementById('maxPrice');

            if (!minPriceInput || !maxPriceInput) {
                showToast('Price input fields are missing. Please select price search again.', 'error');
                return;
            }

            const minPrice = parseFloat(minPriceInput.value);
            const maxPrice = parseFloat(maxPriceInput.value);

            if (isNaN(minPrice) || isNaN(maxPrice)) {
                showToast('Please enter valid numbers for min and max price', 'error');
                return;
            }

            if (minPrice > maxPrice) {
                showToast('Min price should not be greater than max price', 'error');
                return;
            }

            results = inventory.searchSweetByPriceRange(minPrice, maxPrice) || [];

        } else {
            const searchInput = document.getElementById('searchValue');

            if (!searchInput) {
                showToast('Search input field is missing. Please try again.', 'error');
                return;
            }

            const searchValue = searchInput.value.trim();

            if (!searchValue) {
                showToast('Please enter a search term', 'error');
                return;
            }

            if (searchType === 'name') {
                const foundSweet = inventory.searchSweetByName(searchValue);
                results = foundSweet ? [foundSweet] : [];
            } else if (searchType === 'category') {
                results = inventory.searchSweetByCategory(searchValue) || [];
            }
        }

        if (results.length === 0) {
            showToast('No sweets found matching your search criteria', 'info');
            displaySweets(); // fallback to show all
        } else {
            showToast(`Found ${results.length} sweet(s)`, 'success');
            displaySweets(results);
        }

    } catch (error) {
        showToast(error.message, 'error');
    }
}


// Handle search type change
function handleSearchTypeChange() {
  const searchType = document.getElementById("searchType").value;
  const searchInputs = document.getElementById("searchInputs");

  if (searchType === "price") {
    searchInputs.innerHTML = `
            <div id="priceInputs">
                <input type="number" id="minPrice" placeholder="Min Price" step="0.01">
                <input type="number" id="maxPrice" placeholder="Max Price" step="0.01">
            </div>
        `;
  } else {
    searchInputs.innerHTML =
      '<input type="text" id="searchValue" placeholder="Enter search term">';
  }
}

// Handle sort functionality
function handleSort() {
  const sortType = document.getElementById("sortType").value;
  const sortOrder = document.getElementById("sortOrder").value;
  const ascending = sortOrder === "asc";

  try {
    let sortedSweets = [];

    switch (sortType) {
      case "name":
        sortedSweets = inventory.sortAccordingToName(ascending);
        break;
      case "price":
        sortedSweets = inventory.sortAccordingToPrice(ascending);
        break;
    }

    displaySweets(sortedSweets);
    showToast(`Sweets sorted by ${sortType} (${sortOrder}ending)`, "success");
  } catch (error) {
    showToast(error.message, "error");
  }
}

// Handle purchase functionality
function handlePurchase() {
  const id = parseInt(document.getElementById("purchaseId").value);
  const quantity = parseInt(document.getElementById("purchaseQuantity").value);

  if (!id || !quantity || quantity <= 0) {
    showToast("Please enter valid ID and quantity", "error");
    return;
  }

  try {
    inventory.purchaseSweet(id, quantity);
    showToast(
      `Successfully purchased ${quantity} unit(s) of sweet ID ${id}`,
      "success"
    );
    document.getElementById("purchaseId").value = "";
    document.getElementById("purchaseQuantity").value = "";
    displaySweets();
  } catch (error) {
    showToast(error.message, "error");
  }
}

// Handle restock functionality
function handleRestock() {
  const id = parseInt(document.getElementById("restockId").value);
  const quantity = parseInt(document.getElementById("restockQuantity").value);

  if (!id || !quantity || quantity <= 0) {
    showToast("Please enter valid ID and quantity", "error");
    return;
  }

  try {
    inventory.reStockSweet(id, quantity);
    showToast(
      `Successfully restocked ${quantity} unit(s) of sweet ID ${id}`,
      "success"
    );
    document.getElementById("restockId").value = "";
    document.getElementById("restockQuantity").value = "";
    displaySweets();
  } catch (error) {
    showToast(error.message, "error");
  }
}

// Display sweets in the inventory
function displaySweets(sweetsToDisplay = null) {
  const sweetsList = document.getElementById("sweetsList");
  const sweets = sweetsToDisplay || inventory.getAllSweets();

  if (sweets.length === 0) {
    sweetsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-candy-cane"></i>
                <h3>No Sweets Available</h3>
                <p>Add some delicious sweets to your inventory!</p>
            </div>
        `;
    return;
  }

  sweetsList.innerHTML = sweets
    .map(
      (sweet) => `
        <div class="sweet-card fade-in">
            <div class="sweet-header">
                <h3 class="sweet-name">${sweet.name}</h3>
                <span class="sweet-id">ID: ${sweet.id}</span>
            </div>
            <div class="sweet-details">
                <div class="sweet-detail">
                    <span>Category:</span>
                    <span class="sweet-category">${sweet.category}</span>
                </div>
                <div class="sweet-detail">
                    <span>Price:</span>
                    <span class="sweet-price">₹${sweet.price.toFixed(2)}</span>
                </div>
                <div class="sweet-detail">
                    <span>Quantity:</span>
                    <span class="sweet-quantity">${sweet.quantity}</span>
                </div>
            </div>
            <div class="sweet-actions">
                <button class="btn btn-danger" onclick="deleteSweet(${
                  sweet.id
                })">
                    <i class="fas fa-trash"></i> Delete
                </button>
                
            </div>
        </div>
    `
    )
    .join("");
}

// Delete a sweet
function deleteSweet(id) {
  if (confirm("Are you sure you want to delete this sweet?")) {
    try {
      inventory.deleteSweet(id);
      showToast(`Sweet with ID ${id} deleted successfully`, "success");
      displaySweets();
    } catch (error) {
      showToast(error.message, "error");
    }
  }
}

// Edit a sweet (populate form with existing data)
function editSweet(id) {
  try {
    const sweet = inventory.getAllSweets().find((s) => s.id === id);
    if (sweet) {
      document.getElementById("sweetId").value = sweet.id;
      document.getElementById("sweetName").value = sweet.name;
      document.getElementById("sweetCategory").value = sweet.category;
      document.getElementById("sweetPrice").value = sweet.price;
      document.getElementById("sweetQuantity").value = sweet.quantity;

      // Scroll to form
      document
        .querySelector(".form-section")
        .scrollIntoView({ behavior: "smooth" });

      // Focus on name field
      document.getElementById("sweetName").focus();

      showToast("Sweet details loaded for editing", "info");
    }
  } catch (error) {
    showToast(error.message, "error");
  }
}

// Show toast notification
function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Utility function to format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}

// Utility function to capitalize first letter
function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Add keyboard shortcuts
document.addEventListener("keydown", function (event) {
  // Ctrl + N for new sweet
  if (event.ctrlKey && event.key === "n") {
    event.preventDefault();
    document.getElementById("sweetName").focus();
  }

  // Ctrl + F for search
  if (event.ctrlKey && event.key === "f") {
    event.preventDefault();
    document.getElementById("searchValue").focus();
  }

  // Escape to clear search
  if (event.key === "Escape") {
    document.getElementById("searchValue").value = "";
    displaySweets();
  }
});

// Add real-time search functionality
document.addEventListener("DOMContentLoaded", function () {
  // Real-time search as user types
  let searchTimeout;
  document.addEventListener("input", function (event) {
    if (
      event.target.id === "searchValue" ||
      event.target.id === "minPrice" ||
      event.target.id === "maxPrice"
    ) {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        if (event.target.value.trim()) {
          handleSearch();
        } else {
          displaySweets();
        }
      }, 300);
    }
  });
});

// Add loading states
function showLoading(element) {
  element.classList.add("loading");
}

function hideLoading(element) {
  element.classList.remove("loading");
}

// Export functions for testing (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    handleAddSweet,
    handleSearch,
    handleSort,
    handlePurchase,
    handleRestock,
    displaySweets,
    deleteSweet,
    editSweet,
    showToast,
  };
}
