document.addEventListener('DOMContentLoaded', function () {
    const calculator = document.getElementById('calculator').getElementsByClassName('row')[0];
    const resultInput = document.getElementById('result');
    const buttons = [
        { text: 'C', class: 'btn-danger' },
        { text: '<-', class: 'btn-secondary' },
        { text: '.', class: 'btn-secondary' },
        { text: '×', class: 'btn-info op' },
        { text: '7', class: 'btn-light' },
        { text: '8', class: 'btn-light' },
        { text: '9', class: 'btn-light' },
        { text: '/', class: 'btn-info op' },
        { text: '4', class: 'btn-light' },
        { text: '5', class: 'btn-light' },
        { text: '6', class: 'btn-light' },
        { text: '-', class: 'btn-info op' },
        { text: '1', class: 'btn-light' },
        { text: '2', class: 'btn-light' },
        { text: '3', class: 'btn-light' },
        { text: '+', class: 'btn-info op' },
        { text: '0', class: 'btn-light double' },
        { text: '00', class: 'btn-light double' },
        { text: '=', class: 'btn-primary equal' }
    ];

    buttons.forEach(function (button) {
        let buttonElement = document.createElement('button');
        buttonElement.textContent = button.text;
        buttonElement.className = `btn ${button.class} calc-button`;
        buttonElement.onclick = function () { onButtonClick(button.text); };
        let div = document.createElement('div');
        div.className = `col ${button.double ? 'col-6' : 'col-3'}`;
        div.appendChild(buttonElement);
        calculator.appendChild(div);
    });

    function onButtonClick(value) {
        if (value === 'C') {
            resultInput.value = '0';
        } else if (value === '<-') {
            resultInput.value = resultInput.value.slice(0, -1) || '0';
        } else if (value === '=') {
            try {
                let result = eval(resultInput.value.replace('×', '*').replace('--', '+'));
                resultInput.value = result;
            } catch (e) {
                alert('Invalid expression');
            }
        } else {
            if (resultInput.value === '0') {
                resultInput.value = value !== '.' ? value : '0.';
            } else {
                resultInput.value += value;
            }
        }
    }

    function simulateButtonClick(key) {
        let buttonValue = null;

        switch (key) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '+':
            case '-':
            case '*':
            case '/':
            case '.':
                buttonValue = key;
                break;
            case 'Enter':
            case '=':
                buttonValue = '=';
                break;
            case 'Backspace':
                buttonValue = '<-';
                break;
            case 'Escape':
                buttonValue = 'C';
                break;
            default:
                return;
        }

        onButtonClick(buttonValue.replace('*', '×'));
    }

    // Keyboard event listener
    document.addEventListener('keydown', function (event) {
        simulateButtonClick(event.key);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            simulateButtonClick('Enter');
        }
    });
});
