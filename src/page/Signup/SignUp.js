import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import StepOne from '../../components/signup/StepOne';
import StepTwo from '../../components/signup/StepTwo';
import StepThree from '../../components/signup/StepThree';
import StepFour from '../../components/signup/StepFour';
import StepFive from '../../components/signup/StepFive';
import StepSix from '../../components/signup/StepSix';
import { Link } from 'react-router-dom';

import Wrapper from './Signup.styledComponent';
import Logo from '../../components/Logo/Logo';
import LandingPage from '../../components/LandingPage/LandingPage'
const SignUp = ({ history }) => {
  const [step, setStep] = useState(1);
  const [myInfo, setmyInfos] = useState({
    email: "",
    fullname: "",
    id: "",
    passion: "",
    password: "",
    photo: "",
    validationCode: "",
  })
  const handleNext = () => {
    setStep(step + 1);
  }
  const handleBack = () => {
    setStep(step - 1);
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepOne
            myInfo={myInfo}
            updateMyInfos={setmyInfos}
            next={handleNext}
          />
        );
      case 2:
        return (
          <StepTwo
            myInfo={myInfo}
            updateMyInfos={setmyInfos}
            next={handleNext}
            back={handleBack}
          />
        );

      case 3:
        return (
          <StepThree
            myInfo={myInfo}
            updateMyInfos={setmyInfos}
            next={handleNext}
            back={handleBack}
          />
        );
      case 4:
        return (
          <StepFour
            myInfo={myInfo}
            updateMyInfos={setmyInfos}
            next={handleNext}
            back={handleBack}
          />
        );
      case 5:
        return (
          <StepFive
            myInfo={myInfo}
            updateMyInfos={setmyInfos}
            next={handleNext}
            back={handleBack}
          />
        );
      case 6:
        return (
          <StepSix
            myInfo={myInfo}
            updateMyInfos={setmyInfos}
          />
        );
      default:
        return (
          <StepOne
            myInfo={myInfo}
            updateMyInfos={setmyInfos}
            next={handleNext}
          />
        );
    }
  }

  return (
    <Wrapper>
      <div className="row wrapper-row custom-height">
        <div className="col-md-6  login-left-banner  sign-up-right my-auto text-center">
          <LandingPage />
        </div>
        <div className="col-md-6 sign-up-left my-auto text-center">
          <div className="modal-signup">
            <div className="modal-signup-top">
              <h3
                style={{ fontSize: '1.2em', lineHeight: '2' }}
                className="title-modal-signup"
              >
                Sign up
            </h3>
              <div
                onClick={() => history.push('/')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  width: '25px',
                  height: '25px',
                  borderRadius: '25px',
                  fontSize: '15px',
                  color: 'rgb(137, 158, 255)',
                  border: '1px solid rgb(137, 158, 255)',
                }}>
                &times;
            </div>
            </div>
            <h1>
              <Logo />
            </h1>
            <div className="modal-signup-content">{renderStep()}</div>
          </div>
        </div>
        <div className="login-footer">
            <ul>
              <li>
              <Link to="/login">Privacy Policy</Link></li>
              <li>  <Link to="/login">Terms And Conditions</Link></li>
              <li> <span>© 2020 PageX, Inc </span> </li>
            </ul>
          </div>                
      </div>

    </Wrapper>
  );
}


export default withRouter(SignUp);
