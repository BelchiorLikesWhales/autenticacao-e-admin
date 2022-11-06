import {useState, useEffect} from 'react';
import{addDoc, collection, onSnapshot, query, orderBy, where} from 'firebase/firestore';
import {auth} from '../../firebaseConnection';
import {signOut} from 'firebase/auth';
import {useState} from 'react';
import './admin.css';

function Admin(){
    const [tarefaInput, setTarefaInput] = useState('');
    const[tarefas, setTarefas] = useState([]);
    const unsub = onSnapshot(q,(snapshot)=>{
        let lista = [];
        snapshot.forEach((doc)=>{
            lista.push({
                id:doc.id,
                tarefa: doc.data().tarefa,
                userUid:doc.data().userUid
            })
        })
        console.log(lista)
        setTarefas(lista)
    })

    async function handleRegister(e){
        e.preventDefault();
    }

    async function handleLogout(){
        await signOut(auth)
    }

    const[user, setUser] = useState({});
    useEffect(()=>{
        async function loadTarefas(){
        const userDetail = localStorage.getItem("@detailUser")
        setUser(JSON.parse(userDetail))
        }
        loadTarefas();

        if(userDetail){
            const data = JSON.parse(userDetail);
            const tarefaRef = collection(db,"tarefas")
            const q = query(tarefaRef, 
            orderBy("created","desc"), 
            where("userUid", "==",data?.uid))
            const unsub = onSnapshot(q,(snapshot)=>{
            })
        }
    },[])

    async function handleRegister(e){
    e.preventDefault(); 
    if(tarefaInput ===''){
        alert("Digite sua tarefa")
        return;
    }
    await addDoc(collection(db,'tarefas'),{
        tarefa: tarefaInput, 
        created: new Date(),
        userUid: user?.uid}).then(()=>{
        console.log("Tarefa Registrada");
        setTarefaInput('');
    })
    .catch((error)=>{
        console.log("Erro ao Registrar" + error);
    })
}

    return(
        <div classname='admin-container'>
           <h1>Minhas Tarefas</h1>
           <form classname='form' onSubmit={handleRegister}>
                <textarea
                placeholder="Digite sua tarefa"
                value={tarefaInput}
                onChange={(e) => setTarefaInput(e.target.value)}
                />
                <button type='submit'>Registrar Tarefa</button>
           </form>

           <article classname='list'>
            <p>Estudar JavaScript com React</p>
            <div>
                <button>Editar</button>
                <button classname='btn-delete'>Concluir</button>
            </div>
           </article>
           <button classname='btn-logout' onClick={handleLogout}>Sair</button>

        </div>
    )
}
export default Admin;