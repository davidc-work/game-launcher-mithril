const CommunitySidebarComponent = require('./CommunitySidebar');
const CommunityDisplayComponent = require('./CommunityDisplay');

const CommunityComponent = {
    CommunitySidebarComponent,
    CommunityDisplayComponent,
    view: () => {
        return m('div#community-container', [
            m(CommunitySidebarComponent),
            m(CommunityDisplayComponent)
        ]);
    }
}

module.exports = CommunityComponent;