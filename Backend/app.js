const log = console.log;

const Paper = require('./model/paper');
const Answer = require('./model/answer');
const Comment = require('./model/comments');

const functions = {

  async addQuestion(req, res) {
    //log(req.params);
    //log(req.body);
    try {
      log("Inside try catch");

      //save individual object
      const comments = '';
      const commentRes = '';
      if(req.body.answer[0] && req.body.answer[0].comments){
         comments = Comment({
          "title": req.body.answer[0].comments[0].title,
          "liked": req.body.answer[0].comments[0].liked
        });
         commentRes = await comments.save();
      }
      const answer = Answer({
        "solution": req.body.answer[0].solution,
        "beforeAnsDesc": req.body.answer[0].beforeAnsDesc,
        "afterAnsDesc": req.body.answer[0].afterAnsDesc,
        "upvote": req.body.answer[0].upvote,
        "comments": commentRes._id
      });
      const answerRes = await answer.save();
      const paper = Paper({
        "question": req.body.question,
        "afterDesc": req.body.afterDesc,
        "beforeDesc": req.body.beforeDesc,
        "viewed": req.body.viewed,
        "answer": answerRes._id
      });
      const paperRes = await paper.save();

      log("After save");
      return res.status(200).json({ result: paperRes, status: 'OK' });


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
      const paperRes = await Paper.findById(req.params.id).populate({ path: 'answer', populate: { path: 'comments' } }).exec();
      return res.status(200).json({ result:paperRes, status: 'OK' });
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
        const answer = Answer({
          "solution": req.body.answer.solution,
          "beforeAnsDesc": req.body.answer.beforeAnsDesc,
          "afterAnsDesc": req.body.answer.afterAnsDesc
        });
        const answerRes = await answer.save();
        const response = await Paper.findOneAndUpdate({ _id: req.body.qid }, { $push: { answer: answerRes._id } }).exec();
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
        const comments = Comment({
          "title": req.body.comments.title
        });
        const commentsRes = await comments.save();
        const response = await Answer.findOneAndUpdate({ _id: req.body.aid }, { $push: { comments: commentsRes._id } }).exec();
        return res.status(200).json({ result: response, status: 'OK' });
      } else {
        return res.status(200).json({ result: "Record not found !!!", status: 'OK' });
      }
    } catch (err) {
      res.status(404).send(await handleError(err));
    }
  },
  async addlike(req, res) {
    res.send("API Call Sucessfull !!!");
  },
  async upvoteAnswer(req, res) {
    res.send("API Call Sucessfull !!!");
  },
  async search(req, res) {
    try {
      let paperRes = '';
      if(req.query.name && req.query.name!=undefined){
        paperRes = await Paper.find({question: new RegExp(req.query.name, 'i')}).populate({ path: 'answer', populate: { path: 'comments' } }).exec();
      }else{
        paperRes = await Paper.find().populate({ path: 'answer', populate: { path: 'comments' } }).exec();
      }
     
     return res.status(200).json({ result: paperRes, status: 'OK' });
    } catch (err) {
      log(err.message);
      res.status(404).send(await handleError(err));
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
