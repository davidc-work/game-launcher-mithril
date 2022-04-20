const MainCommunityContentComponent = require('./MainCommunityContent');
const ServerContentComponent = require('./ServerContent');

const CommunitySidebarComponent = {
    view: () => {
        return m('div#community-sidebar-container', [
            m('div#community-sidebar', [
                m(MainCommunityContentComponent),
                m(ServerContentComponent)
            ]),
            m('div#public-servers-all')
        ]);
    }
}

module.exports = CommunitySidebarComponent;