const ServerContentComponent = {
    view: () => {
        if (!selectedPublicServer) return null;
        return m('div#server-content', [
            m('div', { onclick: routeCommunityHome }, [
                m('i', { 'data-feather': 'arrow-left', style: 'padding-left: 5px; padding-top: 5px; cursor: pointer;' })
            ]),
            m('div.sidebar-header', { style: 'color: #559feb; font-size: 22px;' }, selectedPublicServer.name),
            m('div.sidebar-header', 'Channels'),
            m('div#channel-list-container', [
                m('div#channel-list')
            ])
        ]);
    }
}

module.exports = ServerContentComponent;