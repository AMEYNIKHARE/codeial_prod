{
    // method to create a post 
    let createPost = function () {
        let postForm = $('#new-post-form');

        postForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type : 'post',
                url : '/post/create-post',
                data : postForm.serialize(),
                success : function(data){
                    let newPost = displayPost(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);                  
                    let deleteButton = $(' .delete-post-button', newPost);
                    deletePost(deleteButton);

                    // call the create comment class
                    // new PostComments(data.data.post._id);
                    createComment(data.data.post._id);

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error : function(err){
                    console.log(err);
                }
            })

        });
    };


    let displayPost = function(post){
        return $(`
        <li id="post-${post._id}" >

            <strong>
                ${post.content}
            </strong>
            <small>
                By ${post.user.name}
            </small>
            &emsp;&emsp;
            <small>
                <a class="delete-post-button" href="/post/delete/${post._id}"><button>Delete</button></a>
            </small>

            <ul id="post-comments-${post._id}">
            </ul>

            <div class="comment-input-container mt-3">
                <form action="/comment/create-comment" method="post" id="post-${post._id}-comments-form">
                    <input type="text" name="content" placeholder="Comment here..." required>
                    <input type="hidden" name="post" value=${post._id} >
                    <button type="submit">Add Comment</button>
                </form>
            </div>
            <hr>
        </li>
        
        `);
    };
 
    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                },
                error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    };

    // method to create a comment 
    let createComment = function(postId){
        let newCommentForm = $(`#post-${postId}-comments-form`)
        newCommentForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/comment/create-comment',
                data: newCommentForm.serialize(),
                success: function(data){
                    let newComment = newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    deleteComment($(' .delete-comment-button', newComment));

                    new Noty({
                        theme: 'relax',
                        text: "Comment Published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    };

    let newCommentDom = function(comment){
        // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
        return $(`
        <li id="comment-${comment._id}" style="font-family: Arial, Helvetica, sans-serif;">
            ${comment.content}
            &emsp;&emsp;&emsp;&emsp;
            <small> by ${comment.user.name} </small>
            <small>
                <a class="delete-comment-button" href="/comment/delete/${comment._id}">
                    <button>Delete</button>
                </a>
            </small>
        </li>
        `);
    };

    // method to delete a comment from DOM
    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500   
                    }).show();

                },
                error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    };

    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#post-list-container>ul>li').each(function(){
            let self = $(this);
            let postDeleteButton = $(' .delete-post-button', self);
            deletePost(postDeleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            // new PostComments(postId);
            createComment(postId);
            $(' .delete-comment-button', self).each(function(){
                deleteComment($(this));
            });
            
        });
    };


    createPost();
    convertPostsToAjax();
}