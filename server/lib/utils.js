function calculateAverageRating(comments) {
    if (comments.length === 0) {
        return 0; // No comments, so the average rating is 0
    }

    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
    const averageRating = totalRating / comments.length;

    return averageRating;
}

module.exports = { calculateAverageRating }