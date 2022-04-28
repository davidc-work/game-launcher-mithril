const btn = require('./Button');

const commentBoxes = [];

const toggleCommentBox = (comment_id, set = undefined) => {
    if (set != undefined) commentBoxes[comment_id] = set;
    else commentBoxes[comment_id] = !(commentBoxes[comment_id] || false);
}

const createCommentComponent = (comment, nested = 0) => {
    const { user_id, body, date, children } = comment;
    const childrenComponents = children ? (children.length ? children.map(c => m(CommentComponent(c, nested + 1))) : []) : [];

    return m('div.comment', {
        style: 'margin-left: 15px'
    }, [
        m('div.comment-content', [
            m('p', user_id),
            m('p', body),
            m('div.buttons', [
                m('p', {
                    onclick: () => toggleCommentBox(comment.id)
                }, 'reply')
            ]),
            commentBoxes[comment.id] ?
                m('div.comment-input-container', [
                    m('textarea.comment-box.dark-1', { placeholder: 'Comment...', style: 'width: 335px; height: 120px;' }),
                    m(btn.createButton({
                        text: 'Post',
                        color: 'dark',
                        type: 1,
                        style: 'margin-left: 10px; margin-bottom: 10px;',
                        onclick: function () {
                            newComment(this.parentElement.children[0].value, comment.id);
                            toggleCommentBox(comment.id, false);
                        }
                    }))
                ]) : ''
        ]),
        m('div.children-container', childrenComponents)
    ]);
}

const CommentComponent = (comment, nested = 0) => {
    return { view: () => createCommentComponent(comment, nested) }
}

globalComponents.comment = CommentComponent;

module.exports = CommentComponent;