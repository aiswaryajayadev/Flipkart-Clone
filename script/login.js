// document.addEventListener("DOMContentLoaded", function() {
//     var inputField = document.getElementById("textInput");
    
//     // Add event listener for focus
//     inputField.addEventListener("focus", function() {
//       if (this.value === "") { // Check if the input field is empty
//         this.placeholder = ""; // Remove placeholder text
//       }
//     });
    
//     // Add event listener for blur
//     inputField.addEventListener("blur", function() {
//       if (this.value === "") { // Check if the input field is empty
//         this.placeholder = "Enter data"; // Restore placeholder text
//       }
//     });
//   });
  

  function updateInputValue(input) {
    if (!isNaN(input.value)) { // Check if input is a valid number
      input.value = '+91 ' + input.value; // Add prefix text
    }
    // else if (input.value === '') {
    //   input.value = ''; // If input is empty, leave it empty
    // }
    else if (input.value==='+91 ') {
        input.value = ''; // Clear the input if it starts with "Email: "
      }
    // else {
    //   input.value = ''; // If input is not a number, clear the input
    // }
  }