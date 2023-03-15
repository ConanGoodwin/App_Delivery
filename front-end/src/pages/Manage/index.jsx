import React, { useState } from 'react';

function Manage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [failedTryRegister, setfailedTryRegister] = useState(false);

  return (
    <main style={ { display: 'flex', flexDirection: 'column' } }>
      <section style={ { height: 'auto' } }>
        <h1>Cadastrar novo usuário</h1>
        <form>
          <input
            className="input_name_register"
            type="text"
            id="name-input"
            value={ userName }
            onChange={ (event) => setUserName(event.target.value) }
            placeholder="Seu nome"
            data-testid="admin_manage__input-name"
          />
          <input
            className="input_email_register"
            type="email"
            id="email-input"
            value={ email }
            onChange={ (event) => setEmail(event.target.value) }
            placeholder="seu-email@site.com.br"
            data-testid="admin_manage__input-email"
          />
          <input
            className="input_password_register"
            type="password"
            id="email-input"
            value={ password }
            onChange={ (event) => setPassword(event.target.value) }
            placeholder="***********"
            data-testid="admin_manage__input-password"
          />
          {
            (failedTryRegister)
              ? (
                <p>
                  O campo [nome] ou [email] já foi cadastrado!
                </p>
              )
              : ''
          }
          <button
            className="button_register"
            type="submit"
            disabled={ !isDisabledButton }
            data-testid="admin_manage__button-register"
          >
            Cadastrar

          </button>
        </form>
      </section>
      <section style={ { height: '10px' } }>
        <h1>Lista de usuários cadastrados</h1>
      </section>
    </main>
  );
}

export default Manage;
