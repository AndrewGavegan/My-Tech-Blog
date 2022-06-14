async function addCommentHandle(e) {
    e.preventDefault();

    // use same name that you said you would search for in the router, eg body and body, or content and content I feel like this is why i always get errors!!!!
    const content = document.querySelector('#commentText').value.trim();
    // copy from update.js, method for grabbing post id from the url //
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1];
    if (content) {
        const res = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                content
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (res.ok) {
            document.location.reload();
        } else {
            alert(res.statusText);
        }
    } else {
        alert(`enter a comment before trying to add one!`)
    }
}


document.querySelector('.comment-form').addEventListener('submit', addCommentHandle);