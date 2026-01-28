import './styles/main.css';
import { Calculator } from './modules/Calculator.js';
import { CalculatorDisplay } from './modules/CalculatorDisplay.js';
import { KeyboardHandler } from './modules/KeyboardHandler.js';
import { DragHandler } from './modules/DragHandler.js';

/**
 * Initialize the calculator application
 * This is the entry point that wires up all modules
 */
function initApp() {
    // Get DOM elements
    const displayElement = document.getElementById('display');
    const calculatorElement = document.querySelector('.calculator');

    if (!displayElement || !calculatorElement) {
        console.error('Required DOM elements not found');
        return;
    }

    // Create calculator instance (pure logic, no DOM)
    const calculator = new Calculator();

    // Create display handler (connects calculator to DOM)
    const calculatorDisplay = new CalculatorDisplay(displayElement, calculator);

    // Setup keyboard handler
    new KeyboardHandler(calculatorDisplay);

    // Setup drag handler
    new DragHandler(calculatorElement);

    // Setup button click handlers
    setupButtonHandlers(calculatorDisplay);

    console.log('Calculator initialized successfully');
}

/**
 * Setup all button click event handlers
 * @param {CalculatorDisplay} calculatorDisplay - The calculator display instance
 */
function setupButtonHandlers(calculatorDisplay) {
    // Number buttons
    document.querySelectorAll('[data-number]').forEach(button => {
        button.addEventListener('click', () => {
            calculatorDisplay.handleNumberClick(button.dataset.number);
        });
    });

    // Operation buttons
    document.querySelectorAll('[data-operation]').forEach(button => {
        button.addEventListener('click', () => {
            calculatorDisplay.handleOperationClick(button.dataset.operation);
        });
    });

    // Equals button
    const equalsButton = document.getElementById('equals');
    if (equalsButton) {
        equalsButton.addEventListener('click', () => {
            calculatorDisplay.handleEqualsClick();
        });
    }

    // Clear button
    const clearButton = document.getElementById('clear');
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            calculatorDisplay.handleClearClick();
        });
    }

    // Delete button
    const deleteButton = document.getElementById('delete');
    if (deleteButton) {
        deleteButton.addEventListener('click', () => {
            calculatorDisplay.handleDeleteClick();
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
