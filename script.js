//acessing elements
const regexPattern = document.getElementById("pattern");
const stringToTest = document.getElementById("test-string");
const testButton = document.getElementById("test-btn");
const testResult = document.getElementById("result");

//return flags
function getFlags() {
  const caseInsensitiveFlag = document.getElementById("i");
  const globalFlags = document.getElementById("g");

  const iChecked = caseInsensitiveFlag.checked ? "i" : "";
  const gChecked = globalFlags.checked ? "g" : "";

  return iChecked + gChecked;
}

function getRegex(pattern) {
  const regex = new RegExp(`${pattern}`, `${getFlags()}`);
  return regex;
}

testButton.addEventListener("click", () => {
  const regex = getRegex(regexPattern.value);
  const string = stringToTest.value;
  const matched = string.match(regex);

  console.log(Array.from(matched));
});
