const getComments = () => {
    return [m('div.comment')]
}

const PostComponent = post => {
    return {
        view: () => {
            return m('div.post', [
                m('span.back-btn', {
                    style: 'position: absolute; left: 10px; top: 10px;', onclick: () => {
                        page.communityMain = 'main';
                    }
                }, [
                    m('img', { src: './assets/icons/arrow-left.svg' }),
                    m('span', 'Back')
                ]),
                m('div.title-container', [
                    m('p', post.title),
                    m('p', 'Submitted by ' + post.user_id),
                ]),
                m('div.body-container', [
                    m('p', post.body)
                ]),
                m('div.separator'),
                m('div.comments-container', getComments())
            ]);
        }
    }
}

module.exports = PostComponent;