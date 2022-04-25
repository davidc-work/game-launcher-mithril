const btn = require('./Button');

const CreatePostComponent = {
    view: () => {
        return m('div.create-post-container', [
            m('div.create-post', [
                m('span.back-btn', {
                    style: 'position: absolute; left: 10px; top: 10px;', onclick: () => {
                        page.communityMain = 'main';
                    }
                }, [
                    m('img', { src: './assets/icons/arrow-left.svg' }),
                    m('span', 'Back')
                ]),
                m('input.title-input.dark-1.min-round', { type: 'text', placeholder: 'Title...' }),
                m('br'),
                m('textarea.body-input.dark-1.min-round', { placeholder: 'Type your post here...' }),
                m(btn.BlueBtnComponent({
                    text: 'Create Post',
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