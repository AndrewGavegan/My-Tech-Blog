async function addCommentHandle(e) {
    e.preventDefault();

    //must use same name that you said you would search for in the router, eg body and body, or content and content, I forget this everytime!!!!
    const body = document.querySelector('#commentText').value.trim();
    // copy from update.js, method for grabbing post id from the url //
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1];

    if (body) {
        const res = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                body
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