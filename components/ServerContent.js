let channels = [];

const generateChannels = () => {
    if (!channels.length) return '';
    return channels.map(c => {
        return m('div.channel-list-item.btn.btn-sidebar', {
            onclick: () => selectChannel(c._id),
            class: selectedChannel ? (c._id == selectedChannel._id ? 'selected' : '') : ''
        }, [
            m('p', c.name)
        ])
    })
}

const setChannels = c => {
    channels = c;
    m.redraw();
}

const ServerContentComponent = {
    view: () => {
        if (!selectedPublicServer) return null;
        return m('div#server-content', [
            m('div', { onclick: routeCommunityHome }, [
                m('img', { src: './assets/icons/arrow-left.svg', style: 'margin-left: 8px; margin-top: 8px;', class: 'btn-animated-1' })
            ]),
            m('div.community-sidebar-server-title', selectedPublicServer.name),
            m('div.channel-container', [
                m('div.sidebar-server-header', 'Channels'),
                m('div#channel-list-container', [
                    m('div#channel-list', generateChannels())
                ])
            ]),
            m('div.btn.btn-sidebar', {
                onclick: () => {
                    page.overlayPrompt = 'create-channel';
                    page.overlay = true;
                }
            }, '+ Create Channel')
        ]);
    },
    setChannels
}

globalComponents.serverContent = ServerContentComponent;

module.exports = ServerContentComponent;