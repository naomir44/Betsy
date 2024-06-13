import OpenModalButton from '../OpenModalButton'
import ReviewForm from './ReviewForm';

const ReviewButton = ({productId}) => {
  return (
    <OpenModalButton
      modalComponent={<ReviewForm productId={productId}/>}
      buttonText="Leave a Review"
    />
  );
};

export default ReviewButton;
