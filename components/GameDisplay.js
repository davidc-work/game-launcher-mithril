const btn = require('./Button');
const GameDisplayHeaderComponent = require('./GameDisplayHeader');
const CommunityComponent = require('./Community');

const GameDisplayComponent = {
    GameDisplayHeaderComponent,
    CommunityComponent,
    view: () => {
        return m('div#game-display', [
            m('div#game-display-content', [
                m(GameDisplayHeaderComponent),
                page.community == 'exists' ? m(CommunityComponent) : m(btn.CreateCommunityBtnComponent)
            ])
        ]);
    }
}

module.exports = GameDisplayComponent;