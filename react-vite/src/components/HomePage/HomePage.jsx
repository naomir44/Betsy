import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../../redux/categories';
import './Homepage.css'

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => Object.values(state.categories));
  const user = useSelector((state)=> state.session.user)

  const [showLinks, setShowLinks] = useState({
    naomi: false,
    sam: false,
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const toggleLinks = (name) => {
    setShowLinks((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return (
    <div className="homepage">
      <div className="content-wrap">
     {user && <div className='greeting'><h1>Welcome back, {user?.username}!</h1></div>}
      <h1 className='homepage-message'>Shop our selections</h1>
      <h2 className='homepage-message-2'>Curated collections hand-picked by Betsy editors</h2>
      <div className="categories">
        {categories.map(category => (
          <Link to={`/category/${category.id}`} key={category.id} className="category-card">
            <img src={category.imageUrl} alt={category.name}></img>
            <h2>{category.name}</h2>
          </Link>
        ))}
      </div>
      </div>
      <footer className='footer'>
        <div className='footer-content'>
          <div className='creators-label'>Creators:</div>
          <div className='creators'>
            <div className='creator' onClick={() => toggleLinks('naomi')}>
              <span className='creator-name'>Naomi Ramirez</span>
              <div className={`creator-links ${showLinks.naomi ? 'visible' : ''}`}>
                <a href="https://github.com/naomir44" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/naomiramirez" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
            <div className='creator' onClick={() => toggleLinks('sam')}>
              <span className='creator-name'>Sam Covert</span>
              <div className={`creator-links ${showLinks.sam ? 'visible' : ''}`}>
                <a href="https://github.com/samcovert" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/sam-covert-3b1482321/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
