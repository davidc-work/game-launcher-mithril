const btn = require('./Button');

const CreatePostComponent = {
    view: () => {
        return m('div.create-post-container', [
            m('div.create-post.entering.right', [
                m('span.back-btn', {
                    style: 'position: absolute; left: 10px; top: 10px;', onclick: () => {
                        page.communityMain = 'main';
                    }
                }, [
                    m('img', { src: './assets/icons/arrow-left.svg' }),
                    m('span', 'Back')
                ]),
                m('p.header-1', { style: 'padding: 0; margin-bottom: 20px;' }, 'Create a post'),
                m('input.title-input.dark-1.min-round', { type: 'text', placeholder: 'Title...' }),
                m('br'),
                m('textarea.body-input.dark-1.min-round', { placeholder: 'Type your post here...' }),
                m(btn.createButton({
                    text: 'Create Post',
                    color: 'dark',
                    type: 1,
                    onclick: async () => {
                        await createPost({
                            community_id: com._id,
                            user_id: user,
                            title: $('.title-input').val(),
                            body: $('.body-input').val()
                        });
                        routeCommunityHome();
                    }
                }))
            ])
        ]);
    }
}

module.exports = CreatePostComponent;