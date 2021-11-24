import React from "react"
import { useSelector } from "react-redux"
import "./NotifiesBox.scss"
import NotifiesItem from "components/NotifiesItem/NotifiesItem"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { updatePostNotifyAction, clearPostNotifyAction } from "actions/notifies.action"
import toast from "helpers/toast.helper"

function NotifiesBox({ setBoxSelect }) {
    const dispatch = useDispatch()
    const notifies = useSelector(state => state.notifies)
    const { user } = useSelector(state => state.auth)

    const handleOnClickNotify = async notifyId => {
        const body = { isRead: true }
        await dispatch(updatePostNotifyAction(notifyId, body))
        setBoxSelect("")
    }

    const clearNotifies = async () => {
        const query = { userId: user.id }
        await dispatch(clearPostNotifyAction(query))
        toast.success("Clear notifies success.")
        setBoxSelect("")
    }

    return (
        <div className="notifies-box">
            <h2 className="notifies-box-header">Notifies</h2>
            <div className="notifies-box-content">
                {notifies &&
                    notifies.length &&
                    notifies.map(notify => (
                        <Link
                            to={`/posts/${notify.post}`}
                            className="text-link"
                            onClick={() => handleOnClickNotify(notify.id)}
                        >
                            <NotifiesItem notify={notify} />
                        </Link>
                    ))}
            </div>

            <div className="notifies-footer">
                <button onClick={clearNotifies} className="clear-notifies">
                    Clear Notifies
                </button>
            </div>
        </div>
    )
}

export default NotifiesBox
