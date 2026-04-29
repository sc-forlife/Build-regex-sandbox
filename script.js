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

function getRegex(pattern) {
  const regex = new RegExp(`${pattern}`, `${getFlags()}`);
  return regex;
}

function getRegexMatch(regex, string) {
  const matched = string.match(regex);

  if (matched === null) {
    return "no match";
  }

  return globalFlag.checked ? matched.join(", ") : matched[0];
}

function highlightText(userString) {
  let highlight = "";
  let newWord = "";

  if (!globalFlag.checked) {
    for (const letter of userString) {
      if (getRegex(regexPattern.value).test(letter)) {
        newWord = userString.replace(
          letter,
          `<span class=\"highlight\">${letter}</span>`,
        );
        return newWord;
      }
    }
  }

  for (const letter of userString) {
    if (getRegex(regexPattern.value).test(letter)) {
      highlight += letter;
    } else {
      newWord += highlight
        ? `<span class=\"highlight\">${highlight}</span>${letter}`
        : letter;
      highlight = "";
    }
  }

  if (highlight) {
    newWord += `<span class=\"highlight\">${highlight}</span>`;
    highlight = "";
  }

  return newWord;
}

testButton.addEventListener("click", () => {
  const pattern = getRegex(regexPattern.value);
  testResult.textContent = getRegexMatch(pattern, stringToTest.innerText);
  console.log(highlightText(stringToTest.innerText));
  stringToTest.innerHTML = highlightText(stringToTest.innerText);
});
