import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Thông tin cá nhân'} />

                    <h2 className="mt-5 ml-5">Thông tin cá nhân</h2>
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3 text-center">
                            <figure className='avatar avatar-profile'>
                                <img className="rounded-circle img-fluid border border-primary shadow" src={user.avatar.url} alt={user.name} />
                            </figure>
                            <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-3">
                                Sửa thông tin
                            </Link>
                        </div>

                        <div className="col-12 col-md-6">
                            
                            <div className="profile-details p-4  border-primary rounded" style={{ marginBottom: '20px', border: '2px solid #002af7 ' }}>
                                <h2 className="text-center mb-4">Thông tin cá nhân</h2>

                                <div className="profile-item mb-3" style={{
                                    border: '2px solid #002af7',
                                    padding: '5px',
                                    paddingLeft: '11px',
                                    borderRadius: '7px'
                                }}>
                                    <div className="item-label">Họ và Tên</div>
                                    <div className="item-value">{user.name}</div>
                                </div>

                                <div className="profile-item mb-3" style={{
                                    border: '2px solid #002af7',
                                    padding: '5px',
                                    paddingLeft: '11px',
                                    borderRadius: '7px'

                                }}>
                                    <div className="item-label">Email</div>
                                    <div className="item-value">{user.email}</div>
                                </div>

                                <div className="profile-item mb-3" style={{
                                    border: '2px solid #002af7',
                                    padding: '5px',
                                    paddingLeft: '11px',
                                    borderRadius: '7px'
                                }}>
                                    <div className="item-label">Ngày tham gia</div>
                                    <div className="item-value">{String(user.createdAt).substring(0, 10)}</div>
                                </div>

                                {user.role !== 'admin' && (
                                    <Link to="/orders/me" className="btn btn-danger btn-block mt-4">
                                        Xem đơn hàng
                                    </Link>
                                )}

                                <Link to="/password/update" className="btn btn-primary btn-block mt-3">
                                    Thay đổi mật khẩu
                                </Link>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
            }
        </Fragment >
    )
}

export default Profile
