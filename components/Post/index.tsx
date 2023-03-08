import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import * as S from "./styles";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const res = await fetch(`/api/post/${post.id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      Router.push("/");
    }
  };

  return (
    <S.PostBody onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <div>By {authorName}</div>
      {/* <ReactMarkdown children={post.content} /> */}
      {post.content}
      <button onClick={handleDeleteClick}>Delete</button>
    </S.PostBody>
  );
};

export default Post;
