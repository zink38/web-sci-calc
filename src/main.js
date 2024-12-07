import { Parser } from 'https://cdn.jsdelivr.net/npm/expr-eval@2.0.2/+esm';


document.addEventListener("DOMContentLoaded", function () {


  const display = document.getElementById("calc-display");
  const buttons = document.getElementsByClassName("btn");

  let currentValue = "";

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      if (buttons[i].innerText == "AC") {
        display.value = "";
      } else if (buttons[i].innerText == "=") {
        display.value = evaluateExpression(display.value);
      } else if (buttons[i].innerText == "X") {
        display.value += "*";
      } else if (buttons[i].innerText == "÷") {
        display.value += "/";
      } else {
        display.value += buttons[i].innerText;
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