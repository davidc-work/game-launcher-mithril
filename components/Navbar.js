const NavbarComponent = options => {
    return {
        view: () => {
            if (!options.navButtons) return null;
            const navButtons = options.navButtons.map(btn => {
                return m('div.nav-btn', btn.options, btn.text);
            })
            return m('div.navbar', navButtons);
        }
    }
}

module.exports = NavbarComponent;