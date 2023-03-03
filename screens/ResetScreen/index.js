import React, { Fragment, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
//import Link from 'next/link'
import { notComplete } from "../../config/errorMessages";
import { notMatch } from "../../config/errorMessages";
import { setAlert } from "../../actions/alertActions";
import { succComplete } from "../../config/successMessages";
import Image from 'next/image'
import styles from './reset.module.scss'
import { APIresetPassword } from '../../config/API'
import axios from 'axios'
import { useRouter } from 'next/router'

const resetScreen = ({ GID }) => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        new_password: "",
        confirm_password: "",
    });
    const [isRedirect, setRedirect] = useState(false);
    const [alertText, setAlertText] = useState(null)
    const { new_password, confirm_password } = formData;
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    if (isRedirect) {
        router.push("/");
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        // console.log("yup")
        if (new_password === confirm_password) {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                // console.log(GID)
                const body = {
                    guid: GID,
                    new_pass: new_password,
                };

                const result = await axios.post(APIresetPassword, body, config);

                if (result.data.status === true) {
                    setAlertText("success")
                    setAlert(succComplete, "info");
                    setRedirect(true);
                } else {
                    setAlertText("Not able to update")
                    setAlert(notComplete, "danger");
                }
            } catch (err) {
                setAlertText("Some error occured")
                setAlert(notComplete, "danger");
            }
        } else {
            setAlertText("Does not Match")
            setAlert(notMatch, "danger");
        }
    };

    return (
        <Fragment>
            <Container fluid className="bg-black">
                <Container className={styles.resetScreen}>
                    <Row style={{
                        paddingTop: '90px',
                        paddingBottom: '90px',
                    }}>
                        <Col>
                            <Row style={{
                                position: 'relative',
                                width: '750px',
                                margin: 'auto',
                                background: '#ffffff',
                                borderRadius: '5px'
                            }}>
                                <Col className="pt-5 pb-5 mb-3" style={{
                                    paddingLeft: '30px',
                                    paddingRight: '30px'
                                }}>
                                    <Row>
                                        <Col className='text-center'>
                                            <Row>
                                                <Col className={styles.loginHolo}>
                                                    <Image
                                                        src="/logo/b-holo.png"
                                                        alt="Text Logo"
                                                        width="70"
                                                        height="59"
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className={styles.titleModal}>
                                                    <h4 style={{
                                                        color: '#000000',
                                                        fontWeight: '600',
                                                        letterSpacing: '0.03rem',
                                                        marginBottom: '0',
                                                        fontSize: '1.4rem',
                                                        opacity: '0.9',
                                                        padding: '10px 0px 20px 0px'
                                                    }}>Creat new password</h4>
                                                    {alertText}
                                                    <h6 style={{
                                                        letterSpacing: '0.03rem',
                                                        fontSize: '18px',
                                                        opacity: '0.8',
                                                        color: '#000000'
                                                    }}>We'll ask for this password whenever you Sign-In.</h6>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form  onSubmit={onSubmit} style={{
                                                            maxWidth: '100%',
                                                            width: '50%',
                                                            margin: 'auto'
                                                        }}>
                                                <Row>
                                                    <Col className='pt-4 pb-3'>
                                                        <Form.Group className='mb-3 text-left' controlId='formBasicEmail'>
                                                            <Form.Control type='password' placeholder='New password' value={new_password} name="new_password"
                                                                required
                                                                onChange={onChange}
                                                                pattern=".{5,}"
                                                                title="Enter atleast 5 characters" />
                                                        </Form.Group>
                                                        <Form.Group className='mb-3 text-left' controlId='formBasicEmail'>
                                                            <Form.Control type='password' placeholder='Confirm password' name="confirm_password" value={confirm_password}
                                                                onChange={onChange}
                                                                required
                                                                pattern=".{5,}"
                                                                title="Enter atleast 5 characters" />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="text-center">
                                                        <Button className={styles.loginButton} type="submit">
                                                            Save Changes
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </Fragment>
    )
}

export default resetScreen
