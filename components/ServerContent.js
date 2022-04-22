const ServerContentComponent = {
    view: () => {
        if (!selectedPublicServer) return null;
        return m('div#server-content', [
            m('div', { onclick: routeCommunityHome }, [
                m('i', { 'data-feather': 'arrow-left', style: 'margin-left: 8px; margin-top: 8px;', class: 'btn-animated-1' })
            ]),
            m('div.community-sidebar-server-title', selectedPublicServer.name),
            m('div.channel-container', [
                m('div.sidebar-server-header', 'Channels'),
                m('div#channel-list-container', [
                    m('div#channel-list')
                ])
            ])
        ]);
    }
}

module.exports = ServerContentComponent;