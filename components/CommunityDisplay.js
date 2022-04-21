let chatHistory = [];
let chat = [];

const constructMsg = msg => {
    return m('div.chat-msg', [
        m('p', msg.user),
        m('p', msg.msg)
    ]);
}

const addMsg = msg => {
    const prev = chatHistory.slice(-1)[0];
    const isPrev = prev ? prev.user == msg.user : false;

    if (isPrev) {
        chat.push(m('div.chat-msg.no-title', [
            m('p', msg.msg)
        ]));
    }
    else {
        const msgElement = constructMsg(msg);
        chat.push(msgElement);
    }

    chatHistory.push(msg);
    m.redraw();
}

const CommunityDisplayComponent = {
    view: () => {
        return m('div#community-display', [
            page.communityMain == 'main' ?
                m('div#community-main', { style: 'color: white;' }, 'Community main!') :
                m('div#server-chat-all', [
                    m('div.chat-container', [
                        chat.length ? m('div.chat', chat) : m('div', { style: 'color: white;' }, 'This chat is empty!')
                    ]),
                    m('div.chat-box-container', [
                        m('div.chat-box', [
                            m('i', { 'data-feather': 'plus-circle' }),
                            m('input', {
                                type: 'text',
                                placeholder: 'Type something...',
                                onkeyup: async function (e) {
                                    //let user = $('#username-input').val();
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
        chat = [];
        chatHistory = [];
        messages.forEach(msg => addMsg(msg))
        //chat = messages.map(msg => constructMsg(msg));
        //m.redraw();
    },
    addChat: message => {
        addMsg(message);
        //chat.push(constructMsg(message));
        //m.redraw();
    }
}

module.exports = CommunityDisplayComponent;