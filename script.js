//acessing elements
const regexPattern = document.getElementById("pattern");
const stringToTest = document.getElementById("test-string");
const testButton = document.getElementById("test-btn");
const testResult = document.getElementById("result");
const globalFlag = document.getElementById("g");
const caseInsensitiveFlag = document.getElementById("i");

//return flags
function getFlags() {
  let flags = "";

  flags += caseInsensitiveFlag.checked ? "i" : "";
  flags += globalFlag.checked ? "g" : "";

  return flags;
}

function getExp() {
  const regex = new RegExp(`${regexPattern.value}`, `${getFlags()}`);
  return regex;
}

function getRegexMatch(string) {
  const regex = getExp();
  const matched = string.match(regex);

  if (matched === null) {
    return "no match";
  }
  console.log(matched);
  return globalFlag.checked ? matched.join(", ") : matched[0];
}

function highlightText(userString) {
  const regex = getExp();

  const newWord = userString.replace(regex, (matched) => {
    return `<span class=\"highlight\">${matched}</span>`;
  });

  return newWord;
}

testButton.addEventListener("click", () => {
  testResult.textContent = getRegexMatch(stringToTest.innerText);

  console.log(highlightText(stringToTest.innerText));

  stringToTest.innerHTML = highlightText(stringToTest.innerText);
});
