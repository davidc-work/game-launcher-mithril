const btn = require('./Button');
const GameDisplayHeaderComponent = require('./GameDisplayHeader');
const CommunityComponent = require('./Community');

const GameDisplayComponent = {
    view: () => {
        return m('div#game-display', [
            m('div#game-display-content', [
                m(GameDisplayHeaderComponent),
                m(btn.CreateCommunityBtnComponent),
                m(CommunityComponent)
            ])
        ]);
    }
}

module.exports = GameDisplayComponent;