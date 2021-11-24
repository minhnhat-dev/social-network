import React, { useEffect, useState } from "react"
import "./EditProfile.scss"
import Card from "shared/Card/Card"
import IconLarge from "shared/IconLarge/IconLarge"
import SectionIntroduce from "shared/SectionIntroduce/SectionIntroduce"
import AvatarUpload from "shared/AvatarUpload/AvatarUpload"
import ButtonTitle from "shared/ButtonTitle/ButtonTitle"
import { useSelector } from "react-redux"
import TextInput from "shared/TextInput/TextInput"
import InputNotBorder from "shared/InputNotBorder/InputNotBorder"
import { GENDER, RELATIONSHIP, RELATIONSHIP_STRING } from "constants/users.constant"
import ToggleSwitch from "shared/ToggleSwitch/ToggleSwitch"
import { validateFileProfileUpload, validateFileCoverUpload, validateInputProfile } from "validators/profile.validator"
import { imageUpload, PRESET_COVER_PICTURE, PRESET_PROFILE_PICTURE } from "helpers/upload.helper"
import { updateProfile } from "actions/profile.action"
import _ from "lodash"
import toast from "helpers/toast.helper"
import { useDispatch } from "react-redux"
import { NOTIFICATION_TYPES } from "actions/notifications.action"

function EditProfile({ show, setShowEdit }) {
    const styleContent = {
        minHeight: "650px",
        width: "750px",
        display: "block"
    }
    const initialState = {
        full_name: "",
        phone: "",
        from: "",
        address: "",
        description: "",
        gender: "",
        relationship: ""
    }
    const { profile } = useSelector(state => state.profile)
    const { user } = useSelector(state => state.auth)
    const [error, setError] = useState({})
    const [profilePicture, setProfilePicture] = useState("")
    const [coverPicture, setCoverPicture] = useState("")
    const [userData, setUserData] = useState(initialState)
    const { fullName = "", phone = "", from = "", address = "", description = "", gender } = userData
    const [relationshipSelected, setRelationshipSelected] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setUserData(profile)
    }, [profile])

    const handleUploadFileProfile = async e => {
        const file = e.target.files[0]
        const { errLength, errMsg } = validateFileProfileUpload(file)
        setError(errMsg)
        if (errLength) return
        setProfilePicture(file)
    }

    const handleUploadFileCover = async e => {
        const file = e.target.files[0]
        const { errLength, errMsg } = validateFileCoverUpload(file)
        setError(errMsg)
        if (errLength) return
        setCoverPicture(file)
    }

    const handleOnChange = e => {
        const { name, value } = e.target
        const newState = { ...userData, [name]: value }
        setUserData(newState)
    }

    const onClose = () => {
        setError({})
        setShowEdit(!show)
    }

    const handleSaveProfile = async () => {
        const upload = {
            images: [profilePicture],
            preset: PRESET_PROFILE_PICTURE
        }

        if (profilePicture) {
            dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
            const files = await imageUpload(upload)
            if (!files.length) return toast.error("Update profile picture fail.")
            const url = files[0].url
            const body = { profilePicture: url }
            await dispatch(updateProfile(profile.id, body))
            dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
            toast.success("Update profile picture success.")
        } else {
            toast.success("Update profile picture success.")
        }
    }
    const handleSaveCover = async () => {
        const upload = {
            images: [coverPicture],
            preset: PRESET_COVER_PICTURE
        }

        if (coverPicture) {
            dispatch({ type: NOTIFICATION_TYPES.LOAD_START })
            const files = await imageUpload(upload)
            if (!files.length) return toast.error("Update cover picture fail.")
            const url = files[0].url
            const body = { coverPicture: url }
            await dispatch(updateProfile(profile.id, body))
            dispatch({ type: NOTIFICATION_TYPES.LOAD_DONE })
            toast.success("Update cover picture success.")
        } else {
            toast.success("Update cover picture success.")
        }
    }

    const handleSaveInfo = async () => {
        const { fullName, phone, from, address, description, gender } = userData
        const body = _.omitBy(
            {
                fullName,
                phone,
                from,
                address,
                description,
                gender: gender ? Number(gender) : null,
                relationship: relationshipSelected ? RELATIONSHIP.MARRIED : RELATIONSHIP.SINGLE
            },
            _.isNil
        )
        const { errLength, errMsg } = validateInputProfile(body)
        setError(errMsg)
        if (errLength) return
        await dispatch(updateProfile(profile.id, body))
        toast.success("Update profile success.")
    }

    return (
        <div className="edit-profile">
            <Card className="edit-profile-background" show={show} styleContent={styleContent}>
                <div className="edit-profile-header-wrapper">
                    <div className="edit-profile-header">
                        <h3>Edit profile</h3>
                        <div onClick={onClose}>
                            <IconLarge
                                className="profile-header-icon-close"
                                tooltip={"Close"}
                                icon="far fa-times-circle"
                                value="close"
                            />
                        </div>
                    </div>
                </div>
                <hr className="hr-1" />
                <div className="edit-profile-body">
                    <div className="profile-body-item">
                        <div className="body-item-header">
                            <h3>Profile picture</h3>
                        </div>
                        <div className="body-item-container">
                            <AvatarUpload
                                handleUploadFile={handleUploadFileProfile}
                                image={profilePicture ? URL.createObjectURL(profilePicture) : profile.profilePicture}
                                id="avatar-upload"
                            />
                        </div>
                        <ButtonTitle
                            onClick={handleSaveProfile}
                            tooltip="Save"
                            className="body-item-btn-save"
                            title="Save"
                            icon="fas fa-download"
                        />
                        <small className={`item-container-small ml-2 fs-15 ${error.profilePicture && "error-text"}`}>
                            {error.profilePicture}
                        </small>
                    </div>

                    <div className="profile-body-item">
                        <div className="body-item-header">
                            <h3>Cover picture</h3>
                        </div>
                        <div className="body-item-container cover">
                            <AvatarUpload
                                handleUploadFile={handleUploadFileCover}
                                image={coverPicture ? URL.createObjectURL(coverPicture) : profile.coverPicture}
                                className="cover-upload"
                                id="avatar-cover-upload"
                            />
                        </div>
                        <div onClick={handleSaveCover}>
                            <ButtonTitle
                                tooltip="Save"
                                className="body-item-btn-save"
                                title="Save"
                                icon="fas fa-download"
                            />
                        </div>
                        <small
                            className={`item-container-small cover ml-2 fs-15 ${error.coverPicture && "error-text"}`}
                        >
                            {error.coverPicture}
                        </small>
                    </div>
                </div>
                <div className="section-information">
                    <div className="section-information-header">
                        <h3>Information</h3>
                    </div>
                    <div className="section-information-body">
                        <div className="information-body-form">
                            <table>
                                <tr>
                                    <td>Full name</td>
                                    <td>
                                        <InputNotBorder
                                            id="fullName"
                                            name="fullName"
                                            value={fullName}
                                            onChange={handleOnChange}
                                            error={error.fullName}
                                            placeholder="Full name"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>
                                        <InputNotBorder
                                            id="phone"
                                            name="phone"
                                            value={phone}
                                            onChange={handleOnChange}
                                            error={error.phone}
                                            placeholder="Phone"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>From</td>
                                    <td>
                                        <InputNotBorder
                                            id="from"
                                            name="from"
                                            value={from}
                                            onChange={handleOnChange}
                                            error={error.from}
                                            placeholder="From"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>
                                        <InputNotBorder
                                            id="address"
                                            name="address"
                                            value={address}
                                            onChange={handleOnChange}
                                            error={error.address}
                                            placeholder="Address"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Description</td>
                                    <td>
                                        <div className="description-input">
                                            <textarea
                                                id="description"
                                                name="description"
                                                value={description}
                                                onChange={handleOnChange}
                                                type="text"
                                                className="textarea-input ml-10"
                                                placeholder="Description"
                                            />
                                            <small
                                                className={`ml-10 fs-15 description-input-small ${
                                                    error.description && "error-text"
                                                }`}
                                            >
                                                {error.description}
                                            </small>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>
                                        <div className="form-input-gender">
                                            <div className="input-gender-item mr-20">
                                                <label className="mr-10" htmlFor="nam">
                                                    Male
                                                </label>
                                                <input
                                                    checked={gender == GENDER.MALE}
                                                    value={GENDER.MALE}
                                                    id="male"
                                                    type="radio"
                                                    name="gender"
                                                    className="radio-button"
                                                    onChange={handleOnChange}
                                                />
                                            </div>
                                            <div className="input-gender-item">
                                                <label className="mr-10" htmlFor="nam">
                                                    Female
                                                </label>
                                                <input
                                                    checked={gender == GENDER.FEMALE}
                                                    value={GENDER.FEMALE}
                                                    id="female"
                                                    type="radio"
                                                    name="gender"
                                                    className="radio-button"
                                                    onChange={handleOnChange}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Relationship</td>
                                    <td>
                                        <div className="relationship-group">
                                            <button className="fs-17 fw-500 relationship-group-btn">
                                                {
                                                    RELATIONSHIP_STRING[
                                                        relationshipSelected
                                                            ? RELATIONSHIP.MARRIED
                                                            : RELATIONSHIP.SINGLE
                                                    ]
                                                }
                                            </button>
                                            <ToggleSwitch
                                                id="relationship"
                                                disabled={false}
                                                checked={relationshipSelected}
                                                onChange={setRelationshipSelected}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            <div className="body-form-input-gender"></div>
                            <div className="body-form-input-relationship"></div>
                        </div>
                        <ButtonTitle
                            onClick={handleSaveInfo}
                            tooltip="Save"
                            className="section-information-btn-save"
                            title="Save"
                            icon="fas fa-download"
                        />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default EditProfile
