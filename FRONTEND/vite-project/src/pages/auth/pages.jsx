import { useEffect, useState } from "react";
import { TextField, Button, styled } from "@mui/material";
import styles from "./page.module.css";
import authServices from "../../services/auth";

export default function Auth() {
  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState(null);
  const {login, signup, authLoading} = authServices()

  const handleChangeFormType = () => {
    setFormData(null);
    if (formType === "login") {
      setFormType("signup");
    } else {
      setFormType("login");
    }
  };

  const handleFormDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    switch(formType){
      case "login":
        login(formData)
      break
      case "signup":
        if(formData.password !== formData.confirmPassword){
          console.log('Senhas não combinam')
          return
        }
        signup(formData)
      break  
    }
  };

  if (formType === "login") {
    return (
      <div className={styles.authPageContainer}>
        <h1>Entre</h1>
        <button onClick={handleChangeFormType}>
          Você não tem uma Conta? Clique Aqui
        </button>
        <form onSubmit={handleSubmitForm}>
          <TextField
            required
            label="E-Mail 📧"
            type="email"
            name="email"
            onChange={handleFormDataChange}
          />
          <TextField
            required
            label="Senha 🔒"
            type="password"
            name="password"
            onChange={handleFormDataChange}
          />
          <Button type="submit">Conecte-se</Button>
        </form>
      </div>
    );
  }

  if(authLoading){
    return (<h1>Loading . . .</h1>)
  }

  if (formType === "signup") {
    return (
      <div className={styles.authPageContainer}>
        <h1>Inscreva-se</h1>
        <button onClick={handleChangeFormType}>
          Se já tem uma conta. Clique Aqui
        </button>
        <form onSubmit={handleSubmitForm}>
          <TextField
            required
            label="Nome Completo"
            type="nomecompleto"
            name="nomecompleto"
            onChange={handleFormDataChange}
          />
          <TextField
            required
            label="E-Mail"
            type="email"
            name="email"
            onChange={handleFormDataChange}
          />
          <TextField
            required
            label="Senha"
            type="password"
            name="password"
            onChange={handleFormDataChange}
          />
          <TextField
            required
            label="Confirme Senha"
            type="confirmPassword"
            name="confirmPassword"
            onChange={handleFormDataChange}
          />
          <Button type="submit">Inscrever-se</Button>
        </form>
      </div>
    );
  }
}
