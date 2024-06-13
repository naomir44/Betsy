import OpenModalButton from '../OpenModalButton'
import ReviewForm from './ReviewForm';
import './ReviewForm.css'

const ReviewButton = ({productId}) => {
  return (
    <OpenModalButton
      modalComponent={<ReviewForm productId={productId}/>}
      buttonText="Leave a Review"
    />
  );
};

export default ReviewButton;
