const btn = require('./Button');
const CommunitySidebarComponent = require('./CommunitySidebar');
const CommunityDisplayComponent = require('./CommunityDisplay');

const CommunityComponent = {
    CommunitySidebarComponent,
    CommunityDisplayComponent,
    view: () => {
        return m('div#community-container', [
            m(CommunitySidebarComponent),
            page.community == 'exists' ? m(CommunityDisplayComponent) : m(btn.createButton({
                text: 'Request Community',
                type: 1,
                color: 'dark',
                onclick: () => createCommunity(),
                style: 'display: inline-block; vertical-align: top; margin: 20px;'
            }))
        ]);
    }
}

module.exports = CommunityComponent;