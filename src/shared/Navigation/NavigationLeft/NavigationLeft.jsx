import React, { useEffect, useState, useRef } from "react"
import "./NavigationLeft.scss"
import { Link } from "react-router-dom"
import BoxSearch from "./BoxSearch/BoxSearch"
import userApi from "api/userApi"
import { PAGING } from "constants/global.constant"

function NavigationLeft() {
    const [search, setSearch] = useState("")
    const [users, setUsers] = useState([])
    const [showBoxSearch, setShowBoxSearch] = useState(false)
    const [loading, setLoading] = useState(false)

    const fetchUsers = async () => {
        try {
            if (search) {
                setLoading(true)
                const params = {
                    skip: PAGING.SKIP_DEFAULT,
                    limit: 20,
                    searchText: search
                }
                const { items = [] } = await userApi.getUsers(params)
                setUsers(items)
            } else {
                setUsers([])
            }
        } catch (error) {
            console.log("+ fetchUsers() error", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            await fetchUsers()
        }, 100)
        return () => clearTimeout(delayDebounceFn)
    }, [search])

    useEffect(() => {
        if (users.length) setShowBoxSearch(true)
        if (!users.length) setShowBoxSearch(false)
    }, [users])

    return (
        <div className="navigation-left" onBlur={() => setShowBoxSearch(false)}>
            <Link to="/" className="text-link">
                <i className="navigation-left-icon fab fa-facebook"></i>
            </Link>
            <button className="navigation-left-search">
                <i className="left-search-icon fas fa-search"></i>
                <input
                    onChange={e => setSearch(e.target.value)}
                    value={search}
                    className="left-search-input"
                    type="text"
                    placeholder="Search on Facebook"
                    onKeyDown={e => e.key === "Enter" && fetchUsers()}
                />
            </button>
            <BoxSearch active={showBoxSearch} users={users} loading={loading} />
        </div>
    )
}

export default NavigationLeft
