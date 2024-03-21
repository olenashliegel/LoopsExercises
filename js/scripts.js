function resetResultDiv() {
  document.querySelector("div#result").innerHTML = "";
  document.querySelector("div#result").setAttribute("class", "hidden");

}

function handleWOrdPlayLogic(e) {
  e.preventDefault();
  resetResultDiv();
  const userSentence = document.querySelector("form#wordPlay textarea").value.trim();
  const userArray = userSentence.split(" ");
  const newArray = [];
  userArray.forEach(function (element) {
    if (element.length >= 3) {
      newArray.push(element);
    }
  });

  const reversedArray = newArray.reverse();
  let resultString = reversedArray.join(" ");
  const resultP = document.createElement("p");
  resultP.append(resultString);
  document.querySelector("div#result").append(resultP);
  document.querySelector("div#result").classList.remove("hidden");
}

function showTheWOrdPlayForm() {
  resetResultDiv();
  document.querySelector("div#wordPlayDiv").classList.remove("hidden");
  document.querySelector("div#groceriesDiv").classList.add("hidden");
  document.querySelector("div#wordOrder").classList.add("hidden");
}

function buildADeck() {
  resetResultDiv();
  document.querySelector("div#wordPlayDiv").classList.add("hidden");
  document.querySelector("div#groceriesDiv").classList.add("hidden");
  document.querySelector("div#wordOrder").classList.add("hidden");
  const suits = ["clubs", "diamonds", "hearts", "spades"];
  const cards = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
  const ul = document.createElement("ul");
  document.querySelector("div#result").append(ul);
  suits.forEach(function (suit) {
    cards.forEach(function (card) {
      const li = document.createElement("li");
      li.append(card + " of " + suit);
      ul.append(li);
    });
  });
  document.querySelector("div#result").classList.remove("hidden");
}

function showGroceriesForm() {
  resetResultDiv();
  document.querySelector("div#groceriesDiv").classList.remove("hidden");
  document.querySelector("div#wordPlayDiv").classList.add("hidden");
  document.querySelector("div#wordOrder").classList.add("hidden");
}

function handleGroceriesLogic(e) {
  e.preventDefault();
  resetResultDiv();
  document.querySelector("div#groceriesDiv").classList.add("hidden");
  document.querySelector("div#result").classList.remove("hidden");
  const userSelection = document.querySelectorAll("input[name=shoppingGoods]:checked");
  const userOther = document.querySelector("input#other").value;
  const userSelectionArray = Array.from(userSelection);
  const userOtherArray = userOther.split(" ");
  const userOtherArrayWithoutSpaces = [];
  userOtherArray.forEach(function (element) {
    if ((element !== null) && (element !== "")) {
      userOtherArrayWithoutSpaces.push(element);
    };
  });
  const userSelectionArrayValues = [];
  userSelectionArray.forEach(function (element) {
    userSelectionArrayValues.push(element.value);
  });
  const unionArray = userSelectionArrayValues.concat(userOtherArrayWithoutSpaces);
  unionArray.sort();
  const upperCasedArray = [];
  unionArray.forEach(function (element) {
    upperCasedArray.push(element.toUpperCase());
  });
  const ul = document.createElement("ul");
  document.querySelector("div#result").append(ul);
  upperCasedArray.forEach(function (element) {
    const li = document.createElement("li");
    li.append(element);
    ul.append(li);
  });
  const backButton = document.createElement("button");
  backButton.setAttribute("type", "button");
  backButton.textContent = "Back";
  document.querySelector("div#result").append(backButton);
  backButton.addEventListener("click", function () {
    document.querySelector("div#groceriesDiv").classList.remove("hidden");
    document.querySelector("div#result").classList.add("hidden");
  });
}

function showWordOrderForm() {
  resetResultDiv();
  document.querySelector("div#groceriesDiv").classList.add("hidden");
  document.querySelector("div#wordPlayDiv").classList.add("hidden");
  document.querySelector("div#wordOrder").classList.remove("hidden");
}

function handleWordOrderLogic(e) {
  e.preventDefault();
  resetResultDiv();
  const userString = document.querySelector("form#wordOrderForm textarea").value.trim().toLowerCase();
  const userArray = userString.split(" ");
  const userArrayWithoutSpaces = [];
  userArray.forEach(function (element) {
    if ((element !== null) && (element !== "")) {
      userArrayWithoutSpaces.push(element);
    }
  });

  const resultArray = [];
  userArrayWithoutSpaces.forEach(function (element) {
    let wordFound = false;
    resultArray.forEach(function (resultElement) {
      if (element === resultElement[0]) {
        resultElement[1] += 1;
        wordFound = true;
      }
    });
    if (!wordFound) {
      resultArray.push([element, 1]);
    }
  });

  resultArray.sort((a, b) => b[1] - a[1]);

  document.querySelector("div#result").classList.remove("hidden");
  const ul = document.createElement("ul");
  document.querySelector("div#result").append(ul);
  resultArray.forEach(function (element) {
    const li = document.createElement("li");
    li.style.listStyleType = 'none';
    li.append("- " + element[0] + " " + element[1]);
    ul.append(li);
  });


}

window.addEventListener("load", function () {
  document.querySelector("form#wordPlay").addEventListener("submit", handleWOrdPlayLogic);
  document.querySelector("form#groceries").addEventListener("submit", handleGroceriesLogic);
  document.querySelector("form#wordOrderForm").addEventListener("submit", handleWordOrderLogic);
  document.querySelector("button#buildADeckButton").addEventListener("click", buildADeck);
  document.querySelector("button#wordPlayButton").addEventListener("click", showTheWOrdPlayForm);
  document.querySelector("button#groceriesButton").addEventListener("click", showGroceriesForm);
  document.querySelector("button#wordOrderButton").addEventListener("click", showWordOrderForm);
});