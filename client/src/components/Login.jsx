import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../services/login'


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    const response = await login(data);
    
    if (response.ok) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      toast.success('¡Acceso exitoso! :D', { autoClose: 3000 });
      navigate('/player');
    } else {
      toast.error('Email o contraseña incorrecta :(', { autoClose: 3000 });
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Iniciar Sesión</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Ingresa tu correo electrónico"
              {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
            />
            {errors.email?.type === 'required' && <p className="text-danger">El correo electrónico es requerido</p>}
            {errors.email?.type === 'pattern' && <p className="text-danger">Ingresa un correo electrónico válido</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Contraseña"
              {...register('password', { required: true, minLength: 6 })}
            />
            {errors.password?.type === 'required' && <p className="text-danger">La contraseña es requerida</p>}
            {errors.password?.type === 'minLength' && (
              <p className="text-danger">La contraseña debe tener al menos 6 caracteres</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Iniciar Sesión
          </button>
        </form>
      </div>
      {showConfetti && <Confetti/>}
    </div>
  );
};

export default Login;
