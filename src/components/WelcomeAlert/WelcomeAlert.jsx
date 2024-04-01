import { Alert } from 'react-bootstrap';
import './WelcomeAlert.css'
import { useState, useEffect } from 'react';
import EpibookLogoWhite from '../MyNav/EPIBOOKS_white.png'

export default function WelcomeAlert () {
    //gestione scomparsa alert dopo 2s:    
    const [welcome, setWelcome] = useState(true);

    useEffect(() => {
        setTimeout(() => { setWelcome(false) }, 2500)
        }, []);    

    return (
    <>
    {welcome && 
    <div className='d-flex justify-content-center mt-4 position-up'>
        <Alert className='welcome-message d-flex flex-column align-items-center'>
            <span className='fs-6 mb-4'>Benvenuti nella mia prima app React!</span>
                <img className='w-25' src={EpibookLogoWhite} alt="logo_epibook" />
        </Alert>
    </div>}
    </>
    )
}
    