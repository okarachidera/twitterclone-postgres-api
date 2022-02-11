import { sql } from "../db-config/postgres-connection";

async function createComment (user_id: string, tweet_id: string, content: string){
    const [newComment] = await sql`
      insert into tweets (
      user_id, tweet_id, content
      ) values (
      ${user_id}, ${tweet_id}, ${content}
      )
      returning *
    `;
  return newComment;
}
export default {createComment}