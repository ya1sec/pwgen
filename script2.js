// DOM elements
const resultElement = document.getElementById("result");
const lengthElement = document.getElementById("length");
const uppercaseElement = document.getElementById("uppercase");
const lowercaseElement = document.getElementById("lowercase");
const numberElement = document.getElementById("number");
const specialElement = document.getElementById("special");
const generateElement = document.getElementById("generate");
const clipboardElement = document.getElementById("clipboard");

const randomizer = {
  lower: randomLower,
  upper: randomUpper,
  number: randomNumber,
  special: randomSpecial,
};

// Generate password button event listener
generateElement.addEventListener("click", () => {
  const length = +lengthElement.value;
  const hasLower = lowercaseElement.checked;
  const hasUpper = uppercaseElement.checked;
  const hasNumber = numberElement.checked;
  const hasSpecial = specialElement.checked;

  resultElement.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSpecial,
    length
  );
});

// Copy password to clipboard

clipboardElement.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultElement.innerText;

  //if no password, return
  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard.");
});

// Password generator function
function generatePassword(lower, upper, number, special, length) {
  // filter out unchecked types

  // give pw var a value from final result and return it to resultElement
  let generatedPassword = "";

  // count the checked boxes
  const typesCount = lower + upper + number + special;

  //   console.log("typesCount: ", typesCount);

  // filter through checkboxes and remove false values
  const typesArr = [{ lower }, { upper }, { number }, { special }].filter(
    (item) => Object.values(item)[0]
  );

  // console.log("typesArr: ", typesArr);

  // if no boxes are checked, return "please enter requirements"
  if (typesCount === 0) {
    return "please enter requirements";
  }

  // loop over length, call generator function for each type
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];

      generatedPassword += randomizer[funcName]();
    });
  }
  // give variable finalPassword a value by extracting a string from the generated password
  const finalPassword = generatedPassword.slice(0, length);
  // give pw var a value from final result and return it to resultElement
  return finalPassword;
}

// Random generator functions using javascript browser character set - http://www.net-comber.com/charset.html

// Generate a random lowercase letter using codes 97-122 as a range
function randomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// Generate a random uppercase letter using codes 65-90 as a range
function randomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// Generate a random number between 0-9 (as a string) using codes 48-57 as a range
function randomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// Generate a random special character from string of possible values
function randomSpecial() {
  const special = "!@#$%^&*(){}[]=<>/,.";
  return special[Math.floor(Math.random() * special.length)];
}

// console.log(randomLower());
// console.log(randomUpper());
// console.log(randomNumber());
// console.log(randomSpecial());
