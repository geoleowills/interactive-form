// Focuses on first text field when pages is loaded.
window.onload = function() {
    document.getElementById('name').focus();
}


/* ========================
Other job role text field
======================== */

// Hides the text box that should only appear if 'other' is selected for the job role.
const otherJobTextBox = document.getElementById('other-title');
otherJobTextBox.hidden = 'true';

// Selects the job title select box.
const jobRoleSelectBox = document.getElementById('title');

// Listens for a change in the job title select box and shows the 'other' text box input if needed.
jobRoleSelectBox.addEventListener('change', (e) => {
    if (jobRoleSelectBox.value === 'other') {
        otherJobTextBox.hidden = false;
    } else {
        otherJobTextBox.hidden = true;
    }
});


/* ========================
T-Shirt color options
======================== */

// Selects the color selecting div element, the color select box element and the design select box
// element. Hides the color select div as default.
const colorSelectDiv = document.getElementById('colors-js-puns');
const colorSelectBox = document.getElementById('color');
const designSelectBox = document.getElementById('design');
colorSelectDiv.hidden = true;

// Hides all color options from the color select box.
function removeColorOptions() {
    for (let i = 0; i < colorSelectBox.children.length; i++) {
        colorSelectBox.children[i].hidden = true;
    }
}
removeColorOptions();

// Stores the color options for each of the two T-Shirt options.
const jsPunsColors = ['cornflowerblue', 'darkslategrey', 'gold'];
const heartJsColors = ['tomato', 'steelblue', 'dimgrey'];

// Listens for a change in the T-shirt design select box, when one of the t-shirts designs has been 
// selected, it loops through the color options checks if that option is listed in the selected
// t-shirt color array, if it it, then that option is made visible. If no t-shirt option is selected
// then all colors and the color select div are hidden.
designSelectBox.addEventListener('change', (e) => {
    e.preventDefault();
    if (designSelectBox.value === 'js puns') {
        removeColorOptions();
        for (let i = 0; i < colorSelectBox.children.length; i++) {
            if (jsPunsColors.includes(colorSelectBox.children[i].value)) {
                colorSelectBox.children[i].hidden = false;
            }
        }
        colorSelectBox.value = jsPunsColors[0];
        colorSelectDiv.hidden = false;
    } else if (designSelectBox.value === 'heart js') {
        removeColorOptions();
        for (let i = 0; i < colorSelectBox.children.length; i++) {
            if (heartJsColors.includes(colorSelectBox.children[i].value)) {
                colorSelectBox.children[i].hidden = false;
            }
        }
        colorSelectBox.value = heartJsColors[0];
        colorSelectDiv.hidden = false;
    } else {
        removeColorOptions();
        colorSelectDiv.hidden = true;
    }
});


/* ========================
Activities - total price display and disable any activities where times clash.
======================== */

// Creates and appends a total price box to the activities section, sets to 0.
const totalActivityDiv = document.createElement('div');
const totalActivityLabel = document.createElement('label');
const totalActivityTextBox = document.createElement('input');
let totalPriceCount = 0;
totalActivityTextBox.value = `$ ${totalPriceCount}.00`;
totalActivityLabel.textContent = 'Total Price:';
totalActivityTextBox.readOnly = true;
totalActivityDiv.appendChild(totalActivityLabel);
totalActivityDiv.appendChild(totalActivityTextBox);
document.querySelector('.activities').appendChild(totalActivityDiv);

const activitiesSection = document.querySelector('fieldset.activities');

// Listens for one of the checkboxes to be checked or unchecked, disables 
// any other checkboxes where the time clashes with the one just selected
// and updates the total price box.
activitiesSection.addEventListener('change', (e) => {
    e.preventDefault();
    // Gets day and time of checked checkbox
    let checkedDateTime = e.target.getAttribute('data-day-and-time');
    for (let i = 0; i < activitiesSection.children.length; i++) {
        // Checks that the element is a label element containing the checkbox and not a legend, div or p.
        if (activitiesSection.children[i].tagName === 'LABEL') {
            // Selects the checkbox element.
            const checkbox = activitiesSection.children[i].firstElementChild;
            // Checks if the day and time of the target checkbox label is the same as the checkbox label of the current iteration.
            if (e.target.getAttribute('name') !== checkbox.getAttribute('name') && checkedDateTime === checkbox.getAttribute('data-day-and-time')) {
                // If the current iteration checkbox is already disabled, it un-disables it, otherwise it disables it.
                if (checkbox.disabled) {
                    checkbox.disabled = false;
                } else {
                    checkbox.disabled = true;
                }
            }
        }
    }
    // Adds or removes to the total price count dependant of whether the checkbox has been checked or unchecked.
    if (e.target.checked) {
        totalPriceCount += parseInt(e.target.getAttribute('data-cost'));
        totalActivityTextBox.value = `$ ${totalPriceCount}.00`;
    } else if (!e.target.checked) {
        totalPriceCount -= parseInt(e.target.getAttribute('data-cost'));
        totalActivityTextBox.value = `$ ${totalPriceCount}.00`;
    }
});

/* ========================
Payment options
======================== */

// Selects the payment options element and each payment option wodring/inputs to be displayd when each method is selected.
let paymentOptions = document.getElementById('payment');
let creditCardWording = document.getElementById('credit-card');
let paypalWording = document.getElementById('paypal');
let bitcoinWording = document.getElementById('bitcoin');

// Hides the 'Select Payment Method' option and sets the default payment options value to shows 'Credit Card'.
paymentOptions.firstElementChild.hidden = true;
paymentOptions.value = paymentOptions.firstElementChild.nextElementSibling.value;

// Hides the paypal and bitcoin wording by default.
paypalWording.hidden = true;
bitcoinWording.hidden = true;

// Listens for a change in the payment select box. Shows the selected option inputs/wording and hides the others.
paymentOptions.addEventListener('change', (e) => {
    if (paymentOptions.value === 'credit card') {
        creditCardWording.hidden = false;
        paypalWording.hidden = true;
        bitcoinWording.hidden = true;
    } else if (paymentOptions.value === 'paypal') {
        paypalWording.hidden = false;
        creditCardWording.hidden = true;
        bitcoinWording.hidden = true;
    } else if (paymentOptions.value === 'bitcoin') {
        bitcoinWording.hidden = false;
        paypalWording.hidden = true;
        creditCardWording.hidden = true;
    }
});


/* ========================
Validation functions
======================== */

// Creates a paragraph element to display when an invalid name is entered, hides the element as default.
let nameElement = document.getElementById('name');
let nameParentNode = nameElement.parentNode;
let nameErrorMessage = document.createElement('p');
nameErrorMessage.textContent = 'Please enter a valid name.';
nameErrorMessage.style.color = 'red';
nameParentNode.insertBefore(nameErrorMessage, nameElement.nextElementSibling);
nameErrorMessage.hidden = true;

// Shows the error message empty string is entered, hides again when valid name is entered.
function nameValidator() {
    if (nameElement.value === '') {
        nameErrorMessage.hidden = false;
        return false;
    } else {
        nameErrorMessage.hidden = true;
        return true;
    }
}

// Assigns email regex to variable, creates a paragraph element to show error message when an invalid
// email is entered.
const emailRgx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
let emailElement = document.getElementById('mail');
let emailParentNode = emailElement.parentNode;
let emailErrorMessage = document.createElement('p');
emailErrorMessage.textContent = 'Please enter a valid email.';
emailErrorMessage.style.color = 'red';
emailParentNode.insertBefore(emailErrorMessage, emailElement.nextElementSibling); 
emailErrorMessage.hidden = true;

// Shows the error message when incorrect email is entered, hides it again when valid email is entered.
function emailValidator() {
    if (!emailRgx.test(emailElement.value)) {
        emailErrorMessage.hidden = false;
        return false;
    } else {
        emailErrorMessage.hidden = true;
        return true;
    }
}

// Creates a paragraph element to display when no checkbox is selected, hides the element as default.
let activitiesErrorMessage = document.createElement('p');
activitiesErrorMessage.textContent = 'Please select at least one activity.';
activitiesErrorMessage.style.color = 'red';
activitiesSection.insertBefore(activitiesErrorMessage, activitiesSection.lastElementChild);
activitiesErrorMessage.hidden = true;

// Loops over the activities and counts how many are selected, if less that one is selected, error
// message shows, if one or more is selected, error message is hidden.
function activitiesValidator() {
    let count = 0;
    for (let i = 1; i < activitiesSection.children.length; i++) {
        const checkbox = activitiesSection.children[i].firstElementChild;
        if (activitiesSection.children[i].tagName === 'LABEL') {
            if (checkbox.checked === true) {
                count++
            }
        }
    }
    if (count < 1) {
        activitiesErrorMessage.hidden = false;
        return false;
    }
    else {
        activitiesErrorMessage.hidden = true;
        return true;
    }
}

// Creates a paragraph element to display when an incorrect credit card number is entered, 
// hides the element as default.
let cardNumber = document.getElementById('cc-num');
let creditCardElement = document.querySelector('div.col-6');
let creditCardErrorMessage = document.createElement('p');
creditCardErrorMessage.style.color = 'red';
creditCardElement.appendChild(creditCardErrorMessage);
creditCardErrorMessage.hidden = true;
const creditCardRegex = /^(\s*\d\s*){13,16}$/

// Checks that entered credit card number is at least 13 digits long and no longer than 16
// digits and not empty, if it doesn't fall within these parameters, an error message is displayed.
function creditCardValidator() {
    if (cardNumber.value === '' || /\D/.test(cardNumber.value)) {
        creditCardErrorMessage.textContent = 'Please enter a credit card number';
        creditCardErrorMessage.hidden = false;
        return false
    } else if (!creditCardRegex.test(cardNumber.value)) {
        creditCardErrorMessage.textContent = 'Please enter a credit card number between 13 and 16 digits.';
        creditCardErrorMessage.hidden = false;
        return false
    } else {
        creditCardErrorMessage.hidden = true;
        return true
    }
}

// Creates a paragraph element to display when an invalid zip code is entered, 
//hides the element as default.
let zipCode = document.getElementById('zip');
let zipElement = document.querySelectorAll('div.col-3')[0];
let zipErrorMessage = document.createElement('p');
zipErrorMessage.style.color = 'red';
zipElement.appendChild(zipErrorMessage);
zipErrorMessage.hidden = true;
const zipRegex = /^(\s*\d\s*){5}$/;

// Checks that entered zip code is 5 digits long, if it doesn't fall within these 
// parameters, the error message is displayed.
function zipValidator() {
    if (zipCode.value === '') {
        zipErrorMessage.textContent = 'Please enter a Zip code.';
        zipErrorMessage.hidden = false;
        return false;
    } else if (!zipRegex.test(zipCode.value)) {
        zipErrorMessage.textContent = 'Please enter a Zip code that is 5 digits long.';
        zipErrorMessage.hidden = false;
        return false;
    } else {
        zipErrorMessage.hidden = true;
        return true;
    }
}

// Creates a paragraph element to display when an incorrect CVV is entered, 
// hides the element as default.
let cvvCode = document.getElementById('cvv');
let cvvElement = document.querySelectorAll('div.col-3')[1];
let cvvErrorMessage = document.createElement('p');
cvvErrorMessage.style.color = 'red';
cvvElement.appendChild(cvvErrorMessage);
cvvErrorMessage.hidden = true;
const cvvRegex = /^(\s*\d\s*){3}$/

// Checks that entered CVV is 3 digits long and that an empty string hasn't been entered, 
// if it doesn't fall within these parameters, an error message is displayed.
function cvvValidator() {
    if (cvvCode.value === '') {
        cvvErrorMessage.textContent = 'Please enter a CVV code.';
        cvvErrorMessage.hidden = false;
        return false;
    } else if (!cvvRegex.test(cvvCode.value)) {
        cvvErrorMessage.textContent = 'Please enter a CVV code that is 3 digits long.';
        cvvErrorMessage.hidden = false;
        return false;
    } else {
        cvvErrorMessage.hidden = true;
        return true;
    }
}

// Checks whether the credit card option has been chosen, if it has then it calls all of the
// validation functions, if credit card option hasn't been selected then it calls all of 
// the validation functions except the three relating to credit card. Then checks if 
// every called funtion returned true, if all returned true, then true is returned, otherwise false is returned.
function formValidator() {
    if (paymentOptions.value === 'credit card') {
        nameValidator();
        emailValidator();
        activitiesValidator();
        creditCardValidator();
        zipValidator();
        cvvValidator();
        if (nameValidator() && emailValidator() && activitiesValidator()
        && creditCardValidator() && zipValidator() && cvvValidator()) {
            return true;
        } else {
            return false;
        }
    } else {
        nameValidator();
        emailValidator();
        activitiesValidator();
        if (nameValidator() && emailValidator() && activitiesValidator()) {
            return true;
        } else {
            return false;
        }
    }

}


/* ========================
Validation event listeners
======================== */

// Adds a submit event listener to the form, uses the formValidator function to check that
// that every input to the form is valid, if any are not then the incorrect input error messages 
// pop up and the form is stopped from being submitted by the e.preventDefault function. If
// all inputs are valid then the form is submitted.
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    if (!formValidator()) {
        e.preventDefault()
    }
});

// Adds an avent listener to each input element and validate the inputs in real time.
nameElement.addEventListener('keyup', (e) => {
    nameValidator();
});

emailElement.addEventListener('keyup', (e) => {
    emailValidator();
});

activitiesSection.addEventListener('change', (e) => {
    activitiesValidator();
});

creditCardElement.addEventListener('keyup', (e) => {
    creditCardValidator();
});

cvvElement.addEventListener('keyup', (e) => {
    cvvValidator();
});

zipElement.addEventListener('keyup', (e) => {
    zipValidator();
});