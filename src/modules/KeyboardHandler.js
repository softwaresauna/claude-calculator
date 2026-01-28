/**
 * KeyboardHandler - Manages keyboard input for the calculator
 * Maps keyboard events to calculator actions
 */
export class KeyboardHandler {
    /**
     * @param {CalculatorDisplay} calculatorDisplay - The calculator display instance
     */
    constructor(calculatorDisplay) {
        this.calculatorDisplay = calculatorDisplay;
        this.setupKeyboardListeners();
    }

    /**
     * Set up keyboard event listeners
     */
    setupKeyboardListeners() {
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });
    }

    /**
     * Handle keyboard key press events
     * @param {KeyboardEvent} e - The keyboard event
     */
    handleKeyPress(e) {
        // Number keys (0-9)
        if (e.key >= '0' && e.key <= '9') {
            this.calculatorDisplay.handleNumberClick(e.key);
        }
        
        // Decimal point
        if (e.key === '.') {
            this.calculatorDisplay.handleNumberClick('.');
        }
        
        // Addition
        if (e.key === '+') {
            this.calculatorDisplay.handleOperationClick('+');
        }
        
        // Subtraction
        if (e.key === '-') {
            this.calculatorDisplay.handleOperationClick('-');
        }
        
        // Multiplication
        if (e.key === '*') {
            this.calculatorDisplay.handleOperationClick('×');
        }
        
        // Division
        if (e.key === '/') {
            e.preventDefault();
            this.calculatorDisplay.handleOperationClick('÷');
        }
        
        // Equals (Enter or =)
        if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault();
            this.calculatorDisplay.handleEqualsClick();
        }
        
        // Clear (Escape)
        if (e.key === 'Escape') {
            this.calculatorDisplay.handleClearClick();
        }
        
        // Delete (Backspace)
        if (e.key === 'Backspace') {
            this.calculatorDisplay.handleDeleteClick();
        }
    }
}
