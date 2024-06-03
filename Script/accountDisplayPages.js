function displayFlipkartUsername() {
    const user = firebase.auth().currentUser;

    if (user) {
        const userId = user.uid;
        // const userId='CwP9UfMxydMIWQijQ3CpIvcYtF03';
        const database = firebase.database();
        const userDetailsRef = database.ref('UserProfileList/' + userId);
        userDetailsRef.once('value', (snapshot) => {
            const userDetails = snapshot.val();
            console.log(userDetails);
            if (userDetails) {
                var formHtml = `
                    <b>${userDetails.firstName} ${userDetails.lastName}</b>
    `;
                var formElement = document.getElementById("display-user-name");
                if (formElement) {
                    formElement.innerHTML = formHtml;
                } else {
                    console.error("Form element with id 'display-user-name' not found.");
                }
            }
        });
    }
    else {
        console.error("No user is currently authenticated.");
    }
}

function displayPersonalInfo() {
    const user = firebase.auth().currentUser;

    if (user) {
        const userId = user.uid; // Get the UID of the currently authenticated user
        const database = firebase.database();
        const userDetailsRef = database.ref('UserProfileList/' + userId);
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
                        <!-- FAQs section goes here -->
                    </div>
                    <img id="container-footer-image" src="../Assets/myProfileFooter_4e9fe2.png">
    `;
                var formElement = document.getElementById("detailed-display");
                if (formElement) {
                    formElement.innerHTML = formHtml;
                    firebase.auth().onAuthStateChanged((user) => {
                        if (user) {
                            const uid = user.uid;
                            const database = firebase.database();
                            const userDetailsRef = database.ref('UserProfileList').child(uid);
                            userDetailsRef.once('value', (snapshot) => {
                                const userData = snapshot.val();
                                if (userData && userData.gender) {
                                    if (userData.gender === "male") {
                                        document.getElementById('male').checked = true;
                                    } else if (userData.gender === 'female') {
                                        document.getElementById('female').checked = true;
                                    }
                                }
                            });
                        } else {
                            console.log("User is signed out");
                        }
                    });
                } else {
                    console.error("Form element with id 'personal-info-form' not found.");
                }
            }
        });
    } else {
        console.error("No user is currently authenticated.");
    }
}


function displayManageCards() {
    // Get the currently authenticated user
    const user = firebase.auth().currentUser;

    if (user) {
        const userId = user.uid; // Get the UID of the currently authenticated user
        const database = firebase.database();
        const userDetailsRef = database.ref('UserProfileList/' + userId);
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
                        <!-- FAQs section goes here -->
                    </div>
    `;
                var formElement = document.getElementById("detailed-display");
                if (formElement) {
                    formElement.innerHTML = formHtml;
                } else {
                    console.error("Form element with id 'detailed-display' not found.");
                }
            }
        });
    } else {
        console.error("No user is currently authenticated.");
    }
}


function displayManageAddresses() {
    const user = firebase.auth().currentUser;

    if (user) {
        const userId = user.uid; // Get the UID of the currently authenticated user
        const database = firebase.database();
        const userDetailsRef = database.ref('UserProfileList/' + userId);
        userDetailsRef.once('value', (snapshot) => {
            const userDetails = snapshot.val();
            console.log(userDetails);
            if (userDetails) {
                var formHtml = `
                    <div class="single-block-detailed-display">
                        <div class="title-and-editing">
                            <span class="personal-info-title">Manage Addresses</span>
                        </div>
                        <div id="address-edit-body">
                            <div class="single-saved-card">
                                <div class="single-saved-card-title">
                                    <div class="name-on-address">${userDetails.firstName} ${userDetails.lastName}</div>
                                    <div class="phone-number-address-page">${userDetails.phone}</div>
                                    <div class="three-dots"><img src="../Assets/three-dots.svg">
                                        <div class="dropdown-menu">
                                            <div class="dropdown-item" onclick="editAddressLine();">Edit</div>
                                            <div class="dropdown-item">Delete</div>
                                        </div>
                                    </div>
                                </div>
                                <form id="manage-address-form">
                                    <input type="text" style="background-color:white;" class="detailed-address" name="detailedAddress" required disabled value="${userDetails.address}, ${userDetails.locality}, ${userDetails.city}, ${userDetails.state} - ${userDetails.pincode}">
                                </form>
                            </div>                
                        </div>
                    </div>
    `;
                var formElement = document.getElementById("detailed-display");
                if (formElement) {
                    formElement.innerHTML = formHtml;
                } else {
                    console.error("Form element with id 'detailed-display' not found.");
                }
            }
        });
    } else {
        console.error("No user is currently authenticated.");
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