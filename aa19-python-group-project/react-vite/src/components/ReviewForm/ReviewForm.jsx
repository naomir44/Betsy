import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createReview } from '../..redux/reviews'

const CreateReview = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(0)
}
