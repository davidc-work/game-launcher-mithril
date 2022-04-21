let user = 'test_user';

m = m;  //I hate VSCode "smart" features...
const fs = require('fs');
const path = require('path');
const urlFile = require('url-filea');

const shell = require('electron').shell;
const VDF = require('@node-steam/vdf');
const { GOOGLE_IMG_SCRAP, GOOGLE_QUERY } = require('google-img-scrap');

const parseACF = require('./modules/acf');
const steam = require('./modules/steam');

let steamInstallDir;

let steamGames, allGames;
let com, selectedPublicServer, selectedChannel;
let selectedGame = {}, gameBannerImg;

const socket = io('http://127.0.0.1:3001');
socket.on('connect', () => {
    console.log('connected');
});

socket.on('add-message', data => {
    console.log(data);
    CommunityDisplayComponent.addChat({
        user: data.user,
        msg: data.msg
    });
});

const community = require('./modules/community')(socket);

let page = {
    community: 'exists',
    communityMain: 'main',
    communitySidebar: 'main'
}

const updateGamesList = () => {
    steamGames = steam.getGames();
    allGames = steamGames.sort((a, b) => a.name.localeCompare(b.name));
}

const setPage = (component, pageName) => {
    page[component] = pageName;
    m.redraw();
    requestAnimationFrame(() => feather.replace({ color: 'white' }));
}

const createPublicServer = async () => {
    community.createPublicServer(selectedGame.communityName);
}

const setCommunity = gameName => {
    return new Promise(async resolve => {
        const game = allGames.find(game => game.name == gameName);

        selectedGame = {
            name: game.name,
            url: 'steam://rungameid/' + game.appid,
            communityName: game.name.toLowerCase().replaceAll(' ', '')
        };

        $('#header-text-container > p').text(game.name);

        com = await updateCommunity(selectedGame.communityName);
        setPage('communitySidebar', 'main');
        await routeCommunityHome();

        (async function () {
            const img = await GOOGLE_IMG_SCRAP({
                search: game.name + ' game banner image',
                query: {
                    SIZE: GOOGLE_QUERY.SIZE.LARGE
                }
            });

            gameBannerImg = img.result[0];
            m.redraw();
        })();

        resolve();
    });
}

const updateCommunity = communityName => {
    return new Promise(resolve => {
        (async () => {
            const result = await community.get(communityName);

            setPage('community', result.exists ? 'exists' : 'not-exists');

            resolve(result);
        })();
    });
}

const routeCommunityHome = () => {
    return new Promise(resolve => {
        if (!com.exists) resolve();

        selectedPublicServer = undefined;
        selectedChannel = undefined;
        MainComponent.GameDisplayComponent.CommunityComponent.CommunitySidebarComponent.MainCommunityContentComponent.setPublicServers(com.publicServers);

        setPage('communitySidebar', 'main');
        setPage('communityMain', 'main');

        resolve();
    });
}

const reset = async () => {
    const res = await community.reset();
    console.log(res);
}

const routeCommunityServer = serverName => {
    return new Promise(async resolve => {
        if (!com.exists) resolve();

        let serverData;
        if (serverData = com.publicServers.find(server => server.name == serverName)) {
            selectedPublicServer = serverData;

            setPage('communitySidebar', 'server');

            const server = await community.getServer(com.name, serverData.name);

            server.channels.forEach(channel => {
                const e = $('<div>').addClass('channel-list-item btn btn-sidebar');
                e.append($('<p>').text(channel.name));
                e.click(() => selectChannel(server, channel.name));
                $('#channel-list').append(e);
            });

            selectChannel(server, 'main');
        }

        resolve();
    });
}

const selectChannel = async (server, channelName) => {
    const channel = server.channels.find(channel => channel.name == channelName);
    selectedChannel = channel;

    const answer = await community.joinChannel(selectedChannel._id);
    console.log(answer);

    const chat = channel.chat;

    if (!chat) return;

    $('.channel-list-item').removeClass('selected');
    $($('.channel-list-item').toArray().find(e => e.children[0].innerText == channelName)).addClass('selected');
    CommunityDisplayComponent.setChat(chat.messages);
    setPage('communityMain', 'server');
}

const selectGame = async gameName => {
    const listElements = $('.game-sidebar-list-element').toArray();
    const selectedElement = listElements.find(e => e.children[0].innerText == gameName);

    $('.game-sidebar-list-element').removeClass('selected');
    $(selectedElement).addClass('selected');

    await setCommunity(gameName);

    await routeCommunityHome();
}

const createCommunity = async () => {
    const result = await community.create(selectedGame.communityName);
    await setCommunity(selectedGame.name);
}

const populateGamesList = () => {
    updateGamesList();

    const sidebarElement = $('#game-sidebar');

    allGames.forEach(game => {
        var e = $('<div>').addClass('game-sidebar-list-element').click(function () { selectGame(game.name) });
        $('<p>').text(game.name).appendTo(e);

        sidebarElement.append(e);
    });

    selectGame(allGames[0].name);
}

const playSelectedGame = () => {
    if (selectedGame.url) {
        shell.openExternal(selectedGame.url);
    }
}

const sendChat = community.sendChat;

$(document).ready(() => {
    require('fetch-installed-software').getAllInstalledSoftware().then(programs => {
        const steamInfo = programs.find(program => program.RegistryDirName == 'Steam');
        steamInstallDir = steamInfo.DisplayIcon.slice(0, steamInfo.DisplayIcon.lastIndexOf('\\'));

        populateGamesList();
    });
});