import { Calculator } from './Calculator.js';

/**
 * CalculatorDisplay - Handles the visual representation and DOM updates
 * Connects calculator logic to the user interface
 */
export class CalculatorDisplay {
    /**
     * @param {HTMLElement} displayElement - The DOM element to display the calculator state
     * @param {Calculator} calculator - The calculator instance
     */
    constructor(displayElement, calculator) {
        this.displayElement = displayElement;
        this.calculator = calculator;
        this.updateDisplay();
    }

    /**
     * Update the display based on current calculator state
     */
    updateDisplay() {
        const state = this.calculator.getDisplayState();
        let displayText = '';
        
        if (state.previousOperand !== '' && state.operation) {
            // Only show the second operand if user has started typing it
            if (state.currentOperand !== '') {
                displayText = `${Calculator.formatNumber(state.previousOperand)} ${state.operation} ${Calculator.formatNumber(state.currentOperand)}`;
            } else {
                displayText = `${Calculator.formatNumber(state.previousOperand)} ${state.operation}`;
            }
        } else if (state.currentOperand !== '') {
            displayText = Calculator.formatNumber(state.currentOperand);
        } else {
            displayText = '0';
        }
        
        this.displayElement.textContent = displayText;
    }

    /**
     * Handle number button clicks
     * @param {string} number - The number to append
     */
    handleNumberClick(number) {
        this.calculator.appendNumber(number);
        this.updateDisplay();
    }

    /**
     * Handle operation button clicks
     * @param {string} operation - The operation to perform
     */
    handleOperationClick(operation) {
        this.calculator.chooseOperation(operation);
        this.updateDisplay();
    }

    /**
     * Handle equals button click
     */
    handleEqualsClick() {
        try {
            this.calculator.compute();
            this.updateDisplay();
        } catch (error) {
            alert(error.message);
        }
    }

    /**
     * Handle clear button click
     */
    handleClearClick() {
        this.calculator.clear();
        this.updateDisplay();
    }

    /**
     * Handle delete button click
     */
    handleDeleteClick() {
        this.calculator.delete();
        this.updateDisplay();
    }
}
