const CommunitySidebarComponent = require('./CommunitySidebar');
const CommunityDisplayComponent = require('./CommunityDisplay');

const CommunityComponent = {
    view: () => {
        return m('div#community-container', [
            m(CommunitySidebarComponent),
            m(CommunityDisplayComponent)
        ]);
    }
}

module.exports = CommunityComponent;