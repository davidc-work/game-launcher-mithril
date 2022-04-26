let name;

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
                            m('input.dark-1', { type: 'text', onkeyup: e => name = e.target.value, placeholder: 'Server Name' }),
                            m(btn.createButton({
                                text: 'Create',
                                type: 1,
                                color: 'dark',
                                onclick: async () => {
                                    await createPublicServer(name);
                                    MainComponent.OverlayComponent.close();
                                }
                            }))
                        ])
                    ])
                ]);
            case 'create-channel':
                return m('div.overlay-prompt', [
                    m('div.prompt-header', [
                        m('p', 'Create Channel')
                    ]),
                    m('div.prompt-main', [
                        m('p.prompt-label', 'Enter your new channel\'s name...'),
                        m('div.input-container', [
                            m('input.dark-1', { type: 'text', onkeyup: e => name = e.target.value, placeholder: 'Channel Name' }),
                            m(btn.createButton({
                                text: 'Create',
                                type: 1,
                                color: 'dark',
                                onclick: async () => {
                                    await createChannel(name);
                                    MainComponent.OverlayComponent.close();
                                }
                            }))
                        ])
                    ])
                ]);
            default:
                return '';
        }

    }
}

module.exports = OverlayPromptComponent;