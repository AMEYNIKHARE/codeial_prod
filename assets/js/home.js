{

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
                    new PostComments(data.data.post._id);

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
    }

   
    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#post-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }


    createPost();
    convertPostsToAjax();
}