const btn = require('./Button');

const MainCommunityContent = {
    view: () => {
        return m('div#main-community-content', [
            m('div.sidebar-header', 'Public Servers'),
            m('div#public-servers-list-container', [
                m('div#public-servers-list')
            ]),
            m(btn.CreatePublicServerBtnComponent)
        ]);
    }
}

module.exports = MainCommunityContent;