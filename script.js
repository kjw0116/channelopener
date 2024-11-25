const buttons = document.querySelectorAll('.item-button');
const itemList = document.getElementById('item-list');
const elementalButtons = document.querySelectorAll('.elemental-button');
const elementalResults = document.getElementById('elemental-results');

const buttonStates = new Map();



// Variable to keep track of the currently active (blue) button
let activeButton = null;

// Function to handle the button click
function handleButtonClick(button, formatType) {
  // If there's an active button (currently blue), remove the blue class
  if (activeButton && activeButton !== button) {
    activeButton.classList.remove('blue');
    elementalResults.innerHTML = ''; // Clear the result when removing the blue class
  }

  // Clear previous results
  elementalResults.innerHTML = '';

  // Create formatted content based on the button class
  if (formatType === 'ether' || formatType === 'earth') {
    const content = `
      <div>
        • L-HT7, R-KD3, R-SI8, L-LIV8, L-ST36, R-GB41
      </div>
      <div>
          ** BACK HT /FRONT LUNG
      </div>
      <div>
          ** FRONT KD (Umbilicus)
      </div>
      <div>
        • R-HT7, L-KD3, L-SI8, R-LIV8, R-ST36, L-GB41
      </div>
      <div>
          ** BACK SI / BACK LU
      </div>
      <div>
          ** FRONT HT
      </div>
      <div>
          ** BACK KD
      </div>
    `;
    elementalResults.innerHTML = content;
  } else if (formatType === 'fire') {
    const content = `
      <div>
        • L-HT7, R-KD3, L-ST36, R-GB41, R-SI8, L-LIV8
      </div>
      <div>
        • <button class="sub-item-button" data-items="R-PC7, R-GB40, L-LIV3, R-BL40, L-LU5, R-SP9">LU(BACK) LI(FRONT)</button>
      </div>
      <div>
        • <button class="sub-item-button" data-items="R-LU9, L-LI4, L-SP3, R-GB34">LIV(FRONT) GB(BACK)</button>
      </div>
    `;
    elementalResults.innerHTML = content;
    setupSubItemButtons();
  } else if (formatType === 'water') {
    const content = `
      <div>
        • R-HT7, L-KD3, R-ST36, L-GB41, L-SI8, R-LIV8
      </div>
      <div>
        • <button class="sub-item-button" data-items="L-LU9, R-LI4, R-SP3, L-GB34">LV(BACK) GB(FRONT)</button>
      </div>
      <div>
        • <button class="sub-item-button" data-items="L-PC7, L-GB40, R-LIV3, L-BL40, R-LU5, L-SP9">LU(FRONT) LI(BACK)</button>
      </div>
    `;
    elementalResults.innerHTML = content;
    setupSubItemButtons();
  } else if (formatType === 'metal') {
    const content = `
      <div>
        • R-HT7, L-KD3, R-ST36, L-GB41, L-SI8, R-LIV8
      </div>
      <div>
        • <button class="sub-item-button" data-items="L-LU9, R-LI4, R-SP3, L-GB34">HT(BACK) SI(FRONT)</button>
      </div>
      <div>
        • <button class="sub-item-button" data-items="L-PC7, L-GB40, R-LIV3, L-BL40, R-LU5, L-SP9">KD(FRONT) BL(BACK)</button>
      </div>
    `;
    elementalResults.innerHTML = content;
    setupSubItemButtons();
  } else if (formatType === 'wood') {
    const content = `
      <div>
        • L-HT7, R-KD3, L-ST36, R-GB41, R-SI8, L-LIV8 
      </div>
      <div>
        • <button class="sub-item-button" data-items="R-PC7, R-GB40, L-LIV3, R-BL40, L-LU5, R-SP9 
"> KD(BACK) BL(FRONT)
</button>
      </div>
      <div>
        • <button class="sub-item-button" data-items="R-LU9, L-LI4, L-SP3, R-GB34">HT(FRONT) SI(BACK)</button>
      </div>
    `;
    elementalResults.innerHTML = content;
    setupSubItemButtons();
  }

  // Toggle the button color between blue and default
  if (button.classList.contains('blue')) {
    button.classList.remove('blue'); // If it's already blue, remove the blue class
    elementalResults.innerHTML = ''; // Clear the results when reverting to default
    activeButton = null; // Reset the active button when it turns back to default
  } else {
    button.classList.add('blue'); // Add the 'blue' class to change color
    activeButton = button; // Set this button as the active (blue) button
  }
}

// Function to handle sub-item button clicks
function setupSubItemButtons() {
  document.querySelectorAll('.sub-item-button').forEach(subButton => {
    subButton.addEventListener('click', () => {
      const items = subButton.getAttribute('data-items').split(',').map(item => item.trim());
      const subList = `
        <div>
          <ul>
            ${items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      `;
      subButton.insertAdjacentHTML('afterend', subList);
      subButton.disabled = true; // Disable the button after clicking
    });
  });
}

// List of formats for each button class
const buttonFormats = {
  'ether': 'ether',
  'earth': 'earth',
  'fire': 'fire',
  'water': 'water',
  'metal': 'metal',
  'wood':'wood'
};

// Add event listener for all buttons
elementalButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Check if the button matches a known format
    Object.keys(buttonFormats).forEach(className => {
      if (button.classList.contains(className)) {
        // Call the handleButtonClick function with the appropriate format type
        handleButtonClick(button, buttonFormats[className]);
      }
    });
  });
});




function showResult(){
  Document.createElement('li');
  

}
document.getElementById('reset-button').addEventListener('click', resetButtons);
  

document.querySelectorAll('.item-button').forEach(button => {
  buttonStates.set(button, 'default'); // Initialize all buttons to the default state

  button.addEventListener('click', () => {
    const currentState = buttonStates.get(button);
    

    if (currentState === 'default') {
      buttonStates.set(button, 'blue');
      button.classList.add('blue');
      button.classList.remove('red');
    } else if (currentState === 'blue') {
      buttonStates.set(button, 'red');
      button.classList.add('red');
      button.classList.remove('blue');
    } else {
      buttonStates.set(button, 'default');
      button.classList.remove('red', 'blue');
    }

    updateResults();
  });
});

// Related items mapping
const relatedItemsMap = {
  "R-LU5(Magic 8ers)": ["R-ST43","R-BL67",
                        "L-LU11","L-PC7","L-BL40"
  ],
  "L-LU5(Magic 8ers)": [ "L-ST43","L-BL67",
                        "R-LU11","R-PC7","R-BL40"],

  "R-LI1(Magic 8ers)": ["R-TW3","R-KD10",
                        "L-KD1","L-SP3","L-LI11"
  ],
  "L-LI1(Magic 8ers)": ["L-TW3","L-KD10",
                        "R-KD1","R-SP3","R-LI11"],

  "R-BL67(Magic 8ers)": ["R-ST43","R-LU5",
                          "L-LU11","L-PC7","L-BL40"
  ],
  "L-BL67(Magic 8ers)": ["L-ST43","L-LU5",
                          "R-LU11","R-PC7","R-BL40"
  ],

  "R-KD10(Magic 8ers)": ["R-LI1","R-TW3",
    "L-KD1","L-SP3","L-LI11"],
  "L-KD10(Magic 8ers)": ["L-LI1","L-TW3",
                        "R-KD1","R-SP3","R-LI11"],

  "R-ST45(Magic 8ers)": ["R-GB41","R-PC3","L-PC9","L-HT7","L-ST36"],
  "L-ST45(Magic 8ers)": ["L-GB41","L-PC3","R-PC9","R-HT7","R-ST36"],

  "R-SP9(Magic 8ers)": ["R-TW1","R-SI3","L-SP1","L-LIV3","L-TW10"],
  "L-SP9(Magic 8ers)": ["L-TW1","L-SI3","R-SP1","R-LIV3","R-TW10"],

  "R-PC3(Magic 8ers)": ["R-ST45","R-GB41","L-PC9","L-HT7","L-ST36"],
  "L-PC3(Magic 8ers)": ["L-ST45","L-GB41","R-PC9","R-HT7","R-ST36"],

  "R-TW1(Magic 8ers)": ["R-SI3","R-SP9","L-SP1","L-LIV3","L-TW10"],
  "L-TW1(Magic 8ers)": ["L-SI3","L-SP9","R-SP1","R-LIV3","R-TW10"],

  "R-HT3(Magic 8ers)": ["R-GB44","R-BL65","L-HT9","L-LU9","L-GB34"],
  "L-HT3(Magic 8ers)": ["L-GB44","L-BL65","R-HT9","R-LU9","R-GB34"],

  "R-SI1(Magic 8ers)": ["R-SI3","R-LIV8","L-LIV1","L-KD3","L-SI8"],
  "L-SI1(Magic 8ers)": ["L-SI3","L-LIV8","R-LIV1","R-KD3","R-SI8"],

  "R-GB44(Magic 8ers)": ["R-GB44","R-BL65","R-HT3","L-HT9","L-LU9","L-GB34"],
  "L-GB44(Magic 8ers)": ["L-GB44","L-BL65","L-HT3","R-HT9","R-LU9","R-GB34"],

  "R-LIV8(Magic 8ers)": ["R-SI1","R-SI3","L-LIV1","L-KD3","L-SI8"],
  "L-LIV8(Magic 8ers)": ["L-SI1","L-SI3","R-LIV1","R-KD3","R-SI8"],




};





function updateResults() {
  const redButtons = Array.from(buttonStates.entries())
    .filter(([button, state]) => state === 'red')
    .map(([button]) => button);

  const commonItems = getCommonItems(redButtons);

  const itemList = document.getElementById('item-list');
  itemList.innerHTML = ''; // Clear previous results

  // Display common items in red buttons
  if (commonItems.length > 0) {
    const header = document.createElement('li');
    header.textContent = 'Common Items in Red Buttons:';
    header.style.fontWeight = 'bold';
    itemList.appendChild(header);

    commonItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      itemList.appendChild(li);
    });
  }

  // Find related items
  const appendedItems = [];
  commonItems.forEach(item => {
    if (relatedItemsMap[item]) {
      appendedItems.push(...relatedItemsMap[item]);
    }
  });

  // Display related items in blue
  if (appendedItems.length > 0) {
    const relatedHeader = document.createElement('li');
    relatedHeader.textContent = 'Related Items:';
    relatedHeader.style.fontWeight = 'bold';
    itemList.appendChild(relatedHeader);

    appendedItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      li.classList.add('blue-item'); // Add the blue-item class for styling
      itemList.appendChild(li);
    });
  }
}

function getCommonItems(buttons) {
  if (buttons.length === 0) return [];

  const itemSets = buttons.map(button =>
    new Set(button.getAttribute('data-items').split(',').map(item => item.trim()))
  );

  // Find common items
  return Array.from(
    itemSets.reduce((commonSet, currentSet) => {
      return new Set([...commonSet].filter(item => currentSet.has(item)));
    })
  );
}

function resetButtons() {
  buttons.forEach(button => {
    buttonStates.set(button, 'default'); // Reset state in the map
    button.classList.remove('red', 'blue'); // Remove all state-specific classes
  });
  itemList.innerHTML = ''; // Clear the displayed items list
}





// // List of items for each button class
// const buttonItems = {
//   'ether': [
//     'L-HT7', 'R-KD3', 'R-SI8', 'L-LIV8', 'L-ST36', 'R-GB41',
//     'BACK HT /FRONT LUNG',
//     'FRONT KD (Umbilicus)',
//     'R-HT7', 'L-KD3', 'L-SI8', 'R-LIV8', 'R-ST36', 'L-GB41',
//     'BACK SI / BACK LU',
//     'FRONT HT',
//     'BACK KD'
//   ],
//   'earth': [
//     'L-HT7', 'R-KD3', 'R-SI8', 'L-LIV8', 'L-ST36', 'R-GB41',
//     'BACK HT /FRONT LUNG',
//     'FRONT KD (Umbilicus)',
//     'R-HT7', 'L-KD3', 'L-SI8', 'R-LIV8', 'R-ST36', 'L-GB41',
//     'BACK SI / BACK LU',
//     'FRONT HT',
//     'BACK KD'
//   ],
//   'fire': [
//     'L-HT7', 'R-KD3', 'L-ST36', 'R-GB41', 'R-SI8', 'L-LIV8',
//     'LU(BACK)', 'LI(FRONT)',
//     'LIV(FRONT)', 'GB(BACK)'
//   ],
//   'water': [
//     'R-HT7', 'L-KD3', 'R-ST36', 'L-GB41', 'L-SI8', 'R-LIV8',
//     'LV(BACK)', 'GB(FRONT)',
//     'LU(FRONT)', 'LI(BACK)'
//   ],
//   'wood': [
//     'R-HT7', 'L-KD3', 'R-ST36', 'L-GB41', 'L-SI8', 'R-LIV8',
//     'HT(BACK)', 'SI(FRONT)',
//     'KD(FRONT)', 'BL(BACK)'
//   ],
//   'metal': [
//     'L-HT7', 'R-KD3', 'L-ST36', 'R-GB41', 'R-SI8', 'L-LIV8',
//     'KD(BACK)', 'BL(FRONT)',
//     'HT(FRONT)', 'SI(BACK)'
//   ]
// };
