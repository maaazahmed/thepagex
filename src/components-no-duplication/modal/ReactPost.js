import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import Attach from '../../image/icone/attach.svg';
import { getImageFullUrl } from '../../Utils/utils';
import { getPostReactionsAction, reactPostAction } from '../../store/actions/ContentAction/ContentAction';
import { connect } from 'react-redux';
import defaultImageBackgroundUpload from './../../image/icone/image.svg';
import videoSvg from './../../image/icone/film.svg';
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
	justify-content: center;
	.modal-react {
		width: 100%;
		max-width: 700px;
		height: auto;
		background: #fff;
		z-index: 13;
		box-shadow: 0px 3px 30px #00000029;
		border-radius: 20px;
		color: #000;

	}

	.modal-react-top {
		width: 95%;
		padding: 10px 0px;
		border-bottom: 1px solid #00000026;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.modal-react-title {
		font-size: 1.2rem;
		font-family: 'Roboto';
		padding: 10px 0 0px;
		margin-bottom: -3px;
		color: rgb(109, 109, 109);
	}

	.btn-close {

    color: rgb(63, 83, 169);
    width: 20px;
    height: 20px;
    text-align: center;
	// line-height: 20px;
	margin-bottom: 7px;
    cursor: pointer;
    font-size: 1.8rem;
    border-radius: 50%;

	}

	img {
		display: block;
		width: 40px;
		height: 40px;
		border: 1px solid rgba(0,0,0,.07);
        border-radius: 10px;
	}

	p {
		padding: 1px;
		height: 36px;
		line-height: 36px;
		margin: 0 5px;
		color: #8c8787;
		text-align: center;
	}

	.modal-react-people {
		padding: 15px;
		margin-left: 15px;
	}
	
	.modal-group-img {
		display: flex;
	}
	
	.modal-group-img b {
	    line-height: 40px;
    	padding-top: 2px;
    	margin-right: 15px;
	}
	
	.modal-group-img img {
		display: block;
		width: 40px;
		height: 40px;
		border-radius: 5px;
	}
	
	.no-reactions {
		// height: 40px;
		// padding: 15px;
		
	}

	.modal-react-form {
		width: 91%;
		height: 155px;
		margin: 15px auto;
		border-radius: 10px;
	
	}

	.input-form {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;

		img {
			width: 70px;
			height: 70px;
		}
	}

	.input-form-item-1 {
		display: flex;
		align-items: top ;
		justify-content: space-between;
		height: 100%;
		position: relative;
	}

	.input-form-item-2 {
		display: flex;
		align-items: center;
		padding: 5px;
		justify-content: space-between;
		border-top: 1px solid #00000026;
		height: 20%;
	}
	.custom-file-upload {
		left: 80px;
		width: 11%;
		margin-top: 3px;
		position: relative;

		img {
		  height: 20px;
		  width: 20px;
		  display: inline-block;
		  margin: 0;
		  margin-right: 5px;
		  border-radius: 20px
		}
	  }
	.input-react {
		border: none;
		width: 100%;
		height: 100%;
		resize: none;
		border: 1px solid;
		border-radius: 12px;
		border-width: 2px;
		border-style: solid;
		border-color: rgb(221, 221, 221);
		background: rgb(247, 247, 247);
	}

	.input-tags {
		border: none;
		padding: 5px;
		border-right: 1px solid #00000026;
		width: 100%;
		height: 90%;
		background: #f1f1f1;
	}

	.attach {
		width: 22px;
		height: 22px;
	}
	.modal-promote-bottom {
		display: flex;
		justify-content: flex-end;
		margin: 8px 20px 20px;
		margin-right: 35px;
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
`;

const ReactPost = ({ close, myInfo, content, postReactions, getPostReactions, onReactPost }) => {
	const [description, setDescription] = useState(null);
	const [tags] = useState(null);

	useEffect(() => {
		getPostReactions(content._id, 0, 1000);
	}, [content, getPostReactions]);


	const descriptionChange = (event) => {
		setDescription(event.target.value);
	};



	const handleReact = () => {
		console.log('handleReact');
		console.log(content._id);
		console.log(description);
		console.log(tags);
		onReactPost(content._id, description, tags).then((res) => {
			console.log(res);
			if (res && res.msg) {
				customNotification.fireNotification('success', res.msg);
			} else {
				customNotification.fireNotification('warning', `Something went wrong!`);
			}
			close();
		});
	};

	return (
		<Wrapper>
			<div className='modal-react'>
				<div className='modal-react-top'>
					<h1 className='modal-react-title'>React to review</h1>
					<div className='btn-close' onClick={close}>
						×
					</div>
				</div>
				{(postReactions && postReactions.length > 0) ?
					(
						<div className='modal-react-people'>
							<div className='modal-group-img'>
								<b>Reactions:</b>
								{postReactions.map((item, index) =>
									index < 2 ? (
										<img
											src={getImageFullUrl(item.profilePhoto)}
											alt="profile"
										/>
									) : (
											""
										)
								)}
								{postReactions.length > 2 && (
									<>
										<p>+{postReactions.length - 2}</p>
										<span>other people</span>
									</>
								)}
							</div>
						</div>
					) : (
						<div className="no-reactions" />
					)}
				<div className='modal-react-form'>
					<div className='input-form'>
						<div className='input-form-item-1'>
							<img
								style={{ borderRadius: '10px', marginLeft: '5px', marginRight: '5px' }}
								src={getImageFullUrl(myInfo.profilePhoto)}
								alt='profile'
							/>
							<textarea
								className='input-react'
								placeholder='React to this content ...'
								onChange={descriptionChange}
							/>
							{/*
						<div className='input-form-item-2'>
							 <input
								className='input-tags'
								// placeholder='#Tags'
								onChange={tagsChange}
							/>
							<img style={{ height: '20px' }} src={Attach} alt='attach' />
							</div>
						*/}
						</div>
						<label style={{ visibility: 'visible' }} htmlFor="file-upload" className="custom-file-upload">
							<img
								alt="bg"
								style={{ cursor: 'pointer' }}
								src={defaultImageBackgroundUpload}
							/>
							<img
								alt="bg"
								style={{ cursor: 'pointer' }}
								src={videoSvg}
							/>
						</label>
					</div>
				</div>
				<div className='modal-promote-bottom' onClick={handleReact}>
					<button className='btn-promote'>Publish</button>
				</div>
			</div>
		</Wrapper>
	);
};

const mapStateToProps = (state, ownProps = {}) => {
	return {
		myInfo: state.myInfo,
		postReactions: state.contentReducer.postReactions
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getPostReactions: (contentId, page, limit) =>
			dispatch(getPostReactionsAction(contentId, page, limit)),
		onReactPost: (contentId, contentDescription, contentTags) =>
			dispatch(reactPostAction(contentId, contentDescription, contentTags)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactPost);
