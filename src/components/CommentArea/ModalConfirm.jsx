import { Modal, Button } from "react-bootstrap";
import { SlTrash } from "react-icons/sl";

export default function ModalConfirm ({confirm, show, modalClose, modalShow}) {


    return (
        <>
        <Button className="delete-comment-button" onClick={modalShow}>
                <SlTrash/>
        </Button>     
        <Modal show={show} onHide={modalClose}>
            <Modal.Body className="fs-5">Stai per cancellare questo commento, confermi?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={modalClose}>
                Annulla
                </Button>
                <Button variant="success" onClick={confirm}>
                Conferma
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}