import React from 'react'
import { Link } from 'react-router-dom';

const WrongPage = () => {
  return (
    <div style={styles.container}>
    <h1 style={styles.heading}>404 - Page Not Found</h1>
    <p style={styles.text}>Oops! The page you are looking for doesn't exist. please go back to the main page </p>
    <Link to="/" style={styles.link}>Go back to Home !</Link>
  </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: 'black',
  },
  heading: {
    fontSize: '50px',
    color: 'white',
  },
  text: {
    fontSize: '20px',
    margin: '20px 0',
    color :'white'
  },
  link: {
    fontSize: '18px',
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default WrongPage
