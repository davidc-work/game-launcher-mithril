const btn = require('./Button.js');

const GameDisplayHeaderComponent = {
    view: () => {
        return m('div#game-display-header', [
            m('div#header-text-container', [
                m('p.header-text.header-1', '')
            ]),
            m(btn.PlayBtnComponent),
            m('input', { id: 'username-input', type: 'text', value: 'test_user', placeholder: 'username...', style: 'position: absolute; top: 5px; left: 5px; width: 100px;' })
        ]);
    }
}

module.exports = GameDisplayHeaderComponent;