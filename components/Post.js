const btn = require('./Button');

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
                m('textarea.comment-box.dark-1', { placeholder: 'New comment...', style: 'width: 450px' }),
                m(btn.createButton({
                    text: 'Post',
                    type: 1,
                    color: 'dark',
                    onclick: async () => {
                        const comment = $('.comment-box').val();
                        await newComment(comment);
                        m.redraw();
                    },
                    style: 'margin: 10px;'
                })),
                m('div.comments-container', postComments || [])
            ]);
        }
    }
}

module.exports = PostComponent;