import { Request, Response } from "express";
import { twitValidate } from "../utils/validators";
import ResponseStatus from "../utils/response";
import tweetModel from "../model/twit";

const responseStatus = new ResponseStatus();

export const createTweet = async (req: any, res: Response) => {
  try {
    const { tweet_body, image, who_can_reply } = req.body;
    const { errors, valid } = twitValidate(tweet_body, image, who_can_reply);
    if (!valid) {
      return res.status(400).send({ message: Object.values(errors)[0] });
    }
    const user_id = req.user.email.id
    const data = tweetModel.createTwit(user_id, tweet_body, image, who_can_reply);
    responseStatus.setSuccess(200, "Successfully created a tweet", { user_id, tweet_body, image, who_can_reply });
    return responseStatus.send(res);
  } catch (error: any) {
    console.error(error.message);
    responseStatus.setError(500, `${error.message}`);
    return responseStatus.send(res);
  }
};

export const deleteTweet = async (req: any, res: Response) => {
    const tweetId = req.params.id
    try{
        const twitDetails: any = tweetModel.twitDetails(tweetId)
        if(req.user.id === twitDetails.userId){

            const twit: any = tweetModel.deleteTwit(tweetId)
        }

    }catch(error: any) {
        console.error(error.message);
    responseStatus.setError(500, `${error.message}`);
    return responseStatus.send(res);
    }
}

export const getAllTwits = async (req: Request, res: Response) => {
    try{
        const data = tweetModel.getAllTwits()
        console.log(data)
        responseStatus.setSuccess(200, "Successfully got all twits", { data });
        return responseStatus.send(res);
    }catch(error: any) {
        console.error(error.message);
        responseStatus.setError(500, `${error.message}`);
        return responseStatus.send(res);
    }
}