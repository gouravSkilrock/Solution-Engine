const protocol='http';
const host='localhost';
const port='3030';
const basePath='/api/v1/nodes/engine';

module.exports = {
     host:host,
     port:port,
     protocol:protocol,
     designation : ['Engineer','Sr. Engineer','Lead Engineer','Technical Lead','Solution Architect','Manager','Sr. Manager','General Manager','Head of Engineering','Vice-president','President','CTO','CFO','CEO'],
     basePath:basePath,
     search:basePath+'/search',
     fetchAllQuestion:basePath+'/fetchAllQuestion',
     addQuestion:basePath+'/addQuestion',
     addAnwser:basePath+'/addAnswer',
     deleteAnswer:basePath+'/deleteAnswer',
     addComment:basePath+'/addComment',
     getAllQuestionRelatedData:basePath+'/getAllQuestionRelatedData',
     upvoteAnswer:basePath+'/upvoteAnswer',
     addlike:basePath+'/addlike',
     addCommentLike:basePath+'/addCommentLike',
     login:basePath+'/login',
     signUpUser:basePath+'/signUpUser'
}