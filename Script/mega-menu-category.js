const mockApiUrl ="https://run.mocky.io/v3/e2630f15-1664-48b6-b3d3-5f3d16dddeed";

async function fetchCategoryList(){
    try{
        const response=await fetch(mockApiUrl);
        if(!response.ok)
            {
                throw new Error("Failed to fetch product data");
                      }
                      const data = await response.json();
                      return data; // Return the entire product data
                    } catch (error) {
                      console.error(error);
                      return {}; // Return empty object in case of error
                    }
                  }
                  




// Loop through each category in megaMenuItems

async function displayCategoryList(containerId, categoryKey) {
    try {
        const categories2MegaMenuItemsList = document.getElementById(containerId);

        const megaMenuItemsObject = await fetchCategoryList();
        const megaMenuItems = megaMenuItemsObject[categoryKey];
        console.log(megaMenuItems);

        if (!Array.isArray(megaMenuItems)) {
            throw new Error('Mega menu items data is not an array.');
        }

        // Class array to cycle through
        const specialClasses = ['c2-mega-menu-items-list-3'];

        // Counter to keep track of the current special class
        let classCounter = 0;

        megaMenuItems.forEach(category => {
            // Create a new div element for the category container
            const categoryContainer = document.createElement('div');
            categoryContainer.classList.add('categories2-mega-menu-items-list');
            
            // Create a new div element for the category title
            const categoryTitleDiv = document.createElement('div');
            categoryTitleDiv.textContent = category.title;

            // Add the appropriate special class
            categoryTitleDiv.classList.add(specialClasses[classCounter]);

            // Cycle through the classes
            classCounter = (classCounter + 1) % specialClasses.length;
            
            // Append the category title div to the category container
            categoryContainer.appendChild(categoryTitleDiv);

            // If the category has links
            if (Array.isArray(category.Links)) {
                category.Links.forEach(link => {
                    // Create a new anchor element for the link
                    const linkElement = document.createElement('a');
                    linkElement.textContent = link.title;
                    linkElement.classList.add('c2-mega-menu-items-list-1'); // Assuming all links get this class
                    // Set the href attribute
                    linkElement.href = link.href;

                    // Append the link element to the category container
                    categoryContainer.appendChild(linkElement);
                });
            }

            // Append the category container to the parent element
            categories2MegaMenuItemsList.appendChild(categoryContainer);
        });
    } catch (error) {
        console.error(`Error in displaying ${categoryKey} category list:`, error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    displayCategoryList('categories2-mega-menu-items', 'Electronics');
    displayCategoryList('categories2-mega-menu-items-1','TVs & Appliances');
    displayCategoryList('categories2-mega-menu-items-2','Men');
    displayCategoryList('categories2-mega-menu-items-3', 'Women');
    displayCategoryList('categories2-mega-menu-items-4', 'Baby & Kids');
    displayCategoryList('categories2-mega-menu-items-5', 'TVs & Home & Furniture');
    displayCategoryList('categories2-mega-menu-items-6', 'Sports, Books & More');
   
});

