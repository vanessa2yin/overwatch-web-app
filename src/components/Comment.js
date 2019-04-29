import React, { Component } from 'react';
import '../styles/IndividualHeroPage.css';

class Comment extends Component {

    render() {
        const title = this.props.commentData.title;
        const email = this.props.commentData.email;
        const context = this.props.commentData.context;
        const index = this.props.index;
        return (
            <div className="EachCommentPostedContainer">
                <div className="commentTitle">{title}</div>
                <div className="commentEmail">{email}</div>
                <div className="commentContext">{context}</div>
                <div className="commentIndex">#{index}</div>
            </div>
        );
    }
}

export default Comment;
