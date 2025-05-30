import { useState } from "react";

export default function authServices() {
  const [authLoading, setAuthLoading] = useState(false);

  const url = "http://localhost:3000/auth";

  const login = (formData) => {
    setAuthLoading(true); //esta carregando
    fetch(`${url}/login`, { //requisições para outras url
      method: "POST", //enviar dados ao backend
      headers: { //configurações a serem feitas
        "Content-Type": "application/json", //demonstra o campo e o valor no cliente, campo:valor
        "Access-Control-Allow-Origin": "*", //evitar interferencia do servidos e o frontend na mesma maquina
      },
      body: JSON.stringify(formData), //transforma nosso objeto em uma string e dá leveza na comunicação do servidor com o frontend
    })
    .then((response) => response.json()) //então.. recebo a resposta em forma de JSON
    .then((result) => {
      console.log(result);
      if(result.sucess && result.body.token){ // Informação que apareceu no browser, para SALVAR
        localStorage.setItem('auth', 
          JSON.stringify({token: result.body.token, user: result.body.user})
        )
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => { //finalmente, achou o erro fez tudo . .
      setAuthLoading(false); //chegou ao fim, desativa o carregamento
    });
  };

  const logout = () => {};

  const signup = (formData) => {
    setAuthLoading(true);
    fetch(`${url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((result) => {
      if (result.sucess && result.body.token) {
        localStorage.setItem("auth",
          JSON.stringify({ token: result.body.token, user: result.body.user, })
        );
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setAuthLoading(false);
    });
  };

  return { login, logout, signup, authLoading };
}
