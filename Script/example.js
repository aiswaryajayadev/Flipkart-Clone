const mockApiUrl =
  "http://localhost:3000/laptops/1";
async function fetchProductData() {
  try {
    const response = await fetch(mockApiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch product data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

async function displayDetails() {
  try {
    const productData = await fetchProductData();
    const productImages = productData.product_images;
    const productName = productData.product_name.name;

    const imageContainer = document.getElementById("image-container");
    const previewContainer = document.getElementById("preview-image");

    productImages.forEach((imgUrl, index) => {
      const imgElement = document.createElement("img");
      imgElement.src = imgUrl;
      imgElement.alt = productName;

      imgElement.addEventListener("mouseover", () => {
        previewContainer.src = imgUrl; 
      });

      if (index === 0) {
        previewContainer.src = imgUrl;
      }

      imageContainer.appendChild(imgElement);
    });

    const productContainer = document.getElementById("product-heading");
    const productElement = document.createElement("p");
    productElement.innerHTML = productName;
    productContainer.appendChild(productElement);

    const rating = productData.rating;
    const ratingContainer = document.getElementById("current-rating");
    const ratingElement = document.createElement("p");
    const ratingImage = document.createElement("img");
    ratingImage.src = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==`;
    ratingImage.classList.add("star");
    ratingElement.innerHTML = rating;
    ratingContainer.appendChild(ratingElement);
    ratingContainer.appendChild(ratingImage);

    const rupeeSymbol = "₹";
    const currentPrice = productData.price_details.current_price;
    const amountContainer = document.getElementById("amount");

    const currentPriceElement = document.createElement("div");
    currentPriceElement.innerHTML = rupeeSymbol + currentPrice;
    currentPriceElement.classList.add("current-product-price");
    amountContainer.appendChild(currentPriceElement);

    const originalPrice = productData.price_details.original_price;
    const originalPriceElement = document.createElement("div");
    originalPriceElement.innerHTML = rupeeSymbol + originalPrice;
    originalPriceElement.classList.add("original-product-price");
    amountContainer.appendChild(originalPriceElement);

    const percentSymbol = "%";
    const discount = productData.price_details.discount_percent;
    const discountElement = document.createElement("div");
    discountElement.innerHTML = discount + percentSymbol;
    discountElement.classList.add("discount");
    amountContainer.appendChild(discountElement);

    const offerContainer = document.getElementById("list1");
    const offers = productData.offers;

    offers.forEach((offer, index) => {
      const offerItem = document.createElement("div");
      offerItem.classList.add("offer-item");

      const offerImage = document.createElement("img");
      offerImage.src = `https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90`;
      offerImage.classList.add("list-image");

      const offerTypeElement = document.createElement("div");
      offerTypeElement.innerHTML = offer.offer_type;
      offerTypeElement.classList.add("offer1-name");

      const offerDescriptionElement = document.createElement("div");
      offerDescriptionElement.innerHTML = offer.description;
      offerDescriptionElement.classList.add("offer-description");

      const moreElement = document.createElement("div");
      moreElement.innerHTML = "Know More";
      moreElement.classList.add("know-more");

      offerItem.appendChild(offerImage);
      offerItem.appendChild(offerTypeElement);
      offerItem.appendChild(offerDescriptionElement);
      offerItem.appendChild(moreElement);

      offerContainer.appendChild(offerItem);
    });

  const highLight=productData.highlights;
    const highlightsList = document.getElementById("highlights-list");

   
    highlightsList.innerHTML = "";
    
   
    highLight.forEach((highlights) => {
      const listItem = document.createElement("li");
      listItem.textContent = highlights;
      highlightsList.appendChild(listItem);
    });




    const specifications = productData.specifications;
    const tbody = document.querySelector(".specification-table tbody");
    
    tbody.innerHTML = "";
    
    specifications.forEach((spec, index) => {
      const title = spec.title;
      const details = spec.details;
    
      const titleRow = document.createElement("tr");
      titleRow.innerHTML = `<th colspan="2">${title}</th>`;
      tbody.appendChild(titleRow);
    
      const nestedRow = document.createElement("tr");
      const nestedCell = document.createElement("td");
      nestedCell.colSpan = 2;
      const nestedTable = document.createElement("table");
    
      details.forEach((detail) => {
        const detailParts = detail.split(":");
        const detailRow = document.createElement("tr");
        detailRow.innerHTML = `<td style="width: 200px;">${detailParts[0]}:</td><td style="max-width: 300px; word-wrap: break-word;">${detailParts[1]}</td>`;
        nestedTable.appendChild(detailRow);
      });
    
      nestedCell.appendChild(nestedTable);
      nestedRow.appendChild(nestedCell);
      tbody.appendChild(nestedRow);
    
      const blankRow = document.createElement("tr");
      const blankCell = document.createElement("td");
      blankCell.colSpan = 2;
      blankCell.innerHTML = "&nbsp;";
      blankRow.appendChild(blankCell);
      tbody.appendChild(blankRow);
    
      // Hide all inner tables and headings initially
      if (index !== 0) {
        titleRow.style.display = "none";
        nestedRow.style.display = "none";
      }
    
      // If it's the first set of specifications, append the "Read More" link just after it
      if (index === 0) {
        const readMoreRow = document.createElement("tr");
        const readMoreCell = document.createElement("td");
        readMoreCell.colSpan = 2;
        const readMoreLink = document.createElement("a");
        readMoreLink.href = "#";
        readMoreLink.textContent = "Read More";

        readMoreLink.onclick = function () {
          // Toggle visibility of remaining tables and headings
          for (let i = 1; i < tbody.children.length; i++) {
            tbody.children[i].style.display = "table-row";
          }
          // Hide the "Read More" link
          readMoreRow.style.display = "none";
          return false; // Prevent default link behavior
        };
        readMoreCell.appendChild(readMoreLink);
        readMoreRow.appendChild(readMoreCell);
        tbody.appendChild(readMoreRow);


        
      }
    });
    












    
    const review = productData.customer_reviews;
    const reviewElement = document.getElementById("customer-review");




    const ratings = productData.rating; 

    const reviewContainElement = document.getElementById("review-contain");


    const ratingContainElement = document.createElement("p");
    ratingContainElement.textContent = ` ${ratings}`; 
    ratingContainElement.classList.add("cust-rating")
    
    
    const ratingContainDiv = document.createElement("div");
    ratingContainDiv.textContent = "★";
    ratingContainDiv.classList.add("review-star");
    
    
    reviewContainElement.appendChild(ratingContainElement);
    reviewContainElement.appendChild(ratingContainDiv);

    

    review.forEach((review) => {







      
      const rate = review.rating;
      const reviewText = review.review;

      const ratingElements = document.createElement("p");
      const reviewImage = document.createElement("img");
      reviewImage.src = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==`;
      reviewImage.classList.add("star");

      const reviewRating = document.createTextNode(` ${rate}`);

      const reviewTextElement = document.createTextNode(` ${reviewText}`);

      ratingElements.appendChild(reviewRating);
      ratingElements.appendChild(reviewImage);
      ratingElements.classList.add("review-rating");
      reviewElement.appendChild(ratingElements);

      const reviewElements = document.createElement("p");
      reviewElements.appendChild(reviewTextElement);
      reviewElements.classList.add("review-text");
      reviewElement.appendChild(reviewElements);
    });

    const questions = productData.qna;
    const questionsElement = document.getElementById("customer-question");

    questions.forEach((qna) => {
      const question = qna.question;
      const answer = qna.answer;

      const questionElement = document.createElement("div");
      questionElement.classList.add("questions");

      const questionText = document.createTextNode(`Q: ${question}`);
      const answerText = document.createTextNode(`A: ${answer}`);

      const questionParagraph = document.createElement("p");
      questionParagraph.appendChild(questionText);
      questionParagraph.classList.add("question-from-customer");
      questionParagraph.style.fontWeight = "400";

      const answerParagraph = document.createElement("p");
      answerParagraph.appendChild(answerText);
      answerParagraph.classList.add("word-wrap");

      questionElement.appendChild(questionParagraph);
      questionElement.appendChild(answerParagraph);

      questionsElement.appendChild(questionElement);
    });


  
  



    
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", displayDetails);
