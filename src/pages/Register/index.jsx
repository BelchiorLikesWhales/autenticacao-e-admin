import {auth} from '../../firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth’;
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import './register.css'

async function handleLogin(e){
    e.preventDefault();
    if(email !== '' && password !==''){
        await signInWithEmailAndPassword(auth,email,password)
    .then(()=>{
        navigate('/admin',{replace:true})
    })
    .catch(()=>{
        console.log("Erro ao fazer login")
    }
}

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    return (
        <div className='home-container'>
            <h1>Cadastre-se</h1>
            <span>Vamos criar sua conta.</span>
            <form className='form' onSubmit={handleLogin}>
            <input type="email“ placeholder='seuemail@server.com'
            value={email} onChange={(e)=>setEmail(e.target.value)}/> <br/>
            <input type="password“ placeholder='******'
            value={password}onChange={(e)=>setPassword(e.target.value)}/><br/>
            <button type="submit">Acessar</button>
            </form>
        <Link className="button-Link" to={'/'}>
            Já possui uma conta? Faça login
        </Link>
        </div>
    )
  }
  
  export default Register;
  
