const CommunityMainComponent = require('./CommunityMain.js');
const PostComponent = require('./Post');

let chatHistory = [];
let chat = [];
let post;

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
    CommunityMainComponent,
    view: () => {
        return m('div#community-display', [
            page.communityMain == 'main' ?
                m(CommunityMainComponent) :
                page.communityMain == 'post' ?
                    m(PostComponent(post)) :
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
                                            const result = await community.emit('send-message', {
                                                user,
                                                msg: e.target.value,
                                                channel_id: selectedChannel._id
                                            });
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
    },
    setPost: p => {
        post = p;
        page.communityMain = 'post';
        m.redraw();
    }
}

module.exports = CommunityDisplayComponent;