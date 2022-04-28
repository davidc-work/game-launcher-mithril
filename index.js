// TODO: move most of this shit to community module

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
let com, selectedPublicServer, selectedChannel, selectedPost;
let postComments;
let selectedGame = {}, serverChannels, gameBannerImg;

let socket, community;
let sendChat;

const globalComponents = {};

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

const setComments = post_id => {
    return new Promise(async resolve => {
        const comments = await getComments(post_id);

        postComments = require('./modules/generateComments')(comments);
        m.redraw();
    });
}

const getComments = post_id => {
    return new Promise(async resolve => {
        const response = await community.emit('get-comment-section', { post_id });

        resolve(response.comments);
    });
}

const newComment = (comment, replyTo = null) => {
    return new Promise(async resolve => {
        const c = await community.emit('create-comment', {
            user_id: user,
            body: comment,
            date: new Date(),
            post_id: selectedPost._id,
            replyTo
        });

        await setComments(selectedPost._id);

        resolve(c);
    })
}

const createPublicServer = async serverName => {
    const result = await community.emit('create-public-server', {
        communityName: com.name,
        serverName
    });
    await setPublicServers();
}

const createChannel = name => {
    return new Promise(async resolve => {
        const result = await community.emit('create-channel', {
            channelName: name,
            server_id: selectedPublicServer._id
        });

        await routeCommunityServer(selectedPublicServer.name);

        resolve();
    });
}

const generateCommunityName = gameName => gameName.replace(/[^a-z0-9]/gi, '').toLowerCase();

const setCommunity = gameName => {
    return new Promise(async resolve => {
        const game = allGames.find(game => game.name == gameName);

        selectedGame = {
            name: game.name,
            url: 'steam://rungameid/' + game.appid,
            communityName: generateCommunityName(game.name)
        };

        $('#header-text-container > p').text(game.name);

        com = await updateCommunity(selectedGame.communityName);
        await setPublicServers();

        page.communitySidebar = 'main';
        m.redraw();

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

        page.community = result.exists ? 'exists' : 'not-exists';
        m.redraw();

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

const getChannels = () => {
    return new Promise(async resolve => {
        const channels = await community.emit('get-channels', { server_id: selectedPublicServer._id });
        resolve(channels);
    })
}

const updateChannels = () => {

}

const routeCommunityServer = serverName => {
    return new Promise(async resolve => {
        if (!com.exists) resolve();

        let serverData;
        if (serverData = com.publicServers.find(server => server.name == serverName)) {
            selectedPublicServer = serverData;

            page.communitySidebar = 'server';

            //const server = await community.emit('get-server', { community: com.name, serverName: serverData.name });

            serverChannels = await getChannels();
            await selectChannel(serverChannels[0]._id);
            globalComponents.serverContent.setChannels(serverChannels);
        }

        resolve();
    });
}

const selectChannel = async channel_id => {
    return new Promise(async resolve => {
        //const channel = server.channels.find(channel => channel.name == channelName);
        selectedChannel = await community.emit('get-channel', { channel_id });
        if (!selectedChannel) return routeCommunityHome();

        const joined = await community.emit('join-channel', { channel_id });

        const { chat } = selectedChannel;

        if (!chat) return;
        CommunityDisplayComponent.setChat(chat);
        page.communityMain = 'channel';
        m.redraw();

        resolve();
    });
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