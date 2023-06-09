// // Let's implement this via classes

// // this class would be initialized for every post on the page
// // 1. When the page loads
// // 2. Creation of every post dynamically via AJAX

// class PostComments{
//     // constructor is used to initialize the instance of the class whenever a new instance is created
//     constructor(postId){
//         this.postId = postId;
//         this.postContainer = $(`#post-${postId}`);
//         this.newCommentForm = $(`#post-${postId}-comments-form`);

//         this.createComment(postId);

//         let self = this;
//         // call for all the existing comments
//         $(' .delete-comment-button', this.postContainer).each(function(){
//             self.deleteComment($(this));
//         });
//     }


//     createComment(postId){
//         let pSelf = this;
//         this.newCommentForm.submit(function(e){
//             e.preventDefault();
//             let self = this;

//             $.ajax({
//                 type: 'post',
//                 url: '/comment/create-comment',
//                 data: $(self).serialize(),
//                 success: function(data){
//                     let newComment = pSelf.newCommentDom(data.data.comment);
//                     $(`#post-comments-${postId}`).prepend(newComment);
//                     pSelf.deleteComment($(' .delete-comment-button', newComment));

//                     new Noty({
//                         theme: 'relax',
//                         text: "Comment Published!",
//                         type: 'success',
//                         layout: 'topRight',
//                         timeout: 1500
                        
//                     }).show();

//                 }, error: function(error){
//                     console.log(error.responseText);
//                 }
//             });


//         });
//     }


//     newCommentDom(comment){
//         // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
//         return $(`
//         <li id="comment-${comment._id}" style="font-family: Arial, Helvetica, sans-serif;">
//             ${comment.content}
//             &emsp;&emsp;&emsp;&emsp;
//             <small> by ${comment.user.name} </small>
//             <small>
//                 <a class="delete-comment-button" href="/comment/delete/${comment._id}">
//                     <button>Delete</button>
//                 </a>
//             </small>
//         </li>
//         `);
//     }


//     deleteComment(deleteLink){
//         $(deleteLink).click(function(e){
//             e.preventDefault();

//             $.ajax({
//                 type: 'get',
//                 url: $(deleteLink).prop('href'),
//                 success: function(data){
//                     $(`#comment-${data.data.comment_id}`).remove();

//                     new Noty({
//                         theme: 'relax',
//                         text: "Comment Deleted",
//                         type: 'success',
//                         layout: 'topRight',
//                         timeout: 1500   
//                     }).show();

//                 },
//                 error: function(error){
//                     console.log(error.responseText);
//                 }
//             });

//         });
//     };
// }