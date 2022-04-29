const GameDisplayHeaderComponent = require('./GameDisplayHeader');
const CommunityComponent = require('./Community');

const GameDisplayComponent = {
    GameDisplayHeaderComponent,
    CommunityComponent,
    view: () => {
        return m('div#game-display', [
            m('div#game-display-content', [
                m(GameDisplayHeaderComponent),
                m(CommunityComponent)
            ])
        ]);
    }
}

module.exports = GameDisplayComponent;