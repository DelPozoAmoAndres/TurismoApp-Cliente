import React, { useRef } from 'react';
/* Models */
import { Review } from '@models/Activity';
/* Components */
import { ReviewItem } from '@activity-details/Reviews/ReviewItem';
import { Modal } from '@shared/Modal';
/* Styles */
import "./ReviewsModal.css";
/* i18n */
import { useTranslation } from 'react-i18next';

export const ReviewsModal: React.FC<{
    listOfComments: Review[],
    setRefresh: (arg: boolean) => void
}> = ({ listOfComments, setRefresh }) => {
    const { t } = useTranslation();
    const modal = useRef<HTMLIonModalElement>(null);
    return (
        <Modal id='modal-reviews' trigger={"modal-reviews"} title={t("ACTIVITY.REVIEWS.TITLE")} modal={modal} >
            <div id="list-activity-review" className="ion-margin-start ion-margin-end ion-margin-top">
                {listOfComments.map((comment, index) => (
                    <div key={"comment-extended" + index} style={{ width: "100%" }}>
                        <ReviewItem comment={comment} setRefresh={setRefresh} />
                    </div>
                ))}
            </div>
        </Modal>
    )
}
