import React, { useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { updateLayout } from '../../app/index';
import notFoundImg from '../Error/not-found.jpg'
import { useNavigate } from 'react-router-dom';
export default function NotFound() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(updateLayout(true)) // set isFullLayout as true 
  }, [])

  function back() {
    dispatch(updateLayout(false)) // set isFullLayout false 
    navigate('/'); // back to dashboard 
  }
  return (
    <Container>
      <div className='text-center'>
        <img
          src={notFoundImg}
          width="50%"
          height="50%"
          className="d-inline-block align-top"
          alt="R"
        />
        <p className='text-danger m-2'>Page Not Found !!</p>
        <Button onClick={back}>Go to home</Button>
      </div>
    </Container>
  )
}
