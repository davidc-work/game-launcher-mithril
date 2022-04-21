let chat = [m('div', { style: 'color: white;' }, 'No chat history.')];

const constructMsg = msg => {
    return m('div.chat-msg', [
        m('p', msg.user),
        m('p', msg.msg)
    ]);
}

const CommunityDisplayComponent = {
    view: () => {
        return m('div#community-display', [
            page.communityMain == 'main' ?
                m('div#community-main', { style: 'color: white;' }, 'Community main!') :
                m('div#server-chat-all', [
                    m('div.chat-container', [
                        m('div.chat', chat)
                    ]),
                    m('div.chat-box-container', [
                        m('div.chat-box', [
                            m('i', { 'data-feather': 'plus-circle' }),
                            m('input', {
                                type: 'text',
                                placeholder: 'Type something...',
                                onkeyup: async function (e) {
                                    let user = $('#username-input').val();
                                    if (e.key == 'Enter') {
                                        const result = await sendChat(user, e.target.value, selectedChannel, socket);
                                        e.target.value = '';
                                    }
                                }
                            })
                        ])
                    ])
                ])
        ]);
    },
    setChat: messages => {
        chat = messages.map(msg => constructMsg(msg));
        m.redraw();
    },
    addChat: message => {
        chat.push(constructMsg(message));
        m.redraw();
    }
}

module.exports = CommunityDisplayComponent;