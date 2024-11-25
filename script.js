const buttons = document.querySelectorAll('.item-button');
const itemList = document.getElementById('item-list');

const buttonStates = new Map();

document.getElementById('reset-button').addEventListener('click', resetButtons);
  

document.querySelectorAll('.item-button').forEach(button => {
  buttonStates.set(button, 'default'); // Initialize all buttons to the default state

  button.addEventListener('click', () => {
    const currentState = buttonStates.get(button);
    console.log('clicked')

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

