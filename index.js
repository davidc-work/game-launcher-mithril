const isDev = true;
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

let socket, community;
let sendChat;

const setSocket = serverUrl => {
    socket = io(serverUrl);

    socket.on('connect', () => {
        console.log('connected');
    });

    socket.on('add-message', data => {
        CommunityDisplayComponent.addChat({
            user: data.user,
            msg: data.msg
        });
    });

    community = require('./modules/community')(socket);

    require('fetch-installed-software').getAllInstalledSoftware().then(programs => {
        const steamInfo = programs.find(program => program.RegistryDirName == 'Steam');
        steamInstallDir = steamInfo.DisplayIcon.slice(0, steamInfo.DisplayIcon.lastIndexOf('\\'));

        populateGamesList();
    });
}

let page = {
    login: !isDev,
    community: 'exists',
    communityMain: 'main',
    communityTab: 'hot',
    communitySidebar: 'main',
    overlay: false,
    createServerPrompt: false
}

const updateGamesList = () => {
    steamGames = steam.getGames();
    allGames = steamGames.sort((a, b) => a.name.localeCompare(b.name));
}

const setPage = (component, pageName) => {
    page[component] = pageName;
    requestAnimationFrame(() => feather.replace({ color: 'white' }));
}

const setPosts = () => {
    return new Promise(async resolve => {
        const posts = await community.emit('get-posts', { community_id: com._id });
        await MainComponent.GameDisplayComponent.CommunityComponent.CommunityDisplayComponent.CommunityMainComponent.setPosts(posts);
        resolve();
    })
}

const setPublicServers = () => {
    return new Promise(async resolve => {
        const publicServers = await community.emit('get-public-servers', { community_id: com._id });
        await MainCommunityContentComponent.setPublicServers(publicServers);
        resolve();
    })
}

const showPublicServerPrompt = () => {
    page.overlayPrompt = 'create-server';
    page.overlay = true;
}

const createPost = data => {
    return new Promise(async resolve => {
        const result = await community.emit('create-post', data);
        //console.log(result);
        resolve(result);
    });
}

const createPublicServer = async serverName => {
    const result = await community.emit('create-public-server', {
        communityName: com.name,
        serverName
    });
    await setPublicServers();
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
        await setPublicServers();
        setPage('communitySidebar', 'main');

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

const updateCommunity = name => {
    return new Promise(async resolve => {
        const result = await community.emit('get-community', { name });

        setPage('community', result.exists ? 'exists' : 'not-exists');

        resolve(result);
    });
}

const routeCommunityHome = () => {
    return new Promise(resolve => {
        if (!com.exists) resolve();

        selectedPublicServer = undefined;
        selectedChannel = undefined;
        setPosts();
        setPublicServers();

        page.communitySidebar = 'main';
        page.communityMain = 'main';

        m.redraw();

        resolve();
    });
}

const reset = async () => {
    const res = await community.emit('reset-communities');
    console.log(res);
}

const routeCommunityServer = serverName => {
    return new Promise(async resolve => {
        if (!com.exists) resolve();

        let serverData;
        if (serverData = com.publicServers.find(server => server.name == serverName)) {
            selectedPublicServer = serverData;

            setPage('communitySidebar', 'server');

            const server = await community.emit('get-server', { community: com.name, serverName: serverData.name });

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

    const channelData = await community.emit('join-channel', { channel_id: selectedChannel._id });

    const { chat } = channelData;

    if (!chat) return;

    $('.channel-list-item').removeClass('selected');
    $($('.channel-list-item').toArray().find(e => e.children[0].innerText == channelName)).addClass('selected');
    CommunityDisplayComponent.setChat(chat);
    setPage('communityMain', 'channel');
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
    const result = await community.emit('create-community', { name: selectedGame.communityName });
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

$(document).ready(() => {
    if (isDev) setSocket('http://localhost:3000');
});