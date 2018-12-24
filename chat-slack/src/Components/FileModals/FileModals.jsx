import React, {Component} from 'react';
import { Modal, Input, Button, Icon } from 'semantic-ui-react';

class FileModals extends Component {

    // state = {
    //     modalState: false,
    // }





    // togleModal = () => {
    //     this.setState(prev => ({
    //       modalState: !prev.modalState
    //     }));
    //   };

    render() {

const { modalState, togleModal } = this.props;

        return (

        <Modal open={modalState} onClose={togleModal} >
          <Modal.Header>Select an image file </Modal.Header>
          <Modal.Content>
              <Input fluid label='File types: jpg, png' name='file' type="file" />
          </Modal.Content>
          <Modal.Actions>
              <Button color="green" inverted>
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