const OverlayComponent = require('./Overlay');
const OverlayPromptComponent = require('./OverlayPrompt');
const btn = require('./Button.js');
const SidebarComponent = require('./Sidebar.js');
const GameDisplayComponent = require('./GameDisplay');

const MainComponent = {
    SidebarComponent,
    GameDisplayComponent,
    OverlayComponent,
    view: () => {
        return m('div#main', [
            m(OverlayComponent),
            m(OverlayPromptComponent),
            m(btn.ResetBtnComponent),
            m(SidebarComponent),
            m(GameDisplayComponent)
        ]);
    }
}

module.exports = MainComponent;