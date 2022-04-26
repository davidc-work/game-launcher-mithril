const remote = require('@electron/remote');
const win = remote.getCurrentWindow();

const TitleBarComponent = {
    view: () => {
        return m('div.title-bar', [
            m('div.btn-container', [
                m('div.title-bar-btn-container', {
                    onclick: () => {
                        win.minimize();
                    }
                }, [
                    m('img.title-bar-btn', { src: './assets/icons/minus.svg' })
                ]),
                m('div.title-bar-btn-container', {
                    onclick: () => {
                        win.maximize();
                    }
                }, [
                    m('img.title-bar-btn', { src: './assets/icons/square.svg' }),
                ]),
                m('div.title-bar-btn-container', {
                    onclick: () => {
                        win.close();
                    }
                }, [
                    m('img.title-bar-btn', { src: './assets/icons/x.svg' })
                ])

            ])
        ]);
    }
}

module.exports = TitleBarComponent;