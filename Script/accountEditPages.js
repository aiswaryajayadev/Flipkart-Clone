let selectedOption = null;

function changeColor(element) {
    if (selectedOption !== null) {
        selectedOption.classList.remove('selected');
    }
    element.classList.add('selected');
    selectedOption = element;
}

function editAccountName() {
    console.log("Sirf edit button works...!!!!!!");
    var formHtml = `
    <div class="input-elements">
        <input type="text" class="text-input-box" placeholder="First Name" name="firstName" required autocomplete="name" tabindex="1" value="User" style="cursor:text;">
        <input type="text" class="text-input-box" placeholder="Last Name" name="lastName" required autocomplete="name" tabindex="1" value="User" style="cursor:text;">
        <button id="submitBtn" type="submit">SAVE</button>
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
    } else {
        console.error("Form element with id 'personal-info-form' not found.");
    }

}

function editAccountEmail() {
    var formHtml = `
    <div class="input-elements">
        <input type="email" class="text-input-box" placeholder="Email" name="emailID" required autocomplete="email"
        tabindex="1" value="user.name@example.com" style="cursor:text;">
        <button id="submitBtn" type="submit">SAVE</button>
    </div>
`;

    var formElement = document.getElementById("email-form");
    if (formElement) {
        formElement.innerHTML = formHtml;
    } else {
        console.error("Form element with id 'email-form' not found.");
    }


}

function editAccountPhone() {
    var formHtml = `
    <div class="input-elements">
        <input type="number" class="text-input-box" placeholder="Phone Number" name="Phone" required autocomplete="name"
        tabindex="1" value="0000000000" style="cursor:text;">
        <button id="submitBtn" type="submit">SAVE</button>
    </div>
`;

    var formElement = document.getElementById("phone-form");
    if (formElement) {
        formElement.innerHTML = formHtml;
    } else {
        console.error("Form element with id 'phone-form' not found.");
    }


}

function editAddressLine() {
    var formHtml = `
    <div id="edit-address-container">
                    <div class="edit-address-title">
                        EDIT ADDRESS
                    </div>
                    <div class="detailed-address">
                        <form id="address-form">
                            <div class="address-input-container" style="display: block;">
                                <input class="input-address-edit" type="text" id="account-name" name="account-name" required>
                                <label for="account-name">Name</label>
                            </div>

                            <div class="address-input-container" style="display: block;">
                                <input class="input-address-edit" type="text" id="account-phone" name="account-phone" required>
                                <label for="account-phone">Phone Number</label>
                            </div>

                            <div class="address-input-container">
                                <input class="input-address-edit" type="text" id="account-pincode" name="account-pincode" required>
                                <label for="account-pincode">Pincode</label>
                            </div>

                            <div class="address-input-container">
                                <input class="input-address-edit" type="text" id="account-locality" name="account-locality" required>
                                <label for="account-locality">Locality</label>
                            </div>

                            <div class="address-input-container">
                                <textarea id="account-address" name="account-address" style="width:400px;" required></textarea>
                                <label for="account-address">Address</label>
                            </div>

                            <div class="address-input-container">
                                <input class="input-address-edit" type="text" id="account-city" name="account-city" required>
                                <label for="account-city">City/Town</label>
                            </div>

                            <div class="address-input-container">
                                <input class="input-address-edit" type="text" id="account-state" name="account-state" required>
                                <label for="account-state">State</label>
                            </div>
                            <button type="submit" id="submitBtn">SAVE</button>
                        </form>
                    </div>
                </div>
`;

    var formElement = document.getElementById("address-edit-body");
    if (formElement) {
        formElement.innerHTML = formHtml;
    } else {
        console.error("Form element with id 'phone-form' not found.");
    }
}

function editCardName() {
    var formHtml = `
    <form id="manage-card-form">
        <input type="text" class="bank-name" style="cursor:text; border-bottom:1px solid;" name="bank-name" required value="Axis Bank Credit Card">
        <button type="submit" id="card-edit-submit">SAVE</button>
    </form>
    <div class="edit-card-name" id="edit-card-name" style="display:none;" onclick="editCardName();">EDIT</div>
    <div class="delete-button"><img src="./Assets/delete-icon.svg"></div>
`;

    var formElement = document.getElementById("saved-card-single-block");
    if (formElement) {
        formElement.innerHTML = formHtml;
    } else {
        console.error("Form element with id 'saved-card-single-block' not found.");
    }
}