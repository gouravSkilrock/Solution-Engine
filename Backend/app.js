const log = console.log;

const Paper = require('./model/paper');
const Answer = require('./model/answer');
const Comment = require('./model/comments');
const UserInfo = require('./model/userInfo');
const Users = require('./model/users');

const functions = {

  async addQuestion(req, res) {
    //log(req.params);
    //log(req.body);
    try {
      log("Inside try catch");

      //save individual object
      let comments = '';
      let commentRes = '';
      let userInfo = '';
      let userInfoRes = '';

      if(req.body.question && req.body.question!=undefined){
        if(req.body.answer && req.body.answer[0] && req.body.answer[0].comments){
          if(req.body.answer[0] && req.body.answer[0].comments){
            comments = Comment({
             "title": req.body.answer[0].comments[0].title,
             "liked": req.body.answer[0].comments[0].liked
           });
            commentRes = await comments.save();
         }
         if(req.body.answer[0] && req.body.answer[0].userInfo){
           userInfo = UserInfo({
            "username": req.body.answer[0].userInfo.username,
            "designation": req.body.answer[0].userInfo.designation,
            "post": "Answer"
          });
           userInfoRes = await userInfo.save();
        }
         let answer = Answer({
           "solution": req.body.answer[0].solution,
           "beforeAnsDesc": req.body.answer[0].beforeAnsDesc,
           "afterAnsDesc": req.body.answer[0].afterAnsDesc,
           "upvote": req.body.answer[0].upvote,
           "comments": commentRes._id,
           "userInfo":userInfoRes._id
         });
         let answerRes = await answer.save();
         let paper = Paper({
           "question": req.body.question,
           "afterDesc": req.body.afterDesc,
           "beforeDesc": req.body.beforeDesc,
           "viewed": req.body.viewed,
           "answer": answerRes._id
         });
         let paperRes = await paper.save();
   
         log("After save");
         return res.status(200).json({ result: paperRes, status: 'OK' });
   
        }else{
          let paper = Paper({
            "question": req.body.question
          });
          let paperRes = await paper.save();
          return res.status(200).json({ result: paperRes, status: 'OK' });
        }
      }else{
        return res.status(404).json({ result: "Question can't be null", status: 'Error' });
      }
      

    } catch (err) {
      log("Inside catch");
      return res.status(404).send(await handleError(err));
    }


  },
  async fetchAllQuestion(req, res) {
    Paper.find().populate({ path: 'answer', populate: { path: 'comments' } }).exec(function (err, paper) {
      if (err) {
        res.status(404).send(handleError(err));
      }
      return res.status(200).json({ result: paper, status: 'OK' });
    });
  },
  async getAllQuestionRelatedData(req, res){
    try{

      const paperRes = await Paper.findById(req.params.id).exec();
      //log("Find By Id check ", paperRes);
      if (paperRes) {
        const paperResponse = await Paper.findOneAndUpdate({ _id: req.params.id }, { $inc: { "viewed" : 1 } },{new:true}).populate({ path: 'answer',populate: { path: 'comments',populate: { path: 'userCommentInfo' } } }).populate({ path: 'answer',populate: { path: 'userInfo' } }).exec();
        return res.status(200).json({ result:paperResponse, status: 'OK' });
      }else{
        return res.status(200).json({ result: "Record not found !!!", status: 'OK' });
      }
    }catch (err) {
      res.status(404).send(await handleError(err));
    }
  },
  async addAnswer(req, res) {
    // log(req.body);
    try {
      const paperRes = await Paper.findById(req.body.qid).exec();
      log("Find By Id check ", paperRes);
      if (paperRes) {
        const userInfo = UserInfo({
          "username":req.body.userInfo.username,
          "designation":req.body.userInfo.designation,
          "post": "Answer"
        });
        const userInfoRes  = await userInfo.save();
        //console.log("Save UserInfo", userInfoRes._id);
        const answer = Answer({
          "solution": req.body.answer.solution,
          "beforeAnsDesc": req.body.answer.beforeAnsDesc,
          "afterAnsDesc": req.body.answer.afterAnsDesc,
          "userInfo":userInfoRes._id
        });
        const answerRes = await answer.save();
        const response = await Paper.findOneAndUpdate({ _id: req.body.qid }, { $push: { answer: answerRes._id } },{new:true}).populate({ path: 'answer',populate: { path: 'comments',populate: { path: 'userCommentInfo' } } }).populate({ path: 'answer',populate: { path: 'userInfo' } }).exec();
        return res.status(200).json({ result: response, status: 'OK' });
      } else {
        return res.status(200).json({ result: "Record not found !!!", status: 'OK' });
      }
    } catch (err) {
      res.status(404).send(await handleError(err));
    }


  },
  async deleteAnswer(req, res) {
    
    try {
      const answer = await Answer.findByIdAndDelete(req.body.aid).exec();  
      return res.status(200).json({ result:answer, status: 'OK' });
    } catch (err) {
      res.status(404).send(await handleError(err));
    }
  },
  async modifyAnswer(req, res) {
    // res.send("API Call Sucessfull !!!");
  },
  async addComment(req, res) {
    // log(req.body);
    try {
      const answerRes = await Answer.findById(req.body.aid).exec();
      //log("Find By Id check ", answerRes);
      if (answerRes) {
        const userInfo = UserInfo({
          "username":req.body.comments.userCommentInfo.username,
          "designation":req.body.comments.userCommentInfo.designation,
          "post": "Comment"
        });
        const userInfoRes= await userInfo.save();
        const comments = Comment({
          "title": req.body.comments.title,
          "userCommentInfo":userInfoRes._id
        });
        const commentsRes = await comments.save();
        const response = await Answer.findOneAndUpdate({ _id: req.body.aid }, { $push: { comments: commentsRes._id } },{new:true}).populate({ path: 'comments',populate: { path: 'userCommentInfo' } } ).exec();
        return res.status(200).json({ result: response, status: 'OK' });
      } else {
        return res.status(200).json({ result: "Record not found !!!", status: 'OK' });
      }
    } catch (err) {
      res.status(404).send(await handleError(err));
    }
  },
  async addlike(req, res) {
    try {
      const answerRes = await Answer.findById(req.body.aid).exec();
      log("Find By Id check ", answerRes);
      if (answerRes) {
        const response = await Answer.findOneAndUpdate({ _id: req.body.aid }, { $inc: { "like" : 1 } },{new:true}).exec();
       // log("Response ",response);
        return res.status(200).json({ result: response, status: 'OK' });
      } else {
        return res.status(200).json({ result: "Record not found !!!", status: 'OK' });
      }
    } catch (err) {
      res.status(404).send(await handleError(err));
    }

  },

  async addCommentLike(req, res){

    try {
      const commentRes = await Comment.findById(req.body.cid).exec();
      log("Find By Id check ", commentRes);
      if (commentRes) {
        const response = await Comment.findOneAndUpdate({ _id: req.body.cid }, { $inc: { "liked" : 1 } },{new:true}).exec();
       // log("Response ",response);
        return res.status(200).json({ result: response, status: 'OK' });
      } else {
        return res.status(200).json({ result: "Record not found !!!", status: 'OK' });
      }
    } catch (err) {
      res.status(404).send(await handleError(err));
    }

  },
  async upvoteAnswer(req, res) {
    
    try {
      const answerRes = await Answer.findById(req.body.aid).exec();
      log("Find By Id check ", answerRes);
      if (answerRes) {
        let upVote=req.body.upvote;
        const response = await Answer.findOneAndUpdate({ _id: req.body.aid }, { $inc: { "upvote" : 1 }},{new:true}).exec();
       // log("Response ",response);
        return res.status(200).json({ result: response, status: 'OK' });
      } else {
        return res.status(200).json({ result: "Record not found !!!", status: 'OK' });
      }
    } catch (err) {
      res.status(404).send(await handleError(err));
    }

  },
  async search(req, res) {
    try {
      let paperRes = '';
      if(req.query.name && req.query.name!=undefined){
        paperRes = await Paper.find({question: new RegExp(req.query.name, 'i')}).populate({ path: 'answer',populate: { path: 'comments',populate: { path: 'userCommentInfo' } } }).populate({ path: 'answer',populate: { path: 'userInfo' } }).exec();
      }else{
        paperRes = await Paper.find().populate({ path: 'answer', populate: { path: 'comments' } }).exec();
      }
     
     return res.status(200).json({ result: paperRes, status: 'OK' });
    } catch (err) {
      log(err.message);
      res.status(404).send(await handleError(err));
    }
  },
  async signUpUser(req,res){

    try{
      let usersRes = '';
      let usersId = '';
      if(req.body && req.body.name && req.body.designation && req.body.name!=undefined && req.body.designation!=undefined){
        
      if(req.body && req.body.username!=undefined){
        usersId = await Users.find({username:req.body.username}).exec();
        log(usersId);
        if(usersId.length==0){
          let usersData = Users({
            username:req.body.username,
            name:req.body.name,
            designation:req.body.designation
          });
          usersRes = await usersData.save();
          return res.status(200).json({ result: usersRes, status: 'OK' });
        }else{
          return res.status(404).json({ result: "Username exist!", status: 'error' });
        }
      }else{
        return res.status(404).json({ result: "Bad Request", status: 'error' });
      }
      }else{
        return res.status(404).json({ result: "Bad Request", status: 'error' });
      }
    }catch (err) {
      log(err.message);
      res.status(403).send(await handleError(err));
    }
  },
  async login(req,res){
    //let usersRes = '';
    let usersId = '';
    try{
      if(req.query.username && req.query.username!=undefined){
        usersId = await Users.find({username:req.query.username}).exec();
        if(usersId.length!=0){
          return res.status(200).json({ result: usersId, status: 'OK' });
        }else{
          return res.status(401).json({ result: "Username not exist!", status: 'error' });
        }
      }else{
        return res.status(404).json({ result: "Bad Request", status: 'error' });
      }
    }catch (err) {
      log(err.message);
      res.status(403).send(await handleError(err));
    }
  }


}

async function handleError(error) {
  return {
    status: error.status || 'INVALID_REQUEST',
    error_message: error.message,
  };
};
module.exports = functions;
