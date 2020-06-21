import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import classes from "./MyProfile.module.css";
import Contribution from '../../components-no-duplication/Contribution/Contribution';
import { getContributionByUserAction, getContentsAction } from "../../store/actions/ContentAction/ContentAction";
import { gotoContentPageAction } from "../../store/actions/ContentPageAction";
import {
  openPromotePostModalAction,
  openReactToPostModalAction,
  openShowPictureModalAction
} from '../../store/actions/ModalsAction/ModalsAction';
import {
  deleteContributionAction,
  editContributionAction,
  updateUserProfileAction,
  getMyInfoAction,
  deleteJournalAction,
  createJournalAction,
  getAudience
} from '../../store/actions';
import UserProfileEditor from "../../components-no-duplication/UserProfileEditor/UserProfileEditor";
import { Container } from '@material-ui/core';

import Audience from '../../components/profilepage/Audience';


const MyProfile = ({
  myInfo,
  gotoContentPage,
  loadContributes,
  openPromotePostModal,
  openReactToPostModal,
  openShowPictureModal,
  deleteContribution,
  editContribution,
  updateUserProfile,
  myContents,
  contents,
  getContents,
  getMyInfo,
  journals,
  deleteJournal,
  createJournal,
  blur
}) => {
  const [tagFilter, setTagFilter] = useState("");
  useEffect(() => {
    getContents(0, 100).then(() => {
      loadContributes(0, 100, myInfo);
    });
  }, [loadContributes, myInfo, getContents]);
  useEffect(() => {
    if (!myInfo.passion.title || !myInfo.bio || !myInfo.headline) {
      // getMyInfo(myInfo);
    }
  }, [getMyInfo, myInfo]);
  useEffect(() => {
    //filter only user contributiosn / mapped to get by user
    loadContributes(0, 100, myInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contents, loadContributes])

  const [selectedClass, setSelectedClass] = useState('contributions');
  const audienceList = useSelector(state => state.audience.audienceList);

  const dispatch = useDispatch()

  let contentsFilted = myContents;
  if (tagFilter && contentsFilted && contentsFilted) {
    contentsFilted = contentsFilted.filter(content => content.contentTag && content.contentTag.toLowerCase() === tagFilter);
  }

  if (selectedClass) {
    contentsFilted = contentsFilted.filter(content => content.contentType === selectedClass);
  }

  const history = useHistory();

  const handleOpenContent = (content) => {
    const state = {
      back: true,
    };
    gotoContentPage(history, state, content);
  };

  //#region left menu selection handlers  
  const contributionsSelectedHandler = () => {
    setSelectedClass('contributions');
  }

  const workSelectedHandler = () => {
    setSelectedClass('work');
  }

  const audienceSelectedHandler = () => {
    setSelectedClass('audience');
    const myInfo = JSON.parse(sessionStorage.getItem('myinfo'));
    dispatch(getAudience(myInfo.userId))
  }
  //#endregion left menu selection handlers


  //use below mainContent variable concept to control the main content
  let mainContent = null
  switch (selectedClass) {
    case 'contributions':
      // assign contributions related content
      if (contentsFilted && contentsFilted[0]) {

        mainContent = contentsFilted.map(content => {
          return (<Contribution
            key={content._id}
            content={content}
            openPromotePostModal={openPromotePostModal}
            openReactToPostModal={openReactToPostModal}
            openShowPictureModal={openShowPictureModal}
            deleteContribution={(contentId) => deleteContribution(contentId, myInfo)}
            editContribution={(contentId) => editContribution(contentId, myInfo)}
            myUserId={myInfo.userId}
            setTagFilter={setTagFilter}
            onClick={handleOpenContent}
          />);
        }
        )
      }
      break;
    case 'work':
      //assign work related content
      mainContent = ""
      break;
    case 'audience':
      //assign audience related content

      // prepare input 

      const trasformedAudienceList = audienceList.map(a => {
        return {
          id: a._id,
          photo: a.profilePhoto,
          user: a.fullname
        }
      })
      mainContent = <Audience audience={trasformedAudienceList} />
      break;
    default:
      //assign contributions as default selection
      break;
  }

  return (
    <Container fixed style={{ maxWidth: 700 }}>
      <div className={classes.mainData}>
        {myInfo ? <UserProfileEditor myInfo={myInfo} updateUserProfile={updateUserProfile} /> : null}
        <div className={classes.separationLine} />
        <div className={classes.subSections} style={{ filter: blur.filter, pointerEvents: blur.pointerEvents, }} >
          <div className={classes.topRow}>
            <div className={classes.sectionsSidebar}>
              {selectedClass === 'contributions' ? <p>Contributions</p> : <p style={{ color: "gray", cursor: "pointer" }} onClick={contributionsSelectedHandler}>Contributions</p>}
              {selectedClass === 'work' ? <p>Work</p> : <p style={{ color: "gray", cursor: "pointer" }} onClick={workSelectedHandler}>Work</p>}
              {selectedClass === 'audience' ? <p>Audience</p> : <p style={{ color: "gray", cursor: "pointer" }} onClick={audienceSelectedHandler}>Audience</p>}
            </div>
            <div className={classes.content} >
              {mainContent}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};


const mapStateToProps = state => (
  {
    myInfo: state.myInfo,
    myContents: state.contentReducer.myContents,
    journals: state.journals,
    contents: state.contentReducer.contents,
    blur: state.blur.blurPageControl,
  });

const mapDispatchToProps = dispatch => {
  return {
    loadContributes: (page, limit, myInfo) =>
      dispatch(getContributionByUserAction(page, limit, myInfo.userId)),


    openPromotePostModal: (data) => {
      dispatch(openPromotePostModalAction(data));
    },
    openReactToPostModal: (data) => {
      dispatch(openReactToPostModalAction(data));
    },
    openShowPictureModal: (data) => {
      dispatch(openShowPictureModalAction(data));
    },
    getContents: (page, limit) =>
      dispatch(getContentsAction(page, limit)),
    deleteContribution: (contentId, myInfo) =>
      dispatch(deleteContributionAction(contentId, myInfo)),
    editContribution: (contentId, data) =>
      dispatch(editContributionAction(contentId, data)),
    updateUserProfile: (myInfo) =>
      dispatch(updateUserProfileAction(myInfo)),
    getMyInfo: (myInfo) =>
      dispatch(getMyInfoAction(myInfo)),
    deleteJournal: (myInfo, journal) =>
      dispatch(deleteJournalAction(myInfo, journal)),
    createJournal: (myInfo, data) =>
      dispatch(createJournalAction(myInfo, data)),
    gotoContentPage: (history, state, content) =>
      dispatch(gotoContentPageAction(history, state, content)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

