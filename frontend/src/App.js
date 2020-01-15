import React, { useEffect, useState } from 'react';

import api from './services';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  async function handleAddDev(e) {
    e.preventDefault();

    const response = await api.post('/devs', {
      github_username,
      techs,
      latitude,
      longitude,
    });
  }

  return(
    <div className="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input
              name="github_username"
              type="text"
              id="github_username"
              required
              value={github_username}
              onChange={e => setGithubUsername(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input
              name="techs"
              type="text"
              id="techs"
              required
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="">Latitude</label>
              <input
                name="latitude"
                type="number"
                id="latitude"
                required
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="">Longitude</label>
              <input
                name="longitude"
                type="number"
                id="Longitude"
                required
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
              />
            </div>
          </div>

          <button type="submit">Salvar</button>
        </form>
      </aside>

      <main>
        <ul>
          <li className="dev-item">
            <header>
              <img src="https://avatars2.githubusercontent.com/u/53630706?s=460&v=4" alt="João Lucas"/>
              <div className="user-info">
                <strong>João Lucas</strong>
                <span>ReactJS, React Native, Node.js</span>
              </div>
            </header>
            <p>Student of Stack ReactJS, React Native and NodeJS | Computer Science Student.</p>
            <a href="https://github.com/joao-lucas-dev">Acessar perfil</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars2.githubusercontent.com/u/53630706?s=460&v=4" alt="João Lucas"/>
              <div className="user-info">
                <strong>João Lucas</strong>
                <span>ReactJS, React Native, Node.js</span>
              </div>
            </header>
            <p>Student of Stack ReactJS, React Native and NodeJS | Computer Science Student.</p>
            <a href="https://github.com/joao-lucas-dev">Acessar perfil</a>
          </li>
        </ul>
      </main>
    </div>
  )
}

export default App;
