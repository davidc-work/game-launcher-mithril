const axios = require('axios');
const url = 'http://localhost:3000';

const community = socket => {
    return ({
        emit: (channel, data = {}) => {
            return new Promise(resolve => {
                socket.emit(channel, data, answer => {
                    resolve(answer);
                });
            })
        }
    });
}

module.exports = community;