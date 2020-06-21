import React, {useCallback} from 'react';
import Contribution from '../../components-no-duplication/Contribution/Contribution';
import {connect} from 'react-redux';
import LazyLoadingEventCreator from '../../components-no-duplication/LazyLoadingEventCreator/LazyLoadingEventCreator';
import {getArtformContentsAction} from '../../store/actions/ContentAction/ContentAction';
import {mapDispatchToPropsFeed, mapStateToPropsFeed, useFeed} from "./Feed";

const ArtformFeed = (props) => {
    const {
        match,
        contents,
        artforms,
        getContents,
        openPromotePostModal,
        openReactToPostModal,
        openShowPictureModal,
        deleteContribution,
        editContribution,
        myInfo,
    } = props;

    const getContentsCallback = useCallback((page, limit) => {
        getContents(match.params.artform, page, limit);
    }, [match, getContents]);

    const feedProps = {
        ...props,
        getContents: getContentsCallback
    };

    const {observer, handleOpenContent} = useFeed(feedProps);

    let pageTitle = "Artforms";

    for (let i = 0; i < artforms.length; i++) {
        if (artforms[i].id === match.params.artform) {
            pageTitle = artforms[i].title;
            break;
        }
    }

    return (
        <div style={{width: '100%'}}>
            <h2 style={{textTransform: 'capitalize'}}>{pageTitle}</h2>
            {(contents && contents.length > 0) ? (
                contents.map((content) => {
                    return (
                        <Contribution
                            onClick={handleOpenContent}
                            key={content._id}
                            content={content}
                            openPromotePostModal={openPromotePostModal}
                            openReactToPostModal={openReactToPostModal}
                            openShowPictureModal={openShowPictureModal}
                            deleteContribution={(contentId) =>
                                deleteContribution(contentId, myInfo)
                            }
                            editContribution={editContribution}
                            myUserId={myInfo.userId}
                        />
                    );
                })
            ) : (
                <div style={{color: '#9281ff', textAlign: 'center'}}>
                    {/* please start subscribing to people to see their contributions here */}
                </div>
            )}
            {contents && contents.length > 0 &&
            <div style={{width: '100%', height: '20px'}}>
                <LazyLoadingEventCreator observer={observer}/>
            </div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    const stateProps = mapStateToPropsFeed(state);

    return {
        ...stateProps,
        contents: state.contentReducer.artformContent,
        artforms: state.sidebar.artforms
    };
};

const mapDispatchToProps = (dispatch) => {
    const dispatchProps = mapDispatchToPropsFeed(dispatch);

    return {
        ...dispatchProps,
        getContents: (artform, page, limit) =>
            dispatch(getArtformContentsAction(artform, page, limit)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ArtformFeed);
