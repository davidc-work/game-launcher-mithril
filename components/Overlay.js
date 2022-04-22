const OverlayPromptComponent = require('./OverlayPrompt');

const close = () => {
    page.overlay = false;
    page.overlayPrompt = false;
}

const OverlayComponent = {
    view: () => {
        return page.overlay ? m('div.overlay', { onclick: close }) : null;
    },
    close
}

module.exports = OverlayComponent;