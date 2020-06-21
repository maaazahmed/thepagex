import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Modal,
  Container,
  Spinner,
} from 'react-bootstrap';
import './authentication-styles.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUserAction } from '../../store/actions/';
import Logo from '../Logo/Logo';
import LandingPage from '../LandingPage/LandingPage'

const customNotification = require('../../Utils/notification');

const Login =({ onloginUserAction, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fetching, setFetching] = useState(false);
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
  useEffect(()=>{
    return function cleanup() {
      setFetching(false);
    };
  })
  const handleSubmit =() => {
    let validateEmail = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);
    if (!email || !password) {
      customNotification.fireNotification('warning', 'All fields are required');
      return false;
    } else if (!validateEmail.test(email)) {
      customNotification.fireNotification('warning', 'Email not valid');
    } else {
      // Login user
      let data = {
        data: {
          email,
          password
        },
      };
      setFetching(true);
      onloginUserAction(data).then((res)=>{
        if(res.token) history.push('/home');
        else {
          if(res.msg) customNotification.fireNotification('warning', res.msg);
          else customNotification.fireNotification('warning', "Please retray again");
        }
        setFetching(false);
      })
    }
  }

    return (
     
      <div className="my-auto">
        <div className="wrapper-row row cutom-height">
        <div className="col-md-6 login-left-banner my-auto text-center">
          <LandingPage/>
        </div>
        <div className="col-md-6 login-right my-auto"> 
        <Modal.Dialog  id="custom-modal" centered={true} size="lg">
          <Modal.Header className="text-center">
            <Modal.Title id="example-custom-modal-styling-title" className="text-center">
              Sign in
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="text-center">
              <Logo />
            </div>
            <Container>
                  <div style={{padding: "2rem"}}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        name="email"
                        required
                        type="email"
                        placeholder="Email"
                        onChange={handleEmailChange}
                        value={email || ""}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                        value={password || ""}
                      />
                      <p className="create-acc-link">
                        Don't have an account?{' '}
                        <Link to="/signup">Create an account.</Link>
                      </p>
                    </Form.Group>
                    <div className="text-center">
                      <Button className="auth-page-btn" onClick={handleSubmit}>
                        Sign in
                      </Button>
                      {fetching && (
                        <Spinner className="spinner" animation="border" />
                      )}
                    </div>
                  </div>
            </Container>
          </Modal.Body>
        </Modal.Dialog>
        </div>
        </div>
        <div className="login-footer">
            <ul>
              <li><a href="https://sites.google.com/view/pagex-privacy-policy/home"  rel="noopener noreferrer" target="_blank">Privacy Policy</a> </li>
              <li><a href="https://sites.google.com/view/terms-of-use-page-x/home" rel="noopener noreferrer" target="_blank">Terms And Conditions</a> </li>
              <li> <span>© 2020 PageX, Inc </span> </li>
            </ul>
          </div>                
      </div>
    );
}

const state = (state, ownProps = {}) => {
  return {
    myInfo: state.myInfo,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    onloginUserAction: (data) => dispatch(loginUserAction(data)), 
  }
)
  

export default withRouter(connect(state, mapDispatchToProps)(Login));
