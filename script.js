//acessing elements
const regexPattern = document.getElementById("pattern");
const stringToTest = document.getElementById("test-string");
const testButton = document.getElementById("test-btn");
const testResult = document.getElementById("result");
const globalFlags = document.getElementById("g");

//return flags
function getFlags() {
  const caseInsensitiveFlag = document.getElementById("i");

  const iChecked = caseInsensitiveFlag.checked ? "i" : "";
  const gChecked = globalFlags.checked ? "g" : "";

  return iChecked + gChecked;
}

function getRegex(pattern) {
  const regex = new RegExp(`${pattern}`, `${getFlags()}`);
  return regex;
}

function getRegexMatch(regex, string) {
  const matched = string.match(regex);

  return globalFlags.checked ? matched.join(",") : matched[0];
}

function highlightText(text) {
  let highlight = "";
  let newText = "";
  const textArr = text.split("");

  for (letter of textArr) {
    if (getRegex(regexPattern.value).test(letter)) {
      highlight += letter;
      continue;
    } else {
      newText += `<span class="\highlight\">${highlight}</span>${letter}`;
      highlight = "";
      continue;
    }
  }
  console.log(newText);
  return newText;
}

testButton.addEventListener("click", () => {
  const pattern = getRegex(regexPattern.value);
  testResult.innerText = getRegexMatch(pattern, stringToTest.innerText);
  stringToTest.innerHTML = highlightText(stringToTest.innerText);
});
