const createButton = o => {
    return ({
        view: () => {
            let cls = 'btn';
            if (o.type) cls += ' btn-' + o.type;
            if (o.color) cls += ' btn-' + o.color;

            return m('div', {
                id: o.id || '',
                onclick: o.onclick,
                class: cls,
                style: o.style
            }, o.text);
        }
    });
}

const BlueBtnComponent = o => {
    let options = Object.assign({
        type: 1,
        color: 'blue'
    }, o);
    return (createButton(options));
}

const ResetBtnComponent = () => {
    return (createButton({
        text: 'Reset',
        type: 1,
        color: 'blue',
        style: 'position: absolute; right: 10px; top: 10px; z-index: 9;',
        onclick: () => reset()
    }));
}

const PlayBtnComponent = () => {
    return (createButton({
        text: 'Play',
        type: 1,
        color: 'blue',
        id: 'play-button',
        onclick: () => playSelectedGame()
    }));
}

const CreateCommunityBtnComponent = () => {
    return (createButton({
        text: 'Request Community',
        type: 1,
        color: 'blue',
        id: 'create-community-button',
        onclick: () => createCommunity()
    }));
}

const CreatePublicServerBtnComponent = () => {
    return (createButton({
        text: '+ Create Public Server',
        type: 'sidebar',
        onclick: () => showPublicServerPrompt()
    }));
}

module.exports = {
    createButton,
    BlueBtnComponent,
    ResetBtnComponent,
    PlayBtnComponent,
    CreateCommunityBtnComponent,
    CreatePublicServerBtnComponent
};