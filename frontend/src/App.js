import React from 'react';

import './global.css';
import './App.css';
import './Sidebar.css';

function App() {
  return(
    <div className="app">
      <aside>
        <strong>Cadastrar</strong>
        <form>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input name="github_username" type="text" id="github_username" required />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" type="text" id="techs" required />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="">Latitude</label>
              <input name="latitude" type="text" id="latitude" required />
            </div>

            <div className="input-block">
              <label htmlFor="">Longitude</label>
              <input name="longitude" type="text" id="Longitude" required />
            </div>
          </div>

          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main></main>
    </div>
  )
}

export default App;
