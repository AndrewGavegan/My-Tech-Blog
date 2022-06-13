async function updatePostHandle(e) {
    e.preventDefault();

    const name = document.querySelector('#postName').value;
    const content = document.querySelector('#postBody').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            content
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(res.statusText)
    }
}

document.querySelector('.update-form').addEventListener('submit', updatePostHandle);