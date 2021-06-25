import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Post from "../post/Post";
import Share from "../share/Share";
import "./Feed.scss";
import { Posts } from "../../dummyData";
import postApi from "../../api/postApi";

function Feed() {
    const [posts, setPosts] = useState([]);
    const [totalItem, setTotalItem] = useState([]);

    const { userId } = useParams();
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        const fetchPosts = async () => {
            const params = { userId: user.id, sort: "-createdAt" };

            const response = !userId
                ? await postApi.getTimelinePosts(params)
                : await postApi.getPosts({ userId, sort: "-createdAt" });
            const { items = [], total = 0 } = response;
            setPosts(items);
            setTotalItem(total);
        };

        fetchPosts();
    }, [user.id, userId]);

    return (
        <div className="feed">
            {user.id === userId && <Share />}
            {posts.map((post) => <Post key={post.id} post={post} />)}
        </div>
    );
}

export default Feed;
