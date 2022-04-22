const MainCommunityContentComponent = require('./MainCommunityContent');
const ServerContentComponent = require('./ServerContent');

const CommunitySidebarComponent = {
    MainCommunityContentComponent,
    view: () => {
        return m('div#community-sidebar-all', [
            m('div#community-sidebar-header', [
                m('div.sidebar-title', 'Community')
            ]),
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