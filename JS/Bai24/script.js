// Khởi tạo trạng thái máy tính
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

// Cập nhật màn hình hiển thị
function updateDisplay() {
    const display = document.querySelector('#display');
    display.textContent = calculator.displayValue;
}

// Xử lý khi nhấn nút số
function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

// Xử lý khi nhấn dấu thập phân
function inputDecimal() {
    if (!calculator.displayValue.includes('.')) {
        calculator.displayValue += '.';
    }
}

// Xử lý khi nhấn toán tử
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator, waitingForSecondOperand } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand == null) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation[operator](firstOperand, inputValue);
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

// Xử lý phép tính
const performCalculation = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => b !== 0 ? a / b : 'Error',
    modulo: (a, b) => a % b,
    exponentiation: (a, b) => Math.pow(a, b),
};

// Xóa toàn bộ trạng thái
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}

// Gắn sự kiện cho các nút
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) return;

    if (target.classList.contains('key-operator')) {
        handleOperator(target.dataset.action);
        updateDisplay();
        return;
    }

    if (target.classList.contains('key-decimal')) {
        inputDecimal();
        updateDisplay();
        return;
    }

    if (target.classList.contains('key-ac')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    if (target.classList.contains('key-equals')) {
        handleOperator('equals');
        updateDisplay();
        return;
    }

    inputDigit(target.dataset.value);
    updateDisplay();
});

// Hiển thị giá trị ban đầu
updateDisplay();