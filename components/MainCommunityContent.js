const btn = require('./Button');

let s = [];

const MainCommunityContent = {
    view: () => {
        return m('div#main-community-content', [
            /*m('div.sidebar-title', 'Community'),*/
            m('div.sidebar-header', 'Public Servers'),
            m('div#public-servers-list-container', [
                m('div#public-servers-list', s)
            ]),
            m(btn.CreatePublicServerBtnComponent)
        ]);
    },
    setPublicServers: async servers => {
        s = [];
        m.redraw.sync();  //temporary because idk how to fix this

        s = servers.map(server => {
            return m('div.server-list-element', { onclick: () => routeCommunityServer(server.name) }, [
                m('p', server.name)
            ])
        });
        m.redraw();
    }
}

module.exports = MainCommunityContent;