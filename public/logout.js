const logoutClick = async () => {
    const res = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
        document.location.assign('/');
    } else {
        alert(res.status);
    }
};

document.querySelector('#logoutBtn').addEventListener('click', logoutClick);