import prisma from "@lib/prisma";
import { getSession } from "next-auth/react";

// DELETE /api/post/:id
export default async function handle(req, res) {
  const postId = req.query.id;
  const session = await getSession({ req });

  console.log("session", session);

  if (req.method === "DELETE") {
    const post = await prisma.post.deleteMany({
      where: {
        id: postId,
        author: { email: session.user.email },
      },
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
