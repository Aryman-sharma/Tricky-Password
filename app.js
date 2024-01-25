
const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-length-container]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector(".display-container button");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("lowercase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "  ";
let passwordLength = 10;
let checkCount = 1;

handleSlider();

// set slider
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
}

function setIndicator(color) {
  indicator.style.backgroundColor = color;
}

function getrandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
  return getrandomInteger(0, 9);
}

function generateLowercase() {
  return String.fromCharCode(getrandomInteger(97, 123));
}

function generateUppercase() {
  return String.fromCharCode(getrandomInteger(65, 91));
}

function generateSymbol() {
  const randomNUM = getrandomInteger(0, symbols.length);
  return symbols.charAt(randomNUM);
}

function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;
  if (uppercaseCheck.checked) hasUpper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (numbersCheck.checked) hasNum = true;
  if (symbolsCheck.checked) hasSym = true;

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    // this returns a promise which can be either resolved or give an error
    copyMsg.innerText = "copied";
  } catch (error) {
    copyMsg.innerText = "failed";
  }
  // To make copy wala span visible
  copyMsg.classList.add("active");

  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});

copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) copyContent();
});

function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) checkCount++;
  });

  //special condition
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}

allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});

// SHUFFLE YATES METHOD // algorithm
// we can shuffle any array

function shufflepassword(array) {
  for (let i = array.length - 1; i > 0; i--) {
    //random J, find out using the random function
    const j = Math.floor(Math.random() * (i + 1));
    //swap number at i index and j index
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

generateBtn.addEventListener("click", () => {
  // none of the checkboxes are selected
  if (checkCount <= 0) return;

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

  password = "";

  let funcArr = [];
  if (uppercaseCheck.checked) funcArr.push(generateUppercase);
  if (lowercaseCheck.checked) funcArr.push(generateLowercase);
  if (numbersCheck.checked) funcArr.push(generateRandomNumber);
  if (symbolsCheck.checked) funcArr.push(generateSymbol);

  // compulsory addition
  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }

  // remaining addition
  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let rangeIndex = getrandomInteger(0, funcArr.length);
    password += funcArr[rangeIndex]();
  }

  // shuffle the password
  password = shufflepassword(Array.from(password));

  // show it on UI
  passwordDisplay.value = password;

  // calcStrength()
  calcStrength();
});
