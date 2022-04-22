const NavbarComponent = require('./Navbar');

const generateDefaultNavbuttons = () => {
    const btns = ['Hot', 'Top', 'Rising', 'Controversial', 'Newest'];
    return btns.map(btn => {
        return {
            text: btn,
            options: {
                class: page.communityMain == btn.toLowerCase() ? 'selected' : '',
                onclick: () => {
                    page.communityMain = btn.toLowerCase()
                }
            }
        }
    })
}

const CommunityMainComponent = {
    view: () => {
        return m('div#community-main', [
            m(NavbarComponent({
                navButtons: generateDefaultNavbuttons()
            }))
        ]);
    }
}

module.exports = CommunityMainComponent;