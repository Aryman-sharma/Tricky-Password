const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-length-container]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 1;

handleSlider();

// set slider
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
}

function setIndicator(color)
{
    indicator.style.backgroundColor = color;
}

function getrandomInteger(min,max)
{
  return  Math.floor(Math.random()*(max-min)) + min;

} 

function generateRandomNumber()
{
 return getrandomInteger(0,9);
}

function generateLowercase()
{
 return String.fromChar(getrandomInteger(97,123));
}

function generateUppercase()
{
 return String.fromChar(getrandomInteger(65,91));
}

function generateSymbol()
{
    const randomNUM = getrandomInteger(0,symbols.length);
    return symbols.charAt(randomNUM);
}
function calcStrength()
{
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

async function copyContent()
{  
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
    // this returns a promise which can be either resloved or give an error 
     copyMsg.innerText="copied";
    }
    catch(error)
    {
      copyMsg.innerText="failed";
    }
    // To make copy wala span visible
    copyMsg.classList.add("active");
    
    setTimeout(() =>
    {
        copyMsg.classList.remove("active");
    },2000);

}
inputSlider.addEventListener('input',(e)=>
{
    passwordLength=e.target.value;
    handleSlider();
});

copyBtn.addEventListener('click',()=>
{
    if(passwordDisplay.value)
    copyContent();
});

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    //special condition
    if(passwordLength < checkCount ) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})



generateBtn.addEventListener('click',()=>{

    // none of the checkbox are selected
    
    if(checkCount <=0) return;

    if(passwordLength < checkCount)
    {
        passwordLength = checkCount;
        handleSlider();
    }

 password="" ;
 
//  if(uppercaseCheck.checked)
//  {
//     password+=generateUpperCase();
//  }
//  if(lowercaseCheck.checked)
//  {
//     password+=generatellowerCase();
//  }
//  if(numbersCheck.checked)
//  {
//     password+=generateRandomNumber();
//  }
//  if(symbolsCheck.checked)
//  {
//     password+=generateSymbol();
//  }

let funcArr=[];






});


