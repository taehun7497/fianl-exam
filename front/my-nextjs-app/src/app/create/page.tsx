'use client'

import { useEffect, useState } from "react"
import { createPost, deletePost, updatePost } from "../asiosApi/userApi";

interface Post {
    id: number,
    title: string,
    content: string
}

export default function Create() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [id, setId] = useState(0);

    useEffect(() => {
        if (localStorage.getItem("post")) {
            const storedPost = localStorage.getItem('post') || 'null';
            const post: Post = JSON.parse(storedPost);
            setTitle(post.title);
            setContent(post.content);
            setId(post.id);
            localStorage.clear();
        }
    }, [])

    const send = () => {
        if (id == 0) {
            createPost({ title: title, content: content }).then(r => window.location.href = "/").catch(e => console.log(e));
        } else {
            updatePost({ title: title, content: content }, id).then(r => window.location.href = "/").catch(e => console.log(e));
        }
    }

    return <div className="flex flex-col items-center gap-10 p-10 h-screen">
        <input defaultValue={title} onChange={(e) => {
            setTitle(e.target.value);
        }} type="text" placeholder="Title here" className="border-black border-2 w-[350px] h-[50px]" />
        <textarea defaultValue={content} className="textarea textarea-bordered border-black border-2 w-[350px] h-[300px]" placeholder="Content here" onChange={(e) => {
            setContent(e.target.value);
        }}></textarea>

        <button className="btn" onClick={() => {
            send();
        }}>작성</button>
        {id != 0 ? <button onClick={() => deletePost(id).then(r => window.location.href = "/").catch(e => console.log(e))}>삭제</button> : <></>}
    </div>

}