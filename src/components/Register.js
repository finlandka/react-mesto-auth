import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from '../utils/Auth.js';

function Register() {
  
  const [formValue, setFormValue] = useState({
    password: '',
    email: ''
  })

  const navigate = useNavigate();

  function handleChange(e) {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });

  }

  function handleSubmit(e) {
    e.preventDefault();
    
    const {password, email} = formValue;
    register(password, email).then(() => {
      navigate('/sign-in', {replace:true})
    })
  }

    return (
        <div className="form">
        <h2 className="form__title">Регистрация</h2>
        <form className="register" onSubmit={handleSubmit}>
        <input className="form__input" type="email" placeholder="Email" name="email" onChange={handleChange} required/>
        <input className="form__input" type="password" placeholder="Пароль" name="password" onChange={handleChange} required/>
         <button className="form__button" type="submit">Зарегистрироваться</button>
         <Link to="/sign-in" className="form__link" title="Войти">Уже зарегистрированы? Войти</Link>
        </form>
      </div>
    );
  }
  
  export default Register;