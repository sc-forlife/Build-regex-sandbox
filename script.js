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

function getRegexMatch(string) {
  const regex = new RegExp(`${regexPattern.value}`, `${getFlags()}`);
  const matched = string.match(regex);

  if (matched === null) {
    return "no match";
  }
  console.log(matched);
  return globalFlag.checked ? matched : [...matched[0]];
}

function highlightText(userString) {
  const matchedString = getRegexMatch(stringToTest.innerText);

  if (matchedString === null) return userString;

  console.log(matchedString);

  let highlight;
  let newWord = userString;

  for (const matched of matchedString) {
    highlight = matched.replace(
      matched,
      `<span class=\"highlight\">${matched}</span>`,
    );
    if (newWord.includes(highlight)) {
      continue;
    } else {
      if (globalFlag.checked) {
        newWord = newWord.replaceAll(matched, highlight);
      } else {
        newWord = newWord.replace(matched, highlight);
      }
    }
  }

  return newWord;
}

testButton.addEventListener("click", () => {
  testResult.textContent = getRegexMatch(stringToTest.innerText).join(", ");

  console.log(highlightText(stringToTest.innerText));

  stringToTest.innerHTML = highlightText(stringToTest.innerText);
});
