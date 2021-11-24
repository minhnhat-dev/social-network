import React, { useState, useRef, useEffect } from "react"
import Card from "shared/Card/Card"
import "./BoxCreate.scss"
import Avatar from "shared/Avatar/Avatar"
import IconLarge from "shared/IconLarge/IconLarge"
import VisibleItem from "../VisibleItem/VisibleItem"
import { BOX_CREATE_ICONS, BOX_CREATE_VISIBLE_ICONS, VISIBLE_DEFAULT, VISIBLE_STRING } from "constants/posts.constant"
import { useSelector } from "react-redux"
import ButtonTitle from "shared/ButtonTitle/ButtonTitle"
import toast from "helpers/toast.helper"
import { validatePermissionCamera } from "validators/media.validator"
import { imageUpload, PRESET_COVER_PICTURE, PRESET_PROFILE_PICTURE } from "helpers/upload.helper"
import { useDispatch } from "react-redux"
import { NOTIFICATION_TYPES } from "actions/notifications.action"
import { createPost, updatePost } from "actions/posts.action"
import { POST_TYPES } from "actions/posts.action"
import { reactions } from "constants/icons.constant"
import Reactions from "components/Reactions/Reactions"

function BoxCreate({ posts, setPosts }) {
    const { user } = useSelector(state => state.auth)
    const socket = useSelector(state => state.socket)
    const { onCreateBox, onEditBox, post } = useSelector(state => state.posts)
    const dispatch = useDispatch()
    const [visibleSelected, setVisibleSelected] = useState(VISIBLE_DEFAULT)
    const [showVisible, setShowVisible] = useState(false)
    const [showAddImage, setShowAddImage] = useState(false)
    const [showAddIcons, setShowAddIcons] = useState(false)
    const [images, setImages] = useState([])
    const [tracks, setTracks] = useState("")
    const [content, setContent] = useState("")
    const [stream, setStream] = useState(false)
    const refCanvas = useRef()
    const videoRef = useRef()

    const styleContent = {
        height: "auto",
        width: "500px",
        display: "block"
    }

    const handleChangeImages = e => {
        const files = [...e.target.files]
        const newImages = []

        files.forEach(file => {
            if (!file) return toast.error("File does not exist.")

            if (file.size > 1024 * 1024 * 5) {
                return toast.error("The image/video largest is 5mb.")
            }

            return newImages.push(file)
        })

        setImages([...images, ...newImages])
    }

    const onClickIcon = icon => {
        setContent(preContent => {
            return preContent.concat(icon)
        })
    }

    useEffect(() => {
        if (onEditBox) {
            setContent(post.content)
            setImages(post.images)
            setVisibleSelected(post.visible)
            setShowVisible(false)
            setShowAddIcons(false)
        } else {
            setContent("")
            setImages([])
            setVisibleSelected(VISIBLE_DEFAULT)
            setShowVisible(false)
            setShowAddIcons(false)
        }
    }, [onEditBox, onCreateBox])

    const handleDeleteImage = index => {
        const newImages = [...images]
        newImages.splice(index, 1)
        setImages(newImages)
    }

    const handleCreatePost = async () => {
        dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
        const body = {
            user: user.id,
            visible: visibleSelected,
            content,
            images
        }
        const newPost = onEditBox
            ? await dispatch(updatePost(post.id, body, socket))
            : await dispatch(createPost(body, socket))
        dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
        if (newPost) {
            const message = onEditBox ? "Update post success." : "Create post success."
            toast.success(message)
            dispatch({ type: POST_TYPES.ON_CREATE_BOX })
            const newPosts = onEditBox ? posts.filter(postItem => post.id.toString() !== postItem.id.toString()) : posts
            setPosts([newPost, ...newPosts])
            setContent("")
            if (tracks) tracks.stop()
            setImages([])
            setVisibleSelected(VISIBLE_DEFAULT)
            setShowVisible(false)
            setShowAddIcons(false)
        }
    }

    const getMedia = async () => {
        setStream(true)
        try {
            const constraints = { video: true }
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices
                    .getUserMedia(constraints)
                    .then(mediaStream => {
                        videoRef.current.srcObject = mediaStream
                        videoRef.current.play()
                        const track = mediaStream.getTracks()
                        setTracks(track[0])
                    })
                    .catch(err => {
                        toast.error(
                            "You setting denied to share camera, please set permission for sharing your camera."
                        )
                    })
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    const handleCapture = () => {
        const width = videoRef.current.clientWidth
        const height = videoRef.current.clientHeight
        refCanvas.current.setAttribute("width", width)
        refCanvas.current.setAttribute("height", height)

        const ctx = refCanvas.current.getContext("2d")
        ctx.drawImage(videoRef.current, 0, 0, width, height)
        const URL = refCanvas.current.toDataURL()
        setImages([...images, { camera: URL }])
    }

    const handleStopStream = () => {
        tracks.stop()
        setStream(false)
    }

    return (
        <div className="box-create">
            <Card className="box-create-background" show={onCreateBox} styleContent={styleContent}>
                <div className="box-create-header-wrapper">
                    <div className="box-create-header">
                        <h3 className="box-create-header-title">Create post</h3>
                        <div
                            onClick={() =>
                                dispatch({
                                    type: POST_TYPES.ON_CREATE_BOX
                                })
                            }
                        >
                            <IconLarge
                                className="create-header-icon-close"
                                tooltip={"Close"}
                                icon="far fa-times-circle"
                                value="close"
                            />
                        </div>
                    </div>
                </div>
                <hr className="hr-1" />
                <div className="box-create-body">
                    <div className="create-body-header">
                        <Avatar url={user.profilePicture} className="body-header-avatar" />
                        <div className="body-header-user">
                            <h4 className="header-user-title">{user.username}</h4>
                            <button onClick={() => setShowVisible(!showVisible)} className="body-header-user-btn">
                                <i className="fas fa-globe-europe"></i>
                                <span className="header-user-btn-text">{VISIBLE_STRING[visibleSelected]}</span>
                                <i class="fas fa-caret-down"></i>
                            </button>
                            <div className={`visible-list ${showVisible && "show"}`}>
                                <ul className="visible-items">
                                    {BOX_CREATE_VISIBLE_ICONS.map((visibleItem, index) => (
                                        <div
                                            onClick={() => {
                                                setVisibleSelected(visibleItem.value)
                                                setShowVisible(!showVisible)
                                            }}
                                        >
                                            <VisibleItem
                                                key={index}
                                                visibleSelected={visibleSelected}
                                                visibleItem={visibleItem}
                                            />
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="create-body-content">
                        <textarea
                            onChange={e => setContent(e.target.value)}
                            type="text"
                            className="body-content-textarea"
                            placeholder="What you're thinking?"
                            value={content}
                        />
                        <div
                            className="body-content-images"
                            onMouseOut={() => setShowAddImage(false)}
                            onMouseOver={() => setShowAddImage(true)}
                        >
                            {images.map((imageItem, index) => (
                                <div className="content-group-image">
                                    <img
                                        className="body-content-image"
                                        key={index}
                                        src={
                                            imageItem.camera
                                                ? imageItem.camera
                                                : imageItem.url
                                                ? imageItem.url
                                                : URL.createObjectURL(imageItem)
                                        }
                                        alt="images"
                                    />
                                    <div className="body-content-icon" onClick={() => handleDeleteImage(index)}>
                                        <IconLarge className="images-icon-close" icon="fas fa-times" value="" />
                                    </div>
                                </div>
                            ))}
                            <div className="images-icon">
                                {/* <button className={`images-icon-upload ${showAddImage && "show"}`}>
                                    <ButtonTitle
                                        className={`images-icon-title`}
                                        title="Add images/videos"
                                        icon="fas fa-images"
                                    />
                                    <input
                                        className="images-icon-upload-input"
                                        type="file"
                                        name="upload-files"
                                        id="upload-files"
                                        multiple
                                        accept="image/*,video/*"
                                        onChange={handleChangeImages}
                                    />
                                </button> */}
                                {/* 
                                <div onClick={() => setImages([])}>
                                    <IconLarge className="images-icon-close" icon="fas fa-times" value="" />
                                </div> */}
                            </div>
                        </div>
                        {stream && (
                            <div className="body-content-stream">
                                <div className="content-stream-video">
                                    <video autoPlay muted ref={videoRef} width="200px" />
                                </div>

                                <div className="content-stream-buttons">
                                    <button className="capture-image-btn" onClick={handleCapture}>
                                        <i className="mr-5 base-teal fs-18 attach-icon fas fa-camera-retro"></i>
                                        <span className="fw-500 fs-16">Capture image</span>
                                    </button>

                                    <button className="capture-image-btn" onClick={() => handleStopStream()}>
                                        <i className="mr-5 base-cherry fs-18 attach-icon fas fa-video-slash"></i>
                                        <span className="fw-500 fs-16">Close stream</span>
                                    </button>
                                </div>
                                <canvas ref={refCanvas} style={{ display: "none" }} />
                            </div>
                        )}
                    </div>
                    <div className="create-body-attach">
                        {/* {BOX_CREATE_ICONS.map((icon, index) => (
                            <IconLarge
                                key={index}
                                className={`body-attach-icon ${icon.className}`}
                                tooltip={icon.tooltip}
                                icon={icon.icon}
                                value={icon.value}
                            />
                        ))} */}
                        <button className="attach-button">
                            <label htmlFor="upload-files" className="attach-icon-label cursor-pointer">
                                <i className="base-lime attach-icon fas fa-image"></i>
                                <span>Image/Video</span>
                                <input
                                    className="no-display "
                                    type="file"
                                    name="upload-files"
                                    id="upload-files"
                                    multiple
                                    accept="image/*,video/*"
                                    onChange={handleChangeImages}
                                />
                            </label>
                        </button>
                        {!stream && (
                            <button className="attach-button" onClick={getMedia}>
                                <i className="base-cherry attach-icon fas fa-video"></i>
                                <span>Video</span>
                            </button>
                        )}

                        <button className="attach-button">
                            <i className="base-blue attach-icon fas fa-user-tag"></i>
                            <span>Tag</span>
                        </button>
                        <Reactions show={showAddIcons} onClickButton={setShowAddIcons} onClickIcon={onClickIcon} />
                    </div>
                    <button
                        onClick={handleCreatePost}
                        disabled={!content}
                        className={`create-body-footer ${!content && "disabled-btn"}`}
                    >
                        {onEditBox ? "Update" : "Create"}
                    </button>
                </div>
            </Card>
        </div>
    )
}

export default BoxCreate
