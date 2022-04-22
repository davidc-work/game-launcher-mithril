const axios = require('axios');
const url = 'http://localhost:3000';

const community = socket => {
    const getCommunity = name => {
        return new Promise(resolve => {
            socket.emit('get-community', name, answer => {
                resolve(answer);
            });
        });
    }

    return ({
        socket,
        getCommunity,
        getPublicServers: community_id => {
            return new Promise(resolve => {
                socket.emit('get-public-servers', community_id, answer => {
                    resolve(answer);
                });
            });
        },
        getServer: (communityName, serverName) => {
            return new Promise(resolve => {
                socket.emit('get-server', { communityName, serverName }, answer => {
                    resolve(answer);
                });
            });
        },
        createCommunity: name => {
            return new Promise(resolve => {
                socket.emit('create-community', name, answer => {
                    resolve(answer);
                });
            });
        },
        createPublicServer: async (communityName, serverName) => {
            return new Promise(async resolve => {
                socket.emit('create-public-server', { communityName, serverName }, answer => {
                    resolve(answer);
                });
            });
        },
        sendChat: async (user, msg, channel) => {
            return new Promise(resolve => {
                socket.emit('send-message', { user, msg, channel_id: channel._id }, answer => {
                    resolve(answer);
                });
            });
        },
        reset: () => {
            return new Promise(async resolve => {
                socket.emit('reset-communities', answer => {
                    resolve(answer);
                });
            });
        },
        joinChannel: channel_id => {
            return new Promise(async resolve => {
                socket.emit('join-channel', channel_id, answer => {
                    resolve(answer);
                });
            });
        }
    });
}

module.exports = community;