import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { create } from '../services/user'

const CreateAccount = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [showConfetti, setShowConfetti] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await create(data)
      if (response.status === 200) {
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
        }, 3000);
        toast.success('Te has registrado exitosamente :D', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        toast.error('Hubo un error al registrarte :(', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Hubo un error al registrarte :(', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    reset();
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Crear Cuenta</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" className={`form-control ${errors.name ? "is-invalid" : ""}`} id="name" placeholder="Ingresa tu nombre" {...register("name", { required: "Este campo es requerido" })} />
            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              placeholder="Ingresa tu correo electrónico"
              {...register("email", { required: "Este campo es requerido", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Ingresa un correo electrónico válido" } })} />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" className={`form-control ${errors.password ? "is-invalid" : ""}`} id="password" placeholder="Contraseña" {...register("password", { required: "Este campo es requerido", minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" } })} />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>
          <button type="submit" className="btn btn-primary mt-3">Crear cuenta</button>
        </form>
      </div>
      {showConfetti && <Confetti/>}
      <ToastContainer/>
    </div>
  );
};

export default CreateAccount;
