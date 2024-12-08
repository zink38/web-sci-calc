import { Parser } from "https://cdn.jsdelivr.net/npm/expr-eval@2.0.2/+esm";

document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("calc-display");
  const entry = document.getElementById("calc-entry");
  const answer = document.getElementById("calc-answer");
  const buttons = document.getElementsByClassName("btn");
  let openBracketCount = 0;
  let emptyBracket = false;

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      if (buttons[i].innerText == "AC") {
        display.value = "";
        entry.value = "";
        answer.value = "";
        document.getElementById("close-bracket-btn").disabled = true;
        document.getElementById("equals-btn").disabled = false;
        openBracketCount = 0;
        emptyBracket = false;
      } else if (buttons[i].innerText == "CE") {
        entry.value = "";
      } else if (buttons[i].innerText == "=") {
        display.value += entry.value;
        entry.value = "";
        answer.value = evaluateExpression(display.value);
      } else if (buttons[i].classList.contains("operator")) {
        display.value += entry.value += buttons[i].innerText;
        entry.value = "";
      } else if (buttons[i].innerText == "(") {
        openBracketCount++;
        document.getElementById("equals-btn").disabled = true;
        document.getElementById("close-bracket-btn").disabled = false;
        if (entry.value != "") {
          display.value += entry.value + "*" + buttons[i].innerText;
        } else {
          display.value += buttons[i].innerText;
        }

        entry.value = "";
      } else if (buttons[i].innerText == ")") {
        openBracketCount--;
        if (openBracketCount == 0) {
          buttons[i].disabled = true;
          document.getElementById("equals-btn").disabled = false;
          document.getElementById("close-bracket-btn").disabled = true;
        }
        display.value += entry.value + buttons[i].innerText;
        entry.value = "";
      } else {
        
        entry.value += buttons[i].innerText;
      }
    });
  }
});

function evaluateExpression(expression) {
  try {
    const parser = new Parser();
    return parser.evaluate(expression);
  } catch (error) {
    return "Error";
  }
}
