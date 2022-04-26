const OverlayComponent = require('./Overlay');
const OverlayPromptComponent = require('./OverlayPrompt');
const btn = require('./Button.js');
const TitleBarComponent = require('./TitleBar');
const SidebarComponent = require('./Sidebar.js');
const GameDisplayComponent = require('./GameDisplay');

const MainComponent = {
    SidebarComponent,
    GameDisplayComponent,
    OverlayComponent,
    view: () => {
        return [
            m(TitleBarComponent),
            page.login ? m('div', [
                m('div', { style: 'transform: translate(25px, 25px); width: fit-content' }, [
                    m('p', { style: 'color: white; margin-bottom: 5px;' }, 'Server URL'),
                    m('input', { placeholder: 'Server URL', value: 'http://127.0.0.1:3000' }),
                    m('button', {
                        onclick: () => {
                            const serverUrl = $('input').val();
                            setSocket(serverUrl);
                            page.login = false;
                            m.redraw();
                        }
                    }, 'Go')
                ])
            ]) :
                m('div#main', [
                    m(OverlayComponent),
                    m(OverlayPromptComponent),
                    m(btn.ResetBtnComponent),
                    m(SidebarComponent),
                    m(GameDisplayComponent)
                ])
        ]
    }
}

module.exports = MainComponent;