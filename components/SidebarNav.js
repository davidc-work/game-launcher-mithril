//const navButtons = ['Games', 'Community'];

const generateNavButtons = navButtons => {
    return navButtons.map(title => {
        return m('div.sidebar-nav-button', {
            class: page.sidebarNav == title ? 'selected' : '',
            onclick: () => {
                page.sidebarNav = title;
                if (title == 'Games') {
                    page.communityMain = 'main';
                    page.communitySidebar = 'main';
                }
            }
        }, title);
    });
}

const SidebarNavComponent = {
    view: () => {
        let navButtons = page.community == 'exists' ? ['Games', 'Community'] : ['Games']
        return m('div.sidebar-nav-container', [
            m('div.sidebar-nav-buttons', generateNavButtons(navButtons))
        ]);
    }
}

module.exports = SidebarNavComponent;