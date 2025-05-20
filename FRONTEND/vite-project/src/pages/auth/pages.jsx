import { useState } from "react";
import { TextField, Button, styled } from "@mui/material";
import styles from "./page.module.css";

export default function Auth() {
  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState(null);

  const handleChangeFormType = () => {
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
    console.log(formData);
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
            type="senha"
            name="senha"
            onChange={handleFormDataChange}
          />
          <Button type="submit">Conecte-se</Button>
        </form>
      </div>
    );
  }
  if (formType === "signup") {
    return (
      <div className={styles.authPageContainer}>
        <h1>Inscreva-se</h1>
        <button onClick={handleChangeFormType}>
          Se já tem uma conta. Clique Aqui
        </button>
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
          type="senha"
          name="senha"
          onChange={handleFormDataChange}
        />
        <TextField
          required
          label="Confirme Senha"
          type="confirmesenha"
          name="confirmesenha"
          onChange={handleFormDataChange}
        />
        <Button type="submit">Inscrever-se</Button>
      </div>
    );
  }
}
