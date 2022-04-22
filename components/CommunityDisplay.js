const CommunityMainComponent = require('./CommunityMain.js');

let chatHistory = [];
let chat = [];

const constructMsg = msg => {
    return m('div.chat-msg', [
        m('p', msg.user),
        m('p', msg.msg)
    ]);
}

const scrollToBottom = () => {
    const chatElement = $('.chat')[0];
    if (chatElement) chatElement.scrollTop = chatElement.scrollHeight;
}

const addMsg = (msg, redraw = true) => {
    let goToBottom;
    const chatElement = $('.chat')[0];
    if (chatElement) goToBottom = chatElement.scrollHeight - chatElement.scrollTop == chatElement.clientHeight;
    if (msg.user == user) goToBottom = true;

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
    if (redraw) m.redraw();

    if (goToBottom) requestAnimationFrame(scrollToBottom);
}

const CommunityDisplayComponent = {
    view: () => {
        return m('div#community-display', [
            page.communityMain ?
                m(CommunityMainComponent) :
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
    setChat: function (messages) {
        chat = [];
        chatHistory = [];
        messages.forEach(msg => addMsg(msg, false));
        m.redraw();
        requestAnimationFrame(scrollToBottom);
    },
    addChat: message => {
        addMsg(message);
    }
}

module.exports = CommunityDisplayComponent;