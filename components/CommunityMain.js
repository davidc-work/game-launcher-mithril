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
    console.log(p);
    return p.map(post => {
        return m('div.post-listing', {
            onclick: () => {
                MainComponent.GameDisplayComponent.CommunityComponent.CommunityDisplayComponent.setPost(post);
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
            m('div#posts-container', generatePosts())
        ]);
    },
    setPosts
}

module.exports = CommunityMainComponent;