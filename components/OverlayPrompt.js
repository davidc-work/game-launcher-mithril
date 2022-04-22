let serverName;

const btn = require('./Button');

const OverlayPromptComponent = {
    view: () => {
        if (!page.overlayPrompt) return null;
        switch (page.overlayPrompt) {
            case 'create-server':
                return m('div.overlay-prompt', [
                    m('div.prompt-header', [
                        m('p', 'Create Public Server')
                    ]),
                    m('div.prompt-main', [
                        m('p.prompt-label', 'Enter your new server\'s name...'),
                        m('div.input-container', [
                            m('input.dark-1', { type: 'text', onkeyup: e => serverName = e.target.value, placeholder: 'Server Name' }),
                            m(btn.createButton({
                                text: 'Create',
                                type: 1,
                                color: 'dark',
                                onclick: async () => {
                                    await createPublicServer(serverName);
                                    MainComponent.OverlayComponent.close();
                                }
                            }))
                        ])
                    ])
                ]);
        }

    }
}

module.exports = OverlayPromptComponent;