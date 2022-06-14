async function addCommentHandle(e) {
    e.preventDefault();

    const commentContent = document.querySelector('#commentText').value.trim();
    // copy from update.js, method for grabbing post id from the url //
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1];

    if (commentContent) {
        const res = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                commentContent
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (res.ok) {
            document.location.reload();
        } else {
            alert(res.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', addCommentHandle);