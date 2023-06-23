import React, { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from '../../context/AppContext';
import { AuthContext } from '../../context/AuthContext';

export const Login = () => {

	const modalRef = useRef<HTMLDivElement>(null);
	const [showModal, setShowModal] = useState(false);

	//Veronika VeronRealty1221

	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const { device } = useContext(AppContext);
	const { isAuth, loginAuth, logoutAuth } = useContext(AuthContext)

	useEffect(() => {
		const keysPressed: Record<string, boolean> = {};

		const downHandler = ({ key }: KeyboardEvent) => {
			keysPressed[key] = true;
			if (keysPressed.q && keysPressed.m && keysPressed.f && device === 'pc') {
				setShowModal(true);
			}
		};

		const upHandler = ({ key }: KeyboardEvent) => {
			keysPressed[key] = false;
		};

		window.addEventListener('keydown', downHandler);
		window.addEventListener('keyup', upHandler);

		return () => {
			window.removeEventListener('keydown', downHandler);
			window.removeEventListener('keyup', upHandler);
		};
	}, []);


	const handlerLoginAuth = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		await loginAuth({ login, password })
		setShowModal(false)
	};

	const handlerLogoutAuth = () => {
		logoutAuth()
	};

	const handlerLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLogin(e.target.value);
	};

	const handlerPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	useEffect(() => {
		function handleClickOutside(event: any) {
			if (modalRef.current && !modalRef?.current.contains(event.target as Node)) {
				setShowModal(false);
			}
		}

		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [modalRef]);

	return (
		<>
			{showModal && (

				<div className='login' ref={modalRef}>
					<div className='login_item'>
						<h4 className='login__text'>Login  {Boolean(login) || <span className='login__text login__text-req'>Required field</span>}</h4>
						<input type='text' className='login__input' value={login} onChange={handlerLogin} />
					</div>
					<div className='login_item'>
						<h4 className='login__text'>Password {Boolean(password) || <span className='login__text login__text-req'>Required field</span>}</h4>
						<input type='password' className='login__input' value={password} onChange={handlerPassword} />
					</div>

					<div className='login__nav'>
						<button className='login__nav--delete' onClick={() => {
							setShowModal(false);
						}}>
							Cancel
						</button>
						<button className='login__nav--add' onClick={handlerLoginAuth}>Login</button>
					</div>
				</div>

			)}
			{
				isAuth
					? <div className='login__logout'>
						<button className='login__logout--delete' onClick={handlerLogoutAuth}>Logout</button>
					</div>
					: <></>
			}
		</>
	);
};
