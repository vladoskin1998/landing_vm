import React, {useState, useEffect, useContext, useRef} from 'react';
import {$authApi} from '../../api/api';
import {AppContext} from '../../context/context';

export const Login = () => {
	const modalRef = useRef<HTMLDivElement>(null);
	const [showModal, setShowModal] = useState(false);
	const [login, setLogin] = useState('Veronika');
	const [password, setPassword] = useState('VeronRealty1221');
	const {isAuth, setIsAuth, device} = useContext(AppContext);
    
	useEffect(() => {
		const keysPressed: Record<string, boolean> = {};

		const downHandler = ({key}: KeyboardEvent) => {
			keysPressed[key] = true;
			if (keysPressed.q && keysPressed.m && keysPressed.f && device === 'pc') {
				setShowModal(true);
			}
		};

		const upHandler = ({key}: KeyboardEvent) => {
			keysPressed[key] = false;
		};

		window.addEventListener('keydown', downHandler);
		window.addEventListener('keyup', upHandler);

		return () => {
			window.removeEventListener('keydown', downHandler);
			window.removeEventListener('keyup', upHandler);
		};
	}, []);

	const loginAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		$authApi.post('login',
			{login, password},
		)
			.then(m => {
                console.log(m.data);
                localStorage.setItem('token', m.data);
				setIsAuth(m.data);
				setShowModal(false);
			})
			.catch(error => {
                alert(error?.response?.data?.message || 'Error occurred');
			},
			);
	};

	const logoutAuth = () => {
		$authApi.post('logout',
			{token: localStorage.getItem('token')},

		).then(
			() => {
				setIsAuth('');
			},
		)
			.catch(e => {
				alert(e);
			},
			);
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
						<button className='login__nav--add' onClick={loginAuth}>Login</button>
					</div>
				</div>

			)}
			{
				isAuth
					? <div className='login__logout'>
						<button className='login__logout--delete' onClick={logoutAuth}>Logout</button>
					</div>
					: <></>
			}
		</>
	);
};
