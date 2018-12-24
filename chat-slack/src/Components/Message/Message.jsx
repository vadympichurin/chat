import  React, { Component } from 'react';
import { Segment, Comment } from 'semantic-ui-react';
import MessageHeader from '../MessageHeader/MessageHeader';
import MessageForm from '../MessageForm/MessageForm';

class Message extends Component {
    render () {
        return (
            <React.Fragment>
                <MessageHeader/>
                <Segment>
                    <Comment.Group className='messages'>
                    </Comment.Group>
                </Segment>

                <MessageForm/>
                
            </React.Fragment>
        )
    }
}

export default Message;