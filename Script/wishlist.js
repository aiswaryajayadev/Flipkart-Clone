let selectedOption = null;

function changeColor(element) {
    if (selectedOption !== null) {
        selectedOption.classList.remove('selected');
    }
    element.classList.add('selected');
    selectedOption = element;
}

// Make a GET request to fetch data from the server
fetch('http://localhost:3000/laptops')
  .then(response => {
    // Check if the request was successful
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    // Parse the JSON response
    return response.json();
  })
  .then(data => {
    // Iterate over the array of laptops and print their product names
    data.forEach(laptop => {
      console.log(laptop.product_name.name);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
