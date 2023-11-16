import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'
const Login = ({ history, location }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {

        if (isAuthenticated) {
            history.push(redirect)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, alert, isAuthenticated, error, history, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Login'} />

                    <div className="container mt-5" style={{marginBottom: '50px'}}>
                        <div className="row justify-content-center">
                            <div className="col-md-5 mt-5">
                                <form className="shadow-lg p-4 bg-white" onSubmit={submitHandler}>
                                    <h1 className="mb-4 text-center">Đăng Nhập</h1>
                                    <div className="mb-3">
                                        <label htmlFor="email_field" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            id="email_field"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password_field" className="form-label">Mật khẩu</label>
                                        <input
                                            type="password"
                                            id="password_field"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <button
                                        id="login_button"
                                        type="submit"
                                        className="btn btn-primary btn-block py-2"
                                    >
                                        ĐĂNG NHẬP
                                    </button>

                                    <div className="text-center mt-3">
                                        <Link to="/register" className="text-decoration-none">Bạn chưa có tài khoản?</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                </Fragment>
            )}
        </Fragment>
    )
}

export default Login
