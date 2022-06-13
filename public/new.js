async function createpostHandle(e) {
    e.preventDefault();

    const name = document.querySelector('#postName').value;
    const content = document.querySelector('#postBody').value;

    const res = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            name,
            content
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) {
        document.location.replace('/');
    } else {
        alert(res.statusText)
    }
}

document.querySelector('.post-form').addEventListener('submit', createpostHandle);