const nodemailer = require('../config/node_mailer');

exports.newComment = (comment)=>{
    nodemailer.transporter.sendMail({
        from : 'anikhare99@gmail.com',
        to : comment.user.email,
        subject : 'Comment Published!',
        html : nodemailer.renderTemplate({comment : comment} , '/comments/new_comment.ejs')
    }, (err, info) =>{
        if(err){
            console.log('error in sending email ' , err);
            return;
        };

        // console.log('message sent ', info);
        return;
    });
};