import { describe, it, expect, beforeEach } from 'vitest';
import { Calculator } from '../modules/Calculator.js';

describe('Calculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    describe('Initialization', () => {
        it('should initialize with correct default values', () => {
            expect(calculator.currentOperand).toBe('');
            expect(calculator.previousOperand).toBe('');
            expect(calculator.operation).toBeUndefined();
            expect(calculator.shouldResetOnNextInput).toBe(false);
        });
    });

    describe('Number Input', () => {
        it('should append single digit', () => {
            calculator.appendNumber('5');
            expect(calculator.currentOperand).toBe('5');
        });

        it('should build multi-digit number', () => {
            calculator.appendNumber('1');
            calculator.appendNumber('2');
            calculator.appendNumber('3');
            expect(calculator.currentOperand).toBe('123');
        });

        it('should handle decimal point', () => {
            calculator.appendNumber('5');
            calculator.appendNumber('.');
            calculator.appendNumber('5');
            expect(calculator.currentOperand).toBe('5.5');
        });

        it('should prevent multiple decimal points', () => {
            calculator.appendNumber('5');
            calculator.appendNumber('.');
            calculator.appendNumber('5');
            calculator.appendNumber('.');
            calculator.appendNumber('5');
            expect(calculator.currentOperand).toBe('5.5');
        });

        it('should handle leading decimal point', () => {
            calculator.appendNumber('.');
            expect(calculator.currentOperand).toBe('0.');
        });
    });

    describe('Operations', () => {
        it('should set operation and move operand', () => {
            calculator.appendNumber('5');
            calculator.chooseOperation('+');
            expect(calculator.previousOperand).toBe('5');
            expect(calculator.operation).toBe('+');
            expect(calculator.currentOperand).toBe('');
        });

        it('should do nothing with empty current operand', () => {
            calculator.chooseOperation('+');
            expect(calculator.previousOperand).toBe('');
            expect(calculator.operation).toBeUndefined();
        });

        it('should chain operations by computing first', () => {
            calculator.appendNumber('5');
            calculator.chooseOperation('+');
            calculator.appendNumber('3');
            calculator.chooseOperation('-');
            expect(calculator.currentOperand).toBe('');
            expect(calculator.previousOperand).toBe('8');
            expect(calculator.operation).toBe('-');
        });
    });

    describe('Addition', () => {
        it('should perform basic addition', () => {
            calculator.appendNumber('5');
            calculator.chooseOperation('+');
            calculator.appendNumber('3');
            calculator.compute();
            expect(calculator.currentOperand).toBe('8');
            expect(calculator.previousOperand).toBe('');
            expect(calculator.operation).toBeUndefined();
        });

        it('should handle decimal addition', () => {
            calculator.appendNumber('5');
            calculator.appendNumber('.');
            calculator.appendNumber('5');
            calculator.chooseOperation('+');
            calculator.appendNumber('2');
            calculator.appendNumber('.');
            calculator.appendNumber('5');
            calculator.compute();
            expect(calculator.currentOperand).toBe('8');
        });
    });

    describe('Subtraction', () => {
        it('should perform basic subtraction', () => {
            calculator.appendNumber('1');
            calculator.appendNumber('0');
            calculator.chooseOperation('-');
            calculator.appendNumber('3');
            calculator.compute();
            expect(calculator.currentOperand).toBe('7');
        });

        it('should handle negative results', () => {
            calculator.appendNumber('3');
            calculator.chooseOperation('-');
            calculator.appendNumber('1');
            calculator.appendNumber('0');
            calculator.compute();
            expect(calculator.currentOperand).toBe('-7');
        });
    });

    describe('Multiplication', () => {
        it('should perform basic multiplication', () => {
            calculator.appendNumber('5');
            calculator.chooseOperation('×');
            calculator.appendNumber('3');
            calculator.compute();
            expect(calculator.currentOperand).toBe('15');
        });

        it('should handle decimal multiplication', () => {
            calculator.appendNumber('2');
            calculator.appendNumber('.');
            calculator.appendNumber('5');
            calculator.chooseOperation('×');
            calculator.appendNumber('4');
            calculator.compute();
            expect(calculator.currentOperand).toBe('10');
        });
    });

    describe('Division', () => {
        it('should perform basic division', () => {
            calculator.appendNumber('1');
            calculator.appendNumber('5');
            calculator.chooseOperation('÷');
            calculator.appendNumber('3');
            calculator.compute();
            expect(calculator.currentOperand).toBe('5');
        });

        it('should handle decimal division', () => {
            calculator.appendNumber('1');
            calculator.appendNumber('0');
            calculator.chooseOperation('÷');
            calculator.appendNumber('4');
            calculator.compute();
            expect(calculator.currentOperand).toBe('2.5');
        });

        it('should throw error on division by zero', () => {
            calculator.appendNumber('5');
            calculator.chooseOperation('÷');
            calculator.appendNumber('0');
            expect(() => calculator.compute()).toThrow('Cannot divide by zero');
        });
    });

    describe('Clear', () => {
        it('should reset calculator to initial state', () => {
            calculator.appendNumber('5');
            calculator.chooseOperation('+');
            calculator.appendNumber('3');
            calculator.clear();
            expect(calculator.currentOperand).toBe('');
            expect(calculator.previousOperand).toBe('');
            expect(calculator.operation).toBeUndefined();
            expect(calculator.shouldResetOnNextInput).toBe(false);
        });
    });

    describe('Delete', () => {
        it('should remove last digit', () => {
            calculator.appendNumber('1');
            calculator.appendNumber('2');
            calculator.appendNumber('3');
            calculator.delete();
            expect(calculator.currentOperand).toBe('12');
        });

        it('should handle single digit', () => {
            calculator.appendNumber('5');
            calculator.delete();
            expect(calculator.currentOperand).toBe('');
        });

        it('should remove operation when current operand is empty', () => {
            calculator.appendNumber('5');
            calculator.chooseOperation('+');
            calculator.delete();
            expect(calculator.currentOperand).toBe('5');
            expect(calculator.operation).toBeUndefined();
            expect(calculator.previousOperand).toBe('');
        });
    });

    describe('Reset After Compute', () => {
        it('should clear on next input after compute', () => {
            calculator.appendNumber('5');
            calculator.chooseOperation('+');
            calculator.appendNumber('3');
            calculator.compute();
            expect(calculator.shouldResetOnNextInput).toBe(true);
            calculator.appendNumber('7');
            expect(calculator.currentOperand).toBe('7');
            expect(calculator.previousOperand).toBe('');
            expect(calculator.operation).toBeUndefined();
        });
    });

    describe('Complex Calculations', () => {
        it('should handle 5 + 3 - 2', () => {
            calculator.appendNumber('5');
            calculator.chooseOperation('+');
            calculator.appendNumber('3');
            calculator.chooseOperation('-');
            calculator.appendNumber('2');
            calculator.compute();
            expect(calculator.currentOperand).toBe('6');
        });

        it('should handle 10 * 2 / 4', () => {
            calculator.appendNumber('1');
            calculator.appendNumber('0');
            calculator.chooseOperation('×');
            calculator.appendNumber('2');
            calculator.chooseOperation('÷');
            calculator.appendNumber('4');
            calculator.compute();
            expect(calculator.currentOperand).toBe('5');
        });
    });

    describe('Display State', () => {
        it('should return correct state', () => {
            calculator.appendNumber('5');
            calculator.chooseOperation('+');
            calculator.appendNumber('3');
            const state = calculator.getDisplayState();
            expect(state.previousOperand).toBe('5');
            expect(state.operation).toBe('+');
            expect(state.currentOperand).toBe('3');
        });
    });

    describe('Number Formatting', () => {
        it('should handle empty string', () => {
            expect(Calculator.formatNumber('')).toBe('');
        });

        it('should add thousand separators', () => {
            expect(Calculator.formatNumber('1000')).toBe('1,000');
        });

        it('should handle decimals', () => {
            expect(Calculator.formatNumber('1234.56')).toBe('1,234.56');
        });

        it('should handle large numbers', () => {
            expect(Calculator.formatNumber('1000000')).toBe('1,000,000');
        });
    });
});
