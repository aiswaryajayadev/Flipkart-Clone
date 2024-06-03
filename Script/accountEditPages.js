let selectedOption = null;

function changeColor(element) {
    if (selectedOption !== null) {
        selectedOption.classList.remove('selected');
    }
    element.classList.add('selected');
    selectedOption = element;
}

function fetchAccountGender() {
    const database = firebase.database();
    const userProfileRef = database.ref('UserProfileList/User1');
    userProfileRef.once('value', (snapshot) => {
        const userData = snapshot.val();
        if (userData && userData.gender) {
            // Update radio button based on fetched gender value
            if (userData.gender === "male") {
                document.getElementById('male').checked = true;
            } else if (userData.gender === 'female') {
                document.getElementById('female').checked = true;
            }
        }
    });
}

function editAccountName() {
    const database = firebase.database();
    const userDetailsRef = database.ref('UserProfileList/User1');
    userDetailsRef.once('value', (snapshot) => {
        const userDetails = snapshot.val();
        console.log(userDetails);
        if (userDetails) {
            var formHtml = `
    <div class="input-elements">
        <input type="text" class="text-input-box" id="first-name" placeholder="First Name" name="firstName" required autocomplete="name" tabindex="1" value="${userDetails.firstName}" style="cursor:text;">
        <input type="text" class="text-input-box" id="last-name" placeholder="Last Name" name="lastName" required autocomplete="name" tabindex="1" value="${userDetails.lastName}" style="cursor:text;">
        <button id="submitBtn" type="submit" onclick="postAccountName();">SAVE</button>
        <div id="select-gender">
            <div id="select-gender-title">Your Gender</div>
            <input type="radio" id="male" name="gender" value="male" required style="width:16px;cursor:pointer; color:#2874F0;">
            <label for="male">Male</label>
            <input type="radio" id="female" name="gender" value="female" required style="width:16px;cursor:pointer; color:#2874F0">
            <label for="female">Female</label>
        </div>
    </div>
`;
            var formElement = document.getElementById("personal-info-form");
            if (formElement) {
                formElement.innerHTML = formHtml;
                fetchAccountGender();
            } else {
                console.error("Form element with id 'personal-info-form' not found.");
            }
        }
    });
}

function editAccountEmail() {
    const database = firebase.database();
    const userDetailsRef = database.ref('UserProfileList/User1');
    userDetailsRef.once('value', (snapshot) => {
        const userDetails = snapshot.val();
        console.log(userDetails);
        if (userDetails) {
            var formHtml = `
                <div class="input-elements">
                    <input type="email" id="email-id" class="text-input-box" placeholder="Email" name="emailID" required autocomplete="email"
                    tabindex="1" value="${userDetails.email}" style="cursor:text;">
                    <button id="submitBtn" type="submit" onclick="postEmail();">SAVE</button>
                </div>
`;
            var formElement = document.getElementById("email-form");
            if (formElement) {
                formElement.innerHTML = formHtml;
            } else {
                console.error("Form element with id 'email-form' not found.");
            }
        }
    });
}

function editAccountPhone() {
    const database = firebase.database();
    const userDetailsRef = database.ref('UserProfileList/User1');
    userDetailsRef.once('value', (snapshot) => {
        const userDetails = snapshot.val();
        console.log(userDetails);
        if (userDetails) {
            var formHtml = `
                <div class="input-elements">
                    <input type="number" id="phone-number" class="text-input-box" placeholder="Phone Number" name="Phone" required autocomplete="name"
                    tabindex="1" value="${userDetails.phone}" style="cursor:text;">
                    <button id="submitBtn" type="submit" onclick="postPhoneNumber();">SAVE</button>
                </div>
`;
            var formElement = document.getElementById("phone-form");
            if (formElement) {
                formElement.innerHTML = formHtml;
            } else {
                console.error("Form element with id 'phone-form' not found.");
            }
        }
    });
}

function editAddressLine() {
    const database = firebase.database();
    const userDetailsRef = database.ref('UserProfileList/User1');
    userDetailsRef.once('value', (snapshot) => {
        const userDetails = snapshot.val();
        console.log(userDetails);
        if (userDetails) {
            var formHtml = `
                <div id="edit-address-container">
                    <div class="edit-address-title">
                        EDIT ADDRESS
                    </div>
                    <div class="detailed-address">
                        <form id="address-form">
                            <div class="address-input-container" style="display: block;">
                                <input class="input-address-edit" type="text" id="account-name" name="account-name" required value="${userDetails.firstName} ${userDetails.lastName}">
                                <label for="account-name">Name</label>
                            </div>

                            <div class="address-input-container" style="display: block;">
                                <input class="input-address-edit" type="text" id="account-phone" name="account-phone" required value="${userDetails.phone}">
                                <label for="account-phone">Phone Number</label>
                            </div>

                            <div class="address-input-container">
                                <input class="input-address-edit" type="text" id="account-pincode" name="account-pincode" required value="${userDetails.pincode}">
                                <label for="account-pincode">Pincode</label>
                            </div>

                            <div class="address-input-container">
                                <input class="input-address-edit" type="text" id="account-locality" name="account-locality" required value="${userDetails.locality}">
                                <label for="account-locality">Locality</label>
                            </div>

                            <div class="address-input-container">
                                <textarea id="account-address" name="account-address" style="width:400px;" required>${userDetails.address}</textarea>
                                <label for="account-address">Address</label>
                            </div>

                            <div class="address-input-container">
                                <input class="input-address-edit" type="text" id="account-city" name="account-city" required value="${userDetails.city}">
                                <label for="account-city">City/Town</label>
                            </div>

                            <div class="address-input-container">
                                <input class="input-address-edit" type="text" id="account-state" name="account-state" required value="${userDetails.state}">
                                <label for="account-state">State</label>
                            </div>
                            <button type="submit" id="submitBtn" onclick="postAccountAddress();">SAVE</button>
                        </form>
                    </div>
                </div>
`;
            var formElement = document.getElementById("address-edit-body");
            if (formElement) {
                formElement.innerHTML = formHtml;
            } else {
                console.error("Form element with id 'address-edit-body' not found.");
            }
        }
    });
}

function editCardName() {
    const database = firebase.database();
    const userDetailsRef = database.ref('UserProfileList/User1');
    userDetailsRef.once('value', (snapshot) => {
        const userDetails = snapshot.val();
        console.log(userDetails);
        if (userDetails) {
            var formHtml = `
                <form id="manage-card-form">
                    <input type="text" class="bank-name" id="card-name" style="cursor:text; border-bottom:1px solid;" name="bank-name" required value="${userDetails.cardName}">
                    <button type="submit" id="card-edit-submit" onclick="postCardName();">SAVE</button>
                </form>
                <div class="edit-card-name" id="edit-card-name" style="display:none;" onclick="editCardName();">EDIT</div>
                <div class="delete-button"><img src="../Assets/delete-icon.svg"></div>
`;
            var formElement = document.getElementById("saved-card-single-block");
            if (formElement) {
                formElement.innerHTML = formHtml;
            } else {
                console.error("Form element with id 'saved-card-single-block' not found.");
            }
        }
    });
}

//Posting
function postAccountName(){
    var firstNameLocal = document.getElementById('first-name').value;
    var lastNameLocal = document.getElementById('last-name').value;
    var genderLocal = document.querySelector('input[name="gender"]:checked').value;
    console.log(genderLocal);
    const database = firebase.database();
    const userProfileRef = database.ref('UserProfileList/User1');
    userProfileRef.update({
        firstName: firstNameLocal,
        lastName: lastNameLocal,
        gender: genderLocal
    })
    .then(() => {
        console.log("User's first name, last name and updated successfully!");
    })
    .catch((error) => {
        console.error("Error updating user's first name, last name and gender:", error);
    });
}


function postEmail(){
    var emailLocal = document.getElementById('email-id').value;
    console.log(emailLocal);
    const database = firebase.database();
    const userProfileRef = database.ref('UserProfileList/User1');
    userProfileRef.update({
        email: emailLocal,
    })
    .then(() => {
        console.log("User's email updated successfully!");
    })
    .catch((error) => {
        console.error("Error updating user's email:", error);
    });
}

function postPhoneNumber(){
    var phoneLocal = document.getElementById('phone-number').value;
    console.log(phoneLocal);
    const database = firebase.database();
    const userProfileRef = database.ref('UserProfileList/User1');
    userProfileRef.update({
        phone: phoneLocal,
    })
    .then(() => {
        console.log("User's Phone Number updated successfully!");
    })
    .catch((error) => {
        console.error("Error updating user's Phone Number:", error);
    });
}

function postCardName(){
    var cardNameLocal = document.getElementById('card-name').value;
    console.log(cardNameLocal);
    const database = firebase.database();
    const userProfileRef = database.ref('UserProfileList/User1');
    userProfileRef.update({
        cardName: cardNameLocal,
    })
    .then(() => {
        console.log("User's Card Name updated successfully!");
    })
    .catch((error) => {
        console.error("Error updating user's Card Name:", error);
    });
}

function postAccountAddress(){
    var pincodeLocal = document.getElementById('account-pincode').value;
    var localityLocal = document.getElementById('account-locality').value;
    var addressLocal = document.getElementById('account-address').value;
    var cityLocal = document.getElementById('account-city').value;
    var stateLocal = document.getElementById('account-state').value;
    console.log(addressLocal);
    const database = firebase.database();
    const userProfileRef = database.ref('UserProfileList/User1');
    userProfileRef.update({
        pincode: pincodeLocal,
        locality: localityLocal,
        address: addressLocal,
        city: cityLocal,
        state: stateLocal
    })
    .then(() => {
        console.log("User's Address updated successfully!");
    })
    .catch((error) => {
        console.error("Error updating user's Address:", error);
    });
}