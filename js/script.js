// Focuses on first text field when pages is loaded.
window.onload = function() {
    document.getElementById('name').focus();
}

// Hides the text box that should only appear if 'other' is selected for the job role.
const otherJobTextBox = document.getElementById('other-title');
otherJobTextBox.style.display = 'none';

// Selects the job title select box.
const jobRoleSelectBox = document.getElementById('title');

// Listens for a change in the job title select box and shows the 'other' text box input if needed.
jobRoleSelectBox.addEventListener('change', (e) => {
    e.preventDefault();
    if (jobRoleSelectBox.value === 'other') {
        otherJobTextBox.style.display = '';
    } else {
        otherJobTextBox.style.display = 'none';
    }
});

// Insert new select option element that displays 'Please select a T-shirt theme' to the user.
// Sets the inital color select box text 'Please select a T-shirt theme'.
const colorSelectBox = document.getElementById('color');
const designSelectBox = document.getElementById('design');
const defaultColorOption = document.createElement('option');
defaultColorOption.textContent = 'Please select a T-shirt theme';
defaultColorOption.value = 'selecttheme';
colorSelectBox.insertBefore(defaultColorOption, colorSelectBox.firstElementChild);
colorSelectBox.value = defaultColorOption.value;

// Hides all color options.
function removeColorOptions() {
    for (let i = 0; i < colorSelectBox.children.length; i++) {
        colorSelectBox.children[i].style.display = 'none'
    }
}
removeColorOptions();

// Stores the color options for each T-Shirt
const heartJsColors = ['cornflowerblue', 'darkslategrey', 'gold'];
const jsPunsColors = ['tomato', 'steelblue', 'dimgrey'];

// Listens for a change in the T-shirt design select box,
designSelectBox.addEventListener('change', (e) => {
    e.preventDefault();
    if (designSelectBox.value === 'js puns') {
        removeColorOptions();
        for (let i = 0; i < colorSelectBox.children.length; i++) {
            if (jsPunsColors.includes(colorSelectBox.children[i].value)) {
                colorSelectBox.children[i].style.display = '';
            }
            defaultColorOption.style.display = 'none';
            colorSelectBox.value = jsPunsColors[0];
        }
    } else if (designSelectBox.value === 'heart js') {
        removeColorOptions();
        for (let i = 0; i < colorSelectBox.children.length; i++) {
            if (heartJsColors.includes(colorSelectBox.children[i].value)) {
                colorSelectBox.children[i].style.display = '';
            }
        }
            defaultColorOption.style.display = 'none';
            colorSelectBox.value = heartJsColors[0];
    } else {
        removeColorOptions();
        colorSelectBox.value = defaultColorOption.value;
    }
});