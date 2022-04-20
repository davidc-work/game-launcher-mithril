const ServerContentComponent = {
    view: () => {
        return m('div#server-content', [
            m('div.sidebar-header', 'Channels'),
            m('div#channel-list-container', [
                m('div#channel-list')
            ])
        ]);
    }
}

module.exports = ServerContentComponent;