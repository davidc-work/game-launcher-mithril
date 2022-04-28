const CommentComponent = require('../components/Comment');

module.exports = comments => {
    let chain = [];
    for (var i = 0; i < comments.length; i++) {
        const c = comments[i];
        chain.push(c);
        if (c.replyTo != null) {
            const com = comments.find(comment => comment.id == c.replyTo);
            if (com) {
                com.children = (com.children || []).concat(c);
                chain = chain.slice(0, -1);
            }
        }
    }

    return chain.map(c => m(CommentComponent(c)));
}