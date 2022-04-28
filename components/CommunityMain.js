let p = [];

const NavbarComponent = require('./Navbar');

const generateDefaultNavbuttons = () => {
    const btns = ['Hot', 'Top', 'Rising', 'Controversial', 'Newest'];
    return btns.map(btn => {
        return {
            text: btn,
            options: {
                class: page.communityTab == btn.toLowerCase() ? 'selected' : '',
                onclick: () => {
                    page.communityTab = btn.toLowerCase()
                }
            }
        }
    })
}

const generatePosts = () => {
    return p.map(post => {
        return m('div.post-listing', {
            onclick: () => {
                setComments(post._id);
                selectedPost = post;
                $('#posts-container').addClass('exiting left');
                setTimeout(() => $('#community-main .navbar').addClass('exiting minimize'), 1);
                setTimeout(() => MainComponent.GameDisplayComponent.CommunityComponent.CommunityDisplayComponent.setPost(post), 250);
            }
        }, [
            m('div.post-listing-inner', [
                m('img', { src: './assets/icons/message-square.svg' }),
                m('div.right-content', [
                    m('p', post.title),
                    m('p', 'Submitted by ' + post.user_id)
                ])
            ])
        ])
    });
}

const setPosts = posts => p = posts;

const CommunityMainComponent = {
    view: () => {
        return m('div#community-main', [
            m(NavbarComponent({
                navButtons: generateDefaultNavbuttons()
            })),
            m('div#posts-container', generatePosts()),
            m('div#create-post-btn', {
                onclick: () => {
                    page.communityMain = 'createPost';
                }
            }, [
                m('p', '+'),
                m('div.pop-out-text', [
                    m('p', 'Create a new post')
                ])
            ])
        ]);
    },
    setPosts
}

module.exports = CommunityMainComponent;