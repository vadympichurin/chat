import React, {Component} from 'react';
import { Modal, Input, Button, Icon } from 'semantic-ui-react';
import mime from 'mime-types';

class FileModals extends Component {

    state = {
        file: null,
        correctType: ['image/jpg', 'image/jpeg', 'image/png'],
    }

    addFile = e => {
        const file = e.target.files[0];
        if(file) {
            this.setState({file});
        }
    }

    sendFile = () => {
        if(this.state.file !== null) {
            if(this.isFileCorrectType(this.state.file.name)) {
                const metadata = {
                    contentType: mime.lookup(this.state.file.name)
                };
                this.props.uploadFile(this.state.file, metadata);
                this.props.togleModal();
                this.setState({
                    file: null,
                })
            }
        }
    }

    isFileCorrectType = fileName => this.state.correctType.includes(mime.lookup(fileName));

    // uploadFile = (file, metadata) => {
        
    //     console.log(file, metadata);
    // }


    render() {

const { modalState, togleModal } = this.props;

        return (

        <Modal open={modalState} onClose={togleModal} >
          <Modal.Header>Select an image file </Modal.Header>
          <Modal.Content>
              <Input onChange={this.addFile} fluid label='File types: jpg, png' name='file' type="file" />
          </Modal.Content>
          <Modal.Actions>
              <Button color="green" inverted onClick={this.sendFile}>
              <Icon name="checkmark" /> Send
              </Button>
              <Button color="red" inverted onClick={togleModal}>
              <Icon name="remove" /> Cancel
              </Button>
          </Modal.Actions>
        </Modal>
        )
    }
}

export default FileModals;