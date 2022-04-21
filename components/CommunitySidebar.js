const MainCommunityContentComponent = require('./MainCommunityContent');
const ServerContentComponent = require('./ServerContent');

const CommunitySidebarComponent = {
    MainCommunityContentComponent,
    view: () => {
        return m('div#community-sidebar-container', [
            m('div#community-sidebar', [
                page.communitySidebar == 'main' ? m(MainCommunityContentComponent) : m(ServerContentComponent)
            ]),
            m('div#public-servers-all')
        ]);
    }
}

module.exports = CommunitySidebarComponent;