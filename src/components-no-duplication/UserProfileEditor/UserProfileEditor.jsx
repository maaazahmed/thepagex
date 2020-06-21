import './userProfileEditor.scss';
import Modal from 'react-bootstrap/Modal';
import { getImageFullUrl } from "../../Utils/utils";
import React, { useState, useEffect, useRef } from 'react';
import defaultProfile from '../../image/default-profile.png';
import ImgCrp from '../../components-no-duplication/ImageCrop/imageCropper';
import { blurPageControl } from '../../store/actions/blurPage/blurPage'
import { connect } from "react-redux";


const customNotification = require('../../Utils/notification');
const UserProfileEditor = ({ myInfo, updateUserProfile, blurPage }) => {
    const [fullname, setFullname] = useState("");
    const [headline, setHeadline] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [file, setFile] = useState("");
    const [picture, setPicture] = useState("");
    const [editProfile, setEditProfile] = useState(false);
    const [show, setShow] = useState(false);
    const [getCropedImage, setGetCropedImage] = useState(null);
    const [photoTmp, setPhotoTmp] = useState(defaultProfile);

    const ref = useRef(null);

    const handleValidatePhoto = () => {
        if (defaultProfile === photoTmp) return;
        if (getCropedImage) {
            getCropedImage().then((img) => {
                img.lastModifiedDate = new Date();
                img.name = `${new Date().getTime()}.jpg`;
                setFile(img);
                // updateMyInfos({ ...myInfo, photo: img });
                // setPicture(img)
                const fr = new FileReader();
                fr.onload = () => {
                    setPicture(fr.result)
                }
                fr.readAsDataURL(img);

            }).catch(err => {
                console.log("croping error", err);
            })
        }
    }

    const handleBrowseFile = () => {
        if (ref.current) {
            ref.current.click();
        }
    }

    const handleFileChange = (event) => {
        // setFile(event.target.files[0]);
        updateTmpImage(event.target.files[0]);
        // console.log(event.target.files[0]);
    }

    const updateTmpImage = (file) => {
        const fr = new FileReader();
        fr.onload = () => {
            // setPicture(fr.result)
            setPhotoTmp(fr.result)
        }
        fr.readAsDataURL(file);
        handleShow()
    }

    const handleSaveImage = () => {
        handleValidatePhoto()
        setShow(false);
        // let imgUri = localStorage.getItem('imgUri')
        // console.log(imgUri, '99999');
        // setPicture(imgUri)
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => {
        setShow(true);

    }

    const handleCancel = () => {
        setFullname(myInfo.fullname);
        setHeadline(myInfo.headline);
        setLocation(myInfo.location);
        setBio(myInfo.bio);
        setPicture(null);
        setEditProfile(false);
        setFile(null);
        handleRemoveBlur()
    }

    const handleSave = () => {
        if (!fullname || !bio || !location) {
            customNotification.fireNotification('warning', "all fields are mandatory");
        }
        else {
            setEditProfile(false);
            updateUserProfile({ ...myInfo, fullname, location, bio, headline, file });
        }
        handleRemoveBlur()
    }
    const handleBlur = () => {
        const style = {
            filter: 'blur(4px)',
            pointerEvents: 'none',
        }
        blurPage(style)
    }
    const handleRemoveBlur = () => {
        const style = {
            filter: 'none',
            pointerEvents: 'unset',
        }
        blurPage(style)
    }
    useEffect(() => {
        // handleRemoveBlur();
        setFullname(myInfo.fullname);
        setHeadline(myInfo.headline);
        setLocation(myInfo.location);
        setBio(myInfo.bio);
        setPicture(null);

    },
        [myInfo])
    return (
        <div className="user-profile-editor">
            <div className="profile-pic">
                <div className="image"
                    style={{ backgroundColor: 'gray', backgroundImage: `url(${picture || getImageFullUrl(myInfo.profilePhoto)})`, filter: editProfile && !picture ? 'blur(4px)' : '' }} />
                {editProfile ? <button onClick={handleBrowseFile} /> : null}
            </div>
            <div className="items">
                <div className="user-profile-item" style={{ marginTop: '12px' }}>
                    <input className='editableInput' style={{ fontSize: '22px', fontWeight: 'bold', wordSpacing: '3px', textTransform: 'capitalize' }} disabled={true} type="text" value={fullname || ""} onChange={(event) => setFullname(event.target.value)} />
                </div>
                <div className="user-profile-item headline" style={{ marginTop: '0px', marginLeft: '0px', width: '90%' }}>
                    <input style={{ fontSize: '15px' }} placeholder="Add headline | " disabled={!editProfile} type="text" value={headline || ""} onChange={(event) => setHeadline(event.target.value)} />
                </div>
                <div className="user-profile-item" style={{ marginTop: '10px', marginLeft: '0px', width: '90%' }}>
                    <textarea style={{ lineHeight: '16px', fontSize: '15px' }} placeholder="Add a short bio here | " rows="2" disabled={!editProfile} type="text" value={bio || ""} onChange={(event) => setBio(event.target.value)} />
                </div>
                <div className="user-profile-item location" style={{ marginTop: '10px', width: '50%' }}>
                    <input placeholder="Add your location | " disabled={!editProfile} type="text" value={location || ""} onChange={(event) => setLocation(event.target.value)} />
                </div>

            </div>
            <>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <ImgCrp image={photoTmp} setGetCropedImage={setGetCropedImage} />
                    </Modal.Body>
                    <Modal.Footer>
                        < button className='modelButton' style={{ backgroundColor: '#80808073' }} onClick={handleClose} >Cancel</ button>
                        < button className='modelButton' onClick={handleSaveImage}>Done</ button>
                    </Modal.Footer>
                </Modal>
            </>
            <div className="controls" style={{}
            } >
                {!editProfile ? <button onClick={() => { setEditProfile(true); handleBlur() }}>Edit</button> : null}
                {editProfile ? <button onClick={handleCancel} className='cancleButton' >Cancel</button> : null}
                {editProfile ? <button onClick={handleSave}>Save</button> : null}
            </div>
            <input type="file" style={{ display: 'none' }} accept="image/png, image/jpeg" ref={ref} onChange={handleFileChange} />
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        blurPage: (myInfo) =>
            dispatch(blurPageControl(myInfo)),
    };
};

export default connect(null, mapDispatchToProps)(UserProfileEditor);
