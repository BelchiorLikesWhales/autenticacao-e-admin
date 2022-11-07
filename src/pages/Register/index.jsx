import {useState} from 'react';
import './register.css'

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className='home-container'>
            <h1>Lista de Tarefas</h1>
            <span>Gerencie sua agenda fácil.</span>
            <form className='form'>
            <input type="email“ placeholder='seuemail@server.com'
            value={email} onChange={(e)=>setEmail(e.target.value)}/> <br/>
            <input type="password“ placeholder='******'
            value={password}onChange={(e)=>setPassword(e.target.value)}/><br/>
            <button type="submit">Acessar</button>
            </form>
        <Link className="button-Link" to={'/register'}>
            Não possui uma conta? Cadastre-se
        </Link>
        </div>
    )
  }
  
  export default Register;
  
