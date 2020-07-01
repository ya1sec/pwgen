// Generator functions using javascript browser character set - http://www.net-comber.com/charset.html

// lower case letter codes range from 97-122
function randomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// upper case letter codes range from 65-90
function randomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

console.log(randomLower());
console.log(randomUpper());
