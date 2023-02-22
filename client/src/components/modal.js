import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from '../components/todoform'
const modal = ({open,handleClose,children}) => {

    return(
    <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add TODO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )

};

export default modal;