import React from "react"
import "./ContainerLeft.scss"
import SectionIntroduce from "shared/SectionIntroduce/SectionIntroduce"
import SectionImages from "./SectionImages/SectionImages"
import SectionFriends from "./SectionFriends/SectionFriends"

function ContainerLeft() {
    return (
        <div className="detail-container-left">
            <SectionIntroduce title="Introduce" />
            <SectionImages />
            <SectionFriends />
        </div>
    )
}

export default ContainerLeft
