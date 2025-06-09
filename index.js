const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const historyList = document.getElementById("history-list");
let currentInput = "";

function updateDisplay() {
  display.textContent = currentInput || "0";
}

function addToHistory(expression, result) {
  const item = document.createElement("li");
  item.textContent = `${expression} = ${result}`;
  historyList.prepend(item);
}

function calculateResult() {
  try {
    const result = eval(currentInput);
    addToHistory(currentInput, result);
    currentInput = result.toString();
  } catch {
    currentInput = "Error";
  }
  updateDisplay();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.getAttribute("data-key");

    if (key !== null) {
      currentInput += key;
    } else if (button.id === "backspace") {
      currentInput = currentInput.slice(0, -1);
    } else if (button.id === "equal") {
      calculateResult();
      return;
    } else if (button.id === "clear") {
      currentInput = "";
    }

    updateDisplay();
  });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (
    (e.key >= "0" && e.key <= "9") ||
    ["+", "-", "*", "/", "%", ".", "(", ")"].includes(e.key)
  ) {
    currentInput += e.key;
  } else if (e.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
  } else if (e.key === "Enter" || e.key === "=") {
    calculateResult();
    return;
  }
  updateDisplay();
});

updateDisplay();
