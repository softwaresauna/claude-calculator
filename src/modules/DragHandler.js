/**
 * DragHandler - Manages drag-and-drop functionality
 * Allows the calculator to be dragged around the screen
 */
export class DragHandler {
    /**
     * @param {HTMLElement} element - The element to make draggable
     */
    constructor(element) {
        this.element = element;
        this.isDragging = false;
        this.currentX = 0;
        this.currentY = 0;
        this.initialX = 0;
        this.initialY = 0;
        this.xOffset = 0;
        this.yOffset = 0;

        this.setupDragListeners();
        this.centerElement();
    }

    /**
     * Center the element on the screen when page loads
     */
    centerElement() {
        window.addEventListener('load', () => {
            const rect = this.element.getBoundingClientRect();
            this.xOffset = (window.innerWidth - rect.width) / 2;
            this.yOffset = (window.innerHeight - rect.height) / 2;
            this.element.style.left = this.xOffset + 'px';
            this.element.style.top = this.yOffset + 'px';
        });
    }

    /**
     * Set up mouse and touch event listeners for dragging
     */
    setupDragListeners() {
        // Mouse events
        this.element.addEventListener('mousedown', (e) => this.dragStart(e));
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.dragEnd());

        // Touch events for mobile
        this.element.addEventListener('touchstart', (e) => this.dragStart(e), { passive: false });
        document.addEventListener('touchmove', (e) => this.drag(e), { passive: false });
        document.addEventListener('touchend', () => this.dragEnd());
    }

    /**
     * Handle drag start event
     * @param {MouseEvent|TouchEvent} e - The event object
     */
    dragStart(e) {
        if (e.type === 'touchstart') {
            this.initialX = e.touches[0].clientX - this.xOffset;
            this.initialY = e.touches[0].clientY - this.yOffset;
        } else {
            this.initialX = e.clientX - this.xOffset;
            this.initialY = e.clientY - this.yOffset;
        }

        this.isDragging = true;
    }

    /**
     * Handle drag movement
     * @param {MouseEvent|TouchEvent} e - The event object
     */
    drag(e) {
        if (this.isDragging) {
            e.preventDefault();

            if (e.type === 'touchmove') {
                this.currentX = e.touches[0].clientX - this.initialX;
                this.currentY = e.touches[0].clientY - this.initialY;
            } else {
                this.currentX = e.clientX - this.initialX;
                this.currentY = e.clientY - this.initialY;
            }

            this.xOffset = this.currentX;
            this.yOffset = this.currentY;

            this.setTranslate(this.currentX, this.currentY);
        }
    }

    /**
     * Handle drag end event
     */
    dragEnd() {
        this.isDragging = false;
    }

    /**
     * Set the element's position
     * @param {number} xPos - X position
     * @param {number} yPos - Y position
     */
    setTranslate(xPos, yPos) {
        this.element.style.left = xPos + 'px';
        this.element.style.top = yPos + 'px';
    }
}
