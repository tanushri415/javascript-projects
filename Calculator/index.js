function addToDisplay(value) {
  document.getElementsByName('display')[0].value += value;
}

function clearDisplay() {
  document.getElementsByName('display')[0].value = '';
}

function deleteLastEntry() {
  var currentDisplay = document.getElementsByName('display')[0].value;
  document.getElementsByName('display')[0].value = currentDisplay.slice(0, -1);
}

function calculateDisplay() {
  var currentDisplay = document.getElementsByName('display')[0].value;
  var result = eval(currentDisplay);
  document.getElementsByName('display')[0].value = result;
}
