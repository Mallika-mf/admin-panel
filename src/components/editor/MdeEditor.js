import React, { useState,Fragment } from 'react';
import BreadCrumb from '../../layout/Breadcrumb'
import {Container,Row,Col,Card,CardHeader,CardBody} from 'reactstrap'
import SimpleMDE from "react-simplemde-editor";
const MdeEDitor = (props) => {
    const [text,setText] = useState(`Enter text in the area on the left. For more info, click the ? (help) icon in the menu.`)
    const handleChange = () => {
        setText("Enter text in the area on the left. For more info, click the ? (help) icon in the menu.")
    }
    return (
        <Fragment>
        <BreadCrumb parent="Home" subparent="Editors" title="MDE Editor"/>
        <Container fluid={true}>
            <Row>
              <Col sm="12">
                <Card>
                  <CardHeader>
                    <h5>MDE Editor Example</h5>
                  </CardHeader>
                  <CardBody>
                    <SimpleMDE
                        id="editor_container"
                        onChange={handleChange}
                        value={text}
                        options={{
                            autofocus: true,
                            spellChecker: false
                        }}
                        />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
          </Fragment>
    );
}

export default MdeEDitor;