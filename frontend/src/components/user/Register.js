import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../../actions/userActions'

const Register = ({ history }) => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    useEffect(() => {

        if (isAuthenticated) {
            history.push('/')
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, alert, isAuthenticated, error, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);

        dispatch(register(formData))
    }

    const onChange = e => {
        if (e.target.name === 'avatar') {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])

        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    return (
        <Fragment>

            <MetaData title={'Đăng ký'} />

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 mt-5">
                        <form className="shadow-lg p-3 mb-5 bg-body-tertiary rounded" onSubmit={submitHandler} encType='multipart/form-data'>
                            <h1 className="mb-4 text-center">Đăng ký</h1>

                            <div className="mb-3">
                                <label htmlFor="name_field" className="form-label">Tên</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    name='name'
                                    value={name}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email_field" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    name='email'
                                    value={email}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password_field" className="form-label">Mật khẩu</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    name='password'
                                    value={password}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='avatar_upload' className="form-label">Hình nền</label>
                                <div className='d-flex align-items-center'>
                                    <div>
                                        <figure className='avatar mr-3'>
                                            <img
                                                src={avatarPreview}
                                                className='rounded-circle'
                                                alt='Ảnh nền'
                                            />
                                        </figure>
                                    </div>
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='avatar'
                                            className='custom-file-input'
                                            id='customFile'
                                            accept="images/*"
                                            onChange={onChange}
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Chọn ảnh
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {loading ? <Loader /> : (
                                <button
                                    id="register_button"
                                    type="submit"
                                    className="btn btn-primary btn-block py-2"
                                    disabled={loading ? true : false}
                                >
                                    ĐĂNG KÝ
                                </button>

                            )}

                            <div className="text-center mt-3">
                                <Link to="/login" className="text-decoration-none">Đã có tài khoản? Đăng nhập ngay</Link>
                            </div>


                        </form>

                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default Register
