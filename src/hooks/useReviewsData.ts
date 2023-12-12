import { useEffect, useState } from 'react';
import { Review } from '@models/Activity';
import { getReviews } from '@apis/reviewApi';

export const useReviewsData = (activityId: string) => {
    const [listOfComments, setListOfComments] = useState<Review[]>();
    useEffect(() => {
        getReviews(activityId).then(reviews => setListOfComments(reviews));
    },[activityId])
    return listOfComments;
}
