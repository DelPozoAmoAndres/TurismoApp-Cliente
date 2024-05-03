import { useEffect, useState } from 'react';
import { Review } from '@models/Activity';
import { getReviews } from '@apis/reviewApi';

export const useReviewsData = (activityId: string) => {
    const [listOfComments, setListOfComments] = useState<Review[]>();
    const reviewsDefault: Review[] = Array(8).fill({
        id: '1',
        activityId: '1',
        userId: '1',
        rating: 5,
        comment: 'This is a test review',
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    useEffect(() => {
        getReviews(activityId).then(reviews => setListOfComments(reviews)).catch(err => console.error(err));
        setListOfComments(reviewsDefault);
        // eslint-disable-next-line
    }, [activityId])
    return listOfComments;
}
