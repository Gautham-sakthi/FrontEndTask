import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../Styles/header.css';

function Header() {
    const history = useHistory();
    const logOut = () => {
        localStorage.removeItem('token');
        history.push('/');
    }
    return (
        <>
            <nav className='navbar navbar-light' style={{'backgroundColor':'#efefef'}}>
                <div className='container '>
                    <Link className='mr-auto navbar-brand' to='/tracks'>Home</Link>
                    <ul className="nav d-flex align-items-center nav-text">
                        <li className="nav-item ">
                            <Link to='/tracks' className='pr-4 nav-text'>tracks</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/albums' className='pr-4 nav-text'>albums</Link>
                        </li>
                        <li className="nav-item">
                            <button className='btn btn-info' onClick={
                                () => {
                                    logOut();
                                }
                            }> Logout</button>
                        </li>
                    </ul>
                </div>

            </nav>
        </>

    )
}

export default Header
