/**
 * Calculator - Pure calculation logic with no DOM dependencies
 * This class can be tested independently and used in any context
 */
export class Calculator {
    constructor() {
        this.clear();
    }

    /**
     * Reset calculator to initial state
     */
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetOnNextInput = false;
    }

    /**
     * Delete the last character or operation
     */
    delete() {
        if (this.operation && this.currentOperand === '') {
            // Delete the operation
            this.operation = undefined;
            this.currentOperand = this.previousOperand;
            this.previousOperand = '';
        } else if (this.currentOperand === '' || this.currentOperand === '0') {
            return;
        } else {
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
            if (this.currentOperand === '' || this.currentOperand === '-') {
                this.currentOperand = '';
            }
        }
    }

    /**
     * Append a number or decimal point to current operand
     * @param {string} number - The number or decimal point to append
     */
    appendNumber(number) {
        // If we just computed a result, clear and start fresh
        if (this.shouldResetOnNextInput) {
            this.currentOperand = '';
            this.previousOperand = '';
            this.operation = undefined;
            this.shouldResetOnNextInput = false;
        }
        
        // Prevent multiple decimal points
        if (number === '.' && this.currentOperand.includes('.')) return;
        
        // Handle empty or zero current operand
        if (this.currentOperand === '' || this.currentOperand === '0') {
            this.currentOperand = number === '.' ? '0.' : number;
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    /**
     * Choose an operation (+, -, ×, ÷)
     * @param {string} operation - The operation to perform
     */
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        
        // If there's already an operation, compute it first (chaining)
        if (this.previousOperand !== '' && this.operation) {
            this.compute();
            this.operation = operation;
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
        } else {
            this.operation = operation;
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
        }
    }

    /**
     * Compute the result of the current operation
     * @throws {Error} If attempting to divide by zero
     */
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    throw new Error('Cannot divide by zero');
                }
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetOnNextInput = true;
    }

    /**
     * Get the current display state
     * @returns {Object} Object containing currentOperand, previousOperand, and operation
     */
    getDisplayState() {
        return {
            currentOperand: this.currentOperand,
            previousOperand: this.previousOperand,
            operation: this.operation
        };
    }

    /**
     * Format a number for display with thousand separators
     * @param {string|number} number - The number to format
     * @returns {string} Formatted number string
     */
    static formatNumber(number) {
        if (number === '' || number === undefined) return '';
        
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }
}
