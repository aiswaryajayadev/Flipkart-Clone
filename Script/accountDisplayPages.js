function displayPersonalInfo() {
    const database = firebase.database();
    const userDetailsRef = database.ref('UserProfileList/User1');
    userDetailsRef.once('value', (snapshot) => {
        const userDetails = snapshot.val();
        console.log(userDetails);
        if (userDetails) {
            var formHtml = `
             <div class="single-block-detailed-display">
                <div class="title-and-editing">
                    <span class="personal-info-title">Personal Information</span>
                    <span class="editing-link-text" onclick="editAccountName();">Edit</span>
                </div>
                <form id="personal-info-form">
                    <div class="input-elements">
                        <input type="text" class="text-input-box" name="firstName" required disabled autocomplete="name"
                            tabindex="1" value="${userDetails.firstName}">
                        <input type="text" class="text-input-box" name="lastName" required disabled autocomplete="name"
                            tabindex="1" value="${userDetails.lastName}">
                        <div id="select-gender">
                            <div id="select-gender-title">Your Gender</div>
                            <input type="radio" id="male" name="gender" value="male" disabled style="width:16px">
                            <label for="male">Male</label>
                            <input type="radio" id="female" name="gender" value="female" disabled style="width:16px">
                            <label for="female">Female</label>
                        </div>
                    </div>
                </form>
            </div>

            <div class="single-block-detailed-display">
                <div class="title-and-editing">
                    <span class="personal-info-title">Email address</span>
                    <span class="editing-link-text" onclick="editAccountEmail();">Edit</span>
                </div>
                <form id="email-form">
                    <div class="input-elements">
                        <input type="email" class="text-input-box" name="emailID" required disabled autocomplete="name"
                            tabindex="1" value="${userDetails.email}">
                    </div>
                </form>
            </div>

            <div class="single-block-detailed-display">
                <div class="title-and-editing">
                    <span class="personal-info-title">Phone</span>
                    <span class="editing-link-text" onclick="editAccountPhone();">Edit</span>
                </div>
                <form id="phone-form">
                    <div class="input-elements">
                        <input type="number" class="text-input-box" name="emailID" required disabled autocomplete="name"
                            tabindex="1" value="${userDetails.phone}">
                    </div>
                </form>
            </div>

            <div class="faq-container">
                <div id="faq-title">FAQs</div>
                <div class="faq-single-block">
                    <div class="faq-question">
                        <h4>What happens when I update my email address (or mobile number)?</h4>
                    </div>
                    <div class="faq-answer">
                        Your login email id (or mobile number) changes, likewise. You'll receive all
                        your account related
                        communication on your updated email address (or mobile number).
                    </div>
                </div>

                <div class="faq-single-block">
                    <div class="faq-question">
                        When will my Flipkart account be updated with the new email address (or mobile number)?
                    </div>
                    <div class="faq-answer">
                        It happens as soon as you confirm the verification code sent to your email (or mobile) and save
                        the
                        changes.
                    </div>
                </div>

                <div class="faq-single-block">
                    <div class="faq-question">
                        What happens to my existing Flipkart account when I update my email address (or mobile number)?
                    </div>
                    <div class="faq-answer">
                        Updating your email address (or mobile number) doesn't invalidate your account. Your account
                        remains
                        fully functional. You'll continue seeing your Order history, saved information and personal
                        details.
                    </div>
                </div>

                <div class="faq-single-block">
                    <div class="faq-question">
                        What happens to my existing Flipkart account when I update my email address (or mobile number)?
                    </div>
                    <div class="faq-answer">
                        Updating your email address (or mobile number) doesn't invalidate your account. Your account
                        remains
                        fully functional. You'll continue seeing your Order history, saved information and personal
                        details.
                    </div>
                </div>

                <div class="faq-single-block">
                    <div class="faq-question">
                        Does my Seller account get affected when I update my email address?
                    </div>
                    <div class="faq-answer">
                        Flipkart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.

                    </div>
                </div>
            </div>
            <img id="container-footer-image" src="../Assets/myProfileFooter_4e9fe2.png">
`;
            var formElement = document.getElementById("detailed-display");
            if (formElement) {
                formElement.innerHTML = formHtml;
            } else {
                console.error("Form element with id 'personal-info-form' not found.");
            }
        }
    });
}

function displayManageCards() {
    const database = firebase.database();
    const userDetailsRef = database.ref('UserProfileList/User1');
    userDetailsRef.once('value', (snapshot) => {
        const userDetails = snapshot.val();
        console.log(userDetails);
        if (userDetails) {
            var formHtml = `
    <div class="single-block-detailed-display">
                <div class="title-and-editing">
                    <span class="personal-info-title">Manage Saved Cards</span>
                </div>
                <div class="single-saved-card">
                    <div class="single-saved-card-title" id="saved-card-single-block">
                        <form id="manage-card-form">
                            <input type="text" class="bank-name" name="bank-name" required disabled value="${userDetails.cardName}">
                        </form>
                        <div class="edit-card-name" id="edit-card-name" onclick="editCardName();">EDIT</div>
                        <div class="delete-button"><img src="../Assets/delete-icon.svg"></div>
                    </div>
                    <div class="card-number">**** **** **** ${userDetails.cardDigits}</div>
                </div>
            </div>

            <div class="faq-container">
                <div id="faq-title">FAQs</div>
                <div class="faq-single-block">
                    <div class="faq-question">
                        <h4>Why is my card being tokenised?</h4>
                    </div>
                    <div class="faq-answer">
                        As per the new RBI guidelines to make card data more secure, merchants like Flipkart cannot
                        store the card details of users. As an alternative, RBI has authorised card networks and card
                        issuers to offer card tokenisation services, which means the replacement of actual credit and
                        debit card details with an alternate code called “token”. The user can either choose to tokenise
                        their card by giving consent for future transactions or choose to continue without tokenisation.
                    </div>
                </div>

                <div class="faq-single-block">
                    <div class="faq-question">
                        What is a token?
                    </div>
                    <div class="faq-answer">
                        A token is generated when a user gives consent to Flipkart to tokenise their card. A token is a
                        unique value for a combination of card, token requestor (Flipkart is a token requestor & accepts
                        request from the customer for tokenisation of a card and passes it onto the card network to
                        issue a corresponding token) and device. The token does not contain any personal information
                        linked to your card and is generated only when a customer uses a new card for a successful
                        transaction on Flipkart.
                    </div>
                </div>

                <div class="faq-single-block">
                    <div class="faq-question">
                        Is it safe to tokenise my card?
                    </div>
                    <div class="faq-answer">
                        Yes. A tokenised card transaction is considered safer as the actual card details are not shared
                        with the Flipkart during transaction processing . Card information is stored with the authorised
                        card networks or card issuers only and Flipkart does not store your 16-digit card number.
                    </div>
                </div>

                <div class="faq-single-block">
                    <div class="faq-question">
                        Is tokenisation of card mandatory?
                    </div>
                    <div class="faq-answer">
                        No, customer can choose whether or not to tokenise their card.
                    </div>
                </div>

                <div class="faq-single-block">
                    <div class="faq-question">
                        What happens if I don’t give consent to secure my card?
                    </div>
                    <div class="faq-answer">
                        If you don’t give consent to tokenise your card, you need to enter your card details for every
                        transaction as stipulated under the RBI guidelines.
                    </div>
                </div>
                <a id="view-all-faq-link" href="viewAllFAQ.html" target="_blank">
                    <div id="view-all-faq">View all FAQs <img style="margin-left:8px;"
                            src="../Assets/forward-arrow.svg"></div>
                </a>
            </div>
`;
            var formElement = document.getElementById("detailed-display");
            if (formElement) {
                formElement.innerHTML = formHtml;
            } else {
                console.error("Form element with id 'personal-info-form' not found.");
            }
        }
    });
}

function displayManageAddresses() {
    var formHtml = `
    <div class="single-block-detailed-display">
                <div class="title-and-editing">
                    <span class="personal-info-title">Manage Addresses</span>
                </div>
                <div id="address-edit-body">
                <div class="single-saved-card">
                    <div class="single-saved-card-title">
                        <div class="name-on-address">Kailas Nadh J</div>
                        <div class="phone-number-address-page">9012349344</div>
                        <div class="three-dots"><img src="../Assets/three-dots.svg">
                            <div class="dropdown-menu">
                                <div class="dropdown-item" onclick="editAddressLine();">Edit</div>
                                <div class="dropdown-item">Delete</div>
                            </div>
                        </div>
                    </div>
                    <form id="manage-address-form">
                        <input type="text" style="background-color:white;" class="detailed-address" name="detailedAddress" required disabled value="No. 221b, Baker Street, London, United Kingdom, PIN-567890">
                    </form>
                    </div>                
                    </div>
            </div>
`;

    var formElement = document.getElementById("detailed-display");
    if (formElement) {
        formElement.innerHTML = formHtml;
    } else {
        console.error("Form element with id 'personal-info-form' not found.");
    }

}

function nothingToShow() {
    var formHtml = `
    <div class="nothing-to-show-page">
                <div class="bicycle-kid">
                    <img src="../Assets/error-bicycle-boy.png">
                </div>
                <div class="nothing-to-show-title">
                    Nothing to display here
                </div>
                <div class="go-home-button">
                    <a href="home.html">
                        <button id="goHomeBtn">GO HOME</button>
                    </a>
                </div>
            </div>
`;

    var formElement = document.getElementById("detailed-display");
    if (formElement) {
        formElement.innerHTML = formHtml;
    } else {
        console.error("Form element with id 'personal-info-form' not found.");
    }

}