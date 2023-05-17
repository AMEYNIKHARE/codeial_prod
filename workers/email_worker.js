const queue = require('../config/kue');

const commentMailer = require('../mailers/comment_mailer');

queue.process('emails' , function(job , done){
    commentMailer.newComment(job.data);
    done();
});