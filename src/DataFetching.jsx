import axios from "axios";
import {useEffect, useState} from "react";

const baseURL = "https://jsonplaceholder.typicode.com/posts/1";

function DataFetching() {
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setPost(response.data);
        });
    }, []);

    if (!post) return null;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    );
}

export default DataFetching;