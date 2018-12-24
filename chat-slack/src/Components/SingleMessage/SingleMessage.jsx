import React from 'react';
import { Comment } from 'semantic-ui-react';
import moment from 'moment';


const isOwnMessage = (message, user) => message.user.id === user.id ? 'message_self' : '';

const timeFromNow = time => moment(time).fromNow();

const SingleMessage = ({message, user}) => {
    return (
        <Comment>
            <Comment.Avatar src={message.user.avatar} />
            <Comment.Content className={isOwnMessage(message, user)} >
            <Comment.Author as='a'>
            {message.user.name}
            </Comment.Author>
            <Comment.Metadata>
                {timeFromNow(message.time)}
            </Comment.Metadata>
            <Comment.Text>
                {message.content}
            </Comment.Text>
            </Comment.Content>
        </Comment>
    )
}

export default SingleMessage;