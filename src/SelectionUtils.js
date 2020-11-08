export default class SelectionUtils {

    constructor() {
        this.selection = null;
        this.savedSelectionRange = null;
        this.isFakeBackgroundEnabled = false;
        this.commandBackground = 'backColor';
        this.commandRemoveFormat = 'removeFormat';
    }


    isElement(node) {
        return node && typeof node === 'object' && node.nodeType && node.nodeType === Node.ELEMENT_NODE;
    }

    isContentEditable(element) {
        return element.contentEditable === 'true';
    }

    isNativeInput(target) {
        const nativeInputs = [
            'INPUT',
            'TEXTAREA',
        ];
        return target && target.tagName ? nativeInputs.includes(target.tagName) : false;
    }

    canSetCaret(target) {
        let result = true;
        if (this.isNativeInput(target)) {
            switch (target.type) {
                case 'file':
                case 'checkbox':
                case 'radio':
                case 'hidden':
                case 'submit':
                case 'button':
                case 'image':
                case 'reset':
                    result = false;
                    break;
                default:
            }
        } else {
            result = this.isContentEditable(target);
        }

        return result;
    }

    CSS() {
        return {
            editorWrapper: 'codex-editor',
            editorZone: 'codex-editor__redactor',
        };
    }

    anchorNode() {
        const selection = window.getSelection();
        return selection ? selection.anchorNode : null;
    }

    anchorElement() {
        const selection = window.getSelection();

        if (!selection) {
            return null;
        }

        const anchorNode = selection.anchorNode;

        if (!anchorNode) {
            return null;
        }

        if (!this.isElement(anchorNode)) {
            return anchorNode.parentElement;
        } else {
            return anchorNode;
        }
    }

    anchorOffset() {
        const selection = window.getSelection();
        return selection ? selection.anchorOffset : null;
    }

    isCollapsed() {
        const selection = window.getSelection();
        return selection ? selection.isCollapsed : null;
    }

    isAtEditor() {
        const selection = SelectionUtils.get();
        let selectedNode = (selection.anchorNode || selection.focusNode);

        if (selectedNode && selectedNode.nodeType === Node.TEXT_NODE) {
            selectedNode = selectedNode.parentNode;
        }

        let editorZone = null;

        if (selectedNode) {
            editorZone = selectedNode.closest(`.${SelectionUtils.CSS.editorZone}`);
        }
        return editorZone && editorZone.nodeType === Node.ELEMENT_NODE;
    }

    isSelectionExists() {
        const selection = SelectionUtils.get();
        return !!selection.anchorNode;
    }

    static get range() {
        const selection = window.getSelection();
        return selection && selection.rangeCount ? selection.getRangeAt(0) : null;
    }

    static get rect() {
        let sel = document.selection, range;

        let rect = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };

        if (sel && sel.type !== 'Control') {
            range = sel.createRange();
            rect.x = range.boundingLeft;
            rect.y = range.boundingTop;
            rect.width = range.boundingWidth;
            rect.height = range.boundingHeight;
            return rect;
        }

        if (!window.getSelection) {
            return rect;
        }

        sel = window.getSelection();

        if (sel.rangeCount === null || isNaN(sel.rangeCount)) {
            return rect;
        }

        if (sel.rangeCount === 0) {
            return rect;
        }

        range = sel.getRangeAt(0).cloneRange();

        if (range.getBoundingClientRect) {
            rect = range.getBoundingClientRect();
        }

        if (rect.x === 0 && rect.y === 0) {
            const span = document.createElement('span');

            if (span.getBoundingClientRect) {
                span.appendChild(document.createTextNode('\u200b'));
                range.insertNode(span);
                rect = span.getBoundingClientRect();
                const spanParent = span.parentNode;
                spanParent.removeChild(span);
                spanParent.normalize();
            }
        }

        return rect;
    }

    static get text() {
        return window.getSelection ? window.getSelection().toString() : '';
    }

    get() {
        return window.getSelection();
    }

    setCursor(element, offset = 0) {
        const range = document.createRange();
        const selection = window.getSelection();

        if (this.isNativeInput(element)) {
            if (!this.canSetCaret(element)) {
                return;
            }

            element.focus();
            element.selectionStart = element.selectionEnd = offset;

            return element.getBoundingClientRect();
        }

        range.setStart(element, offset);
        range.setEnd(element, offset);

        selection.removeAllRanges();
        selection.addRange(range);

        return range.getBoundingClientRect();
    }

    removeFakeBackground() {
        if (!this.isFakeBackgroundEnabled) {
            return;
        }
        this.isFakeBackgroundEnabled = false;
        document.execCommand(this.commandRemoveFormat);
    }

    setFakeBackground() {
        document.execCommand(this.commandBackground, false, '#a8d6ff');
        this.isFakeBackgroundEnabled = true;
    }

    save() {
        this.savedSelectionRange = SelectionUtils.range;
    }

    restore() {
        if (!this.savedSelectionRange) {
            return;
        }
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(this.savedSelectionRange);
    }

    clearSaved() {
        this.savedSelectionRange = null;
    }

    collapseToEnd() {
        const sel = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(sel.focusNode);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    findParentTag(tagName, className = null, searchDepth = 10) {
        const selection = window.getSelection();
        let parentTag = null;
        if (!selection || !selection.anchorNode || !selection.focusNode) {
            return null;
        }
        const boundNodes = [
            selection.anchorNode,
            selection.focusNode,
        ];

        boundNodes.forEach((parent) => {
            let searchDepthIterable = searchDepth;
            while (searchDepthIterable > 0 && parent.parentNode) {
                if (parent.tagName === tagName) {
                    parentTag = parent;
                    if (className && parent.classList && !parent.classList.contains(className)) {
                        parentTag = null;
                    }
                    if (parentTag) {
                        break;
                    }
                }
                parent = parent.parentNode;
                searchDepthIterable--;
            }
        });
        return parentTag;
    }

    expandToTag(element) {
        const selection = window.getSelection();
        selection.removeAllRanges();
        const range = document.createRange();
        range.selectNodeContents(element);
        selection.addRange(range);
    }
}