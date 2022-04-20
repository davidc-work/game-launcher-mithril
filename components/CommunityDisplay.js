const CommunityDisplayComponent = {
    view: () => {
        return m('div#community-display', [
            m('div#server-chat-all', [
                m('div.chat-container', [
                    m('div.chat')
                ]),
                m('div.chat-box-container', [
                    m('div.chat-box', [
                        m('i', { 'data-feather': 'plus-circle' }),
                        m('input', {
                            type: 'text',
                            placeholder: 'Type something...'
                        })
                    ])
                ])
            ])
        ]);
    }
}

module.exports = CommunityDisplayComponent;