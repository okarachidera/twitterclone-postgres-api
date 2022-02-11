import { sql } from "../db-config/postgres-connection";

async function createTwit(user_id: string, tweetBody: string, image: string, whoCanReply: string) {
  const [newTwit] = await sql`
      insert into tweets (
      user_id, tweet_body, image, who_can_reply
      ) values (
      ${user_id}, ${tweetBody}, ${image}, ${whoCanReply}
      )
      returning *
    `;
  return newTwit;
}
async function twitDetails(id: string) {
    const result = await sql `
      select * from tweets
      where id=${id}
      returning *
    `
    return result;
}
async function deleteTwit(id: string) {
  const deleteTwit = await sql`
        delete from tweets
        where id=${id}
        returning *
      `;
  return deleteTwit;
}

async function getAllTwits() {
  const result = await sql`
   select * from tweets
  `;
  return result
}

export default { createTwit, deleteTwit, getAllTwits, twitDetails };
