const express = require('express');
const app = require('./app.js');
const Route = express.Router();
const basePath = '/v1/nodes';

Route.post(basePath+'/engine/addQuestion',app.addQuestion);
Route.get(basePath+'/engine/fetchAllQuestion',app.fetchAllQuestion);
Route.post(basePath+'/engine/addAnswer',app.addAnswer);
Route.post(basePath+'/engine/modifyAnswer',app.modifyAnswer);
Route.post(basePath+'/engine/deleteAnswer',app.deleteAnswer);
Route.post(basePath+'/engine/addComment',app.addComment);
Route.post(basePath+'/engine/addlike',app.addlike);
Route.post(basePath+'/engine/upvoteAnswer',app.upvoteAnswer);
Route.get(basePath+'/engine/search',app.search);
Route.get(basePath+'/engine/getAllQuestionRelatedData/:id',app.getAllQuestionRelatedData);

module.exports = Route;



