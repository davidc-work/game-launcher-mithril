const btn = require('./Button.js');

const GameDisplayHeaderComponent = {
    view: () => {
        const backgroundImg = gameBannerImg ? ('url(' + gameBannerImg.url + ')') : 'unset';
        const s = 'background-image: ' + backgroundImg + ';';
        return m('div#game-display-header', { style: s }, [
            m('div.cover'),
            m('div#header-text-container', [
                m('p.header-text.header-1', '')
            ]),
            m(btn.PlayBtnComponent),
            m('input', {
                id: 'username-input', type: 'text', value: user, placeholder: 'username...', style: 'position: absolute; top: 5px; left: 5px; width: 100px;', onkeyup: e => user = e.target.value
            })
        ]);
    }
}

module.exports = GameDisplayHeaderComponent;