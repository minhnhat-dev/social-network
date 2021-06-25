import React, { useRef, useState, useEffect } from "react";
import { PhotoLibrary, Label, LocationOn, EmojiEmotions } from "@material-ui/icons";
import { useSelector } from "react-redux";
import postHandler from "../../handlers/posts.handler";
import "./Share.scss";

function Share() {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const PUBLIC_SERVER_FOLDER = process.env.REACT_APP_PUBLIC_SERVER_FOLDER;
    const user = useSelector((state) => state.user.user);
    const description = useRef();
    const [file, setFile] = useState({});

    // useEffect(() => {
    //     const deleteFilesUpload = async () => {
    //         const fileExist = localStorage.getItem("fileUpload");
    //         if (fileExist) {
    //             const fileParse = JSON.parse(fileExist);
    //             await postHandler.deleteFileUploadImage(fileParse);
    //             localStorage.removeItem("fileUpload");
    //         }
    //     };
    //     deleteFilesUpload();
    // }, []);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user.id,
            description: description.current.value,
            image: file
        };
        const post = await postHandler.createPost(newPost);
        window.location.reload();
    };

    const handleDeleteImage = async () => {
        await postHandler.deleteFileUploadImage(file);
        localStorage.removeItem("fileUpload");
        setFile({});
    };

    const handleUploadFile = async (e) => {
        const fileUpload = e.target.files[0];
        const formData = new FormData();
        formData.append("image", fileUpload);
        const fileRes = await postHandler.uploadImage(formData);
        localStorage.setItem("fileUpload", JSON.stringify(fileRes));
        setFile(fileRes);
    };

    return (
        <div className="share">
            <div className="share__wrapper">
                <div className="share__wrapper__top">
                    <img src={user && user.profilePicture ? user.profilePicture : `${PUBLIC_FOLDER}person/noAvatar.png`} alt="" className="share__wrapper__top__img" />
                    <input ref={description} placeholder={`What's in your mind ${user?.name} ?`} type="text" className="share__wrapper__top__input" />
                </div>
                <hr className="share__wrapper__hr" />
                {file && file.filename && (
                    <div className="share__wrapper__upload">
                        {/* {file && <img src={`${PUBLIC_SERVER_FOLDER}${file.filename}`} alt="" />} */}
                        <div className="share__wrapper__upload__image">
                            <img src={`${PUBLIC_SERVER_FOLDER}${file.filename}`} alt="" />
                            <span className="share__wrapper__upload__image__icon" onClick={handleDeleteImage}>
                                <i className="fas fa-times-circle" />
                            </span>
                        </div>
                    </div>
                )}
                <form className="share__wrapper__bottom" onSubmit={handleOnSubmit}>
                    <div className="share__wrapper__bottom__icons">
                        <ul className="share__wrapper__bottom__icons__list">
                            <label htmlFor="file" className="share__wrapper__bottom__icons__list__item">
                                <PhotoLibrary className="green share__wrapper__bottom__icons__list__icon" />
                                <span className="share__wrapper__bottom__icons__list__item__text">Photo or Video</span>
                                <input style={{ display: "none" }} type="file" id="file" onChange={handleUploadFile} />
                            </label>
                            <li className="share__wrapper__bottom__icons__list__item">
                                <Label className="blue share__wrapper__bottom__icons__list__icon" />
                                <span className="share__wrapper__bottom__icons__list__item__text">Tag</span>
                            </li>
                            <li className="share__wrapper__bottom__icons__list__item">
                                <LocationOn className="teal share__wrapper__bottom__icons__list__icon" />
                                <span className="share__wrapper__bottom__icons__list__item__text">Location</span>
                            </li>
                            <li className="share__wrapper__bottom__icons__list__item">
                                <EmojiEmotions className="fuchsia share__wrapper__bottom__icons__list__icon" />
                                <span className="share__wrapper__bottom__icons__list__item__text">Feelings</span>
                            </li>
                        </ul>
                    </div>
                    <div className="share__wrapper__bottom__button">
                        <button type="submit" className="share__wrapper__bottom__button__icon">Share</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Share;
