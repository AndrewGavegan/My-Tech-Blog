const updateReview = async (e) => {
    e.preventDefault();
    const element = e.target;
    const elementType = element.getAttribute('type');

    if (element.matches('button')) {
        const post_id = e.target.getAttribute('data-post');
        if (elementType === 'submit') {
            //get div where editing occurs
            const parent = element.parentElement;
            const body = parent.querySelector(`#content-${post_id}`).value.trim();
            const rating = parent.querySelector('.my-rating-edit').getAttribute('data-rating');

            // for posting a review //
            if (body && rating) {
                const res = await fetch(`/api/review/${post_id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ body, rating, }),
                    headers: { 'Content-Type': 'application/json' },
                });
                // can change this location once we know exactly what files are named what //
                if (res.ok) {
                    alert('Review updated');
                    document.location.reload();
                }
            }
        } else if (elementType === 'delete') {
            // if type is delete, then the Delete post is clicked
            if (post_id) {
                const response = await fetch(`/api/review/${post_id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    alert('Post deleted');
                    document.location.reload();
                }
            }
        }
    }
};