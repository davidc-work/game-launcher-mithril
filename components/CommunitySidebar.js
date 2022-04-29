const MainCommunityContentComponent = require('./MainCommunityContent');
const ServerContentComponent = require('./ServerContent');
const SidebarNavComponent = require('./SidebarNav');

const generateGames = () => {
    if (!allGames) return [];
    return allGames.map(g => {
        return m('div.game-list-item', {
            class: selectedGame.name == g.name ? 'selected' : '',
            onclick: () => selectGame(g.name)
        }, g.name)
    })
}

const CommunitySidebarComponent = {
    MainCommunityContentComponent,
    view: () => {
        return m('div#community-sidebar-all', [
            m('div#community-sidebar-header', [
                m('div.sidebar-title', 'Community')
            ]),
            m(SidebarNavComponent),
            page.sidebarNav == 'Games' ?
                m('div.game-sidebar-container', [
                    m('div.game-sidebar', [
                        m('div.game-list', generateGames())
                    ])
                ]) :
                m('div#community-sidebar-container', [
                    m('div#community-sidebar', [
                        page.communitySidebar == 'main' ? m(MainCommunityContentComponent) : m(ServerContentComponent)
                    ]),
                    m('div#public-servers-all')
                ])
        ])

    }
}

module.exports = CommunitySidebarComponent;