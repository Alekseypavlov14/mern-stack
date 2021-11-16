import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    useEffect( () => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
        } catch (e) {}
    }

    const loginHandler = async () => {
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Links for you</h1>
                <div className="card teal accent-1 black-text">
                    <div className="card-content">
                        <span className="card-title">Authorisation</span>
                        <div>

                            <div className="input-field">
                                <input
                                    placeholder="Input email..." 
                                    id="email" 
                                    type="text" 
                                    name="email"
                                    className="white-input"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email white-text">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Input password..." 
                                    id="password" 
                                    type="password" 
                                    name="password"
                                    className="white-input"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email white-text" className="label-white-text">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn yellow darken-4" 
                            style={{marginRight: 10}}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Come
                        </button>
                        <button 
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}