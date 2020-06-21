import React, {useState} from "react";
import styled from "styled-components";
import PromotedPost from './PromotedPost';
import moment from "moment";
import { getImageFullUrl } from "../../Utils/utils";
import {connect} from "react-redux";
import {promotePostAction} from "../../store/actions/ContentAction/ContentAction";
const customNotification = require('../../Utils/notification');

const Wrapper = styled.div`
  background: #00000055;
  z-index: 500;
  top: 0;
  left: 0;  
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  align-items: center;
justify-content: center;

  .modal-promote {
    width:100%;
   max-width: 700px;
    background: #fff;
    z-index: 13;
    box-shadow: 0px 3px 30px #00000029;
    border-radius: 20px;
    color: #000;
    min-height: 400px;
    max-height: 100vh;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .modal-promote-title {
    width: 98%;
    padding: 0px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #00000029;
    font-size: 1.2rem;
    color: rgb(109, 109, 109);
  }
  .modal-promote-title h1 {
    font-size: 1.2rem;
    font-family: 'Roboto';
    margin-bottom: -2px;
  }

  .btn-close {
    color: rgb(63, 83, 169);
    width: 20px;
    height: 20px;
    text-align: center;
    // line-height: 20px;
    cursor: pointer;
    font-size: 1.8rem;
    border-radius: 50%;
  }

  .modal-promote-content {
    width: 95%;
    height: 145px;
    margin: 40px 0px 11px;
    margin: 15px 0;
    display: flex;
    margin-left: 12px;
    // align-items: center;
    justify-content: space-between;

    img {
      width: 60px;
      height: 60px;
    }
  }

  .modal-promote-input {
    flex-grow: 1;
    height: 145px;
    padding: 10px;
    // background: #f2f2f2;
    border: none;
    margin: 0 10px;
    border-radius: 10px;
    resize: none;
    background: rgb(247, 247, 247);

  }

  .modal-promote-bottom {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }

  .btn-promote {
    width: 100px;
    height: 31px;
    border: none;
		background: #899eff;
    color: #fff;
    box-shadow: 0px 3px 2px #00000029;
    font-size: 13px;
    border-radius: 21px;
    cursor: pointer;
  }
  .modal-promote-article {
  }
`;

const PromotePost = ({close, content, myInfo, onPromotePostAction}) => {
    console.log(content);

    const [postContent, setPostContent] = useState(null);


    const handlePromote = () => {
      onPromotePostAction(content._id, postContent).then( (res) => {
        console.log(res);
        if(res && res.msg){
          customNotification.fireNotification('success', res.msg);
        }else{
          customNotification.fireNotification('warning', `Something went wrong!`);
        }
        close();
      });
    };

    const postContentChange = (event) => {
      setPostContent(event.target.value);
    };

    const modalPhoto= getImageFullUrl(content.user.profilePhoto);
    const modalUser = content.user.fullname;
    const modalHour= moment(content.dateOfCreation).fromNow();
    const modalContent= content.contentDescription;

    return (
      <Wrapper>
        <div className="modal-promote">
          <div className="modal-promote-title">
            <h1>Promote review</h1>
            <p className="btn-close" onClick={close}>
              &times;
            </p>
          </div>
          <div className="modal-promote-content">
            <img
              style={{borderRadius:"10px", marginLeft:"5px"}}
              src={getImageFullUrl(myInfo.profilePhoto)} alt="profile"
            />
            <textarea
              className="modal-promote-input"
              placeholder="Share your throughts about this..."
              onChange={postContentChange}
            />
          </div>
          <div className="modal-promote-article">
            <PromotedPost
              photo={modalPhoto}
              user={modalUser}
              hour={modalHour}
              content={modalContent}
              tag={content.contentTag}
              image={content.contentImage}
            />
          </div>
          <div className="modal-promote-bottom">
            <button
                onClick={handlePromote}
                className="btn-promote"
            >
              Promote
            </button>
          </div>
        </div>
      </Wrapper>
    );
};

const mapStateToProps = (state, ownProps = {}) => {
  return {
    myInfo : state.myInfo,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPromotePostAction: (contentId, contentDescription) =>
        dispatch(promotePostAction(contentId, contentDescription)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PromotePost);
