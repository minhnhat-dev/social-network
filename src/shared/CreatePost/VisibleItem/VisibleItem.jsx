import React from "react"
import "./VisibleItem.scss"
import IconLarge from "shared/IconLarge/IconLarge"
function VisibleItem({ visibleItem, visibleSelected }) {
    return (
        <li className="visible-item">
            <div className="visible-item-left">
                <IconLarge
                    className={`visible-item-icon ${visibleItem.className}`}
                    tooltip={visibleItem.tooltip}
                    icon={visibleItem.icon}
                    value={visibleItem.value}
                    onClickIcon={visibleItem.handle}
                />
                <div className="visible-item-description">
                    <h4>{visibleItem.title}</h4>
                    <span className="fs-15 gray-45">{visibleItem.description}</span>
                </div>
            </div>

            {visibleSelected === visibleItem.value && (
                <i className="visible-item-icon-right base-blue fs-20 far fa-dot-circle"></i>
            )}
        </li>
    )
}

export default VisibleItem
