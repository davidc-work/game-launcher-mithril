const btn = require('./Button.js');

const GameDisplayHeaderComponent = {
    view: () => {
        return m('div#game-display-header', [
            m('div#header-text-container', [
                m('p.header-text.header-1', '')
            ]),
            m(btn.PlayBtnComponent)
        ]);
    }
}

module.exports = GameDisplayHeaderComponent;