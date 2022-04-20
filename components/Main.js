const btn = require('./Button.js');
const SidebarComponent = require('./Sidebar.js');
const GameDisplayComponent = require('./GameDisplay');

const MainComponent = {
    view: () => {
        return m('div#main', [
            m(btn.ResetBtnComponent),
            m(SidebarComponent),
            m(GameDisplayComponent)
        ]);
    }
}

module.exports = MainComponent;