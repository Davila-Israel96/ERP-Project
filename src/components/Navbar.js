import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
	return (
		<nav>
			<div className='nav-center'>
				<div className='nav-header'>
					<img className='logo' src='/dibLogo.png' alt='logo' />
				</div>
				<div className='nav-title'>
					<h1 className='navbar-heading'>DIBTech Analytics</h1>
				</div>
				<div className='links-container'>
					<ul className='links'>
						<li>
							<Link className='page-link' to='/forms'>
								Forms
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
