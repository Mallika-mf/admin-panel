import React from 'react'
import {Modal,Container,Col,Row,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const  MydModalWithGrid = (props) => {
    return (
        <Modal
          show={props.show}
          onHide={props.onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }}>{props.titleName}</Modal.Title>{console.log(props.titleName)}
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-md-9">
                  {/* <Icofont size="6" icon="warning-alt" /> */}

                  <h3>
                    Please clear your current cart items to add the new items
                    into your cart!
                  </h3>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className="btn--rounded"
              onClick={props.onHide}
            >
              Close
            </Button>
            {/* <Button
              variant="primary"
              className="btn--rounded"
              onClick={this.handleOk}
            >
              Ok
            </Button> */}
          </Modal.Footer>
        </Modal>
    );
  }

  export default MydModalWithGrid