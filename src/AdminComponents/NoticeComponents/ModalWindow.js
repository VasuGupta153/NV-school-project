import React from "react"
import Modal from "react-bootstrap/Modal";
// import "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import "./ModalWindow.css"
 
const ModalWindow = ({notice, isOpen, hideModal}) => {
    return(
        <Modal style= {{top: "0"}} show={isOpen} onHide={hideModal}>
            <Modal.Header>
                <Modal.Title>
                    {notice.noticeHeading}
                </Modal.Title>
                <div>{notice.date}</div>
            </Modal.Header>
            <Modal.Body style={{paddingBottom: "150px"}}><p>{notice.noticeContent}</p></Modal.Body>
            <Modal.Footer>
                <button className="modal-btn" onClick={hideModal}>Close</button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalWindow;