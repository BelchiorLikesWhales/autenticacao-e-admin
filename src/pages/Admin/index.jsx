import { useState, useEffect } from 'react';
import { addDoc, collection, deleteDoc, onSnapshot, orderBy, query, where, doc, updateDoc} from 'firebase/firestore';
import {auth, db} from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
import './admin.css'
import { async } from '@firebase/util';

function Admin(){
    const[tarefaInput, setTatefaInput] = useState('');
    const[user, setUser] = useState({})
    const[tarefas, setTarefas] = useState([]);

    useEffect(()=>{
        async function loadTarefas(){
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))
            
            if(userDetail){
                const data = JSON.parse(userDetail);
                const tarefaRef = collection(db, "tarefas")
                const q = query(tarefaRef, 
                    orderBy("created", "desc"),
                    where("userUid", "==", data?.uid))
                    const unsub = onSnapshot(q,(snapshot)=>{
                        let lista = [];
                        snapshot.forEach((doc)=>{
                            lista.push({
                                id: doc.id,
                                tarefa: doc.data().tarefa,
                                userUid: doc.data().userUid
                            })
                        })
                        console.log(lista)
                        setTarefas(lista)
                    })
            }
        }
        
        loadTarefas();
    }, [])

    async function editTarefa(item){
        setTatefaInput(item.tarefa)
    }

    async function deleteTarefa(id){
        const docRef = doc(db, "tarefas", id)
        await deleteDoc(docRef)
    }

    async function handleLogout(){
        await signOut(auth)
    }

    async function handleUpdateTarefa(){
        const docRef = doc(db, "tarefas", edit?.id)
        await updateDoc(docRef, {
            tarefa: tarefaInput
        })
        .then(() => {
            console.log("Tarefa Atualizada com Sucesso")
            setTarefaInput('')
            setEdit({})
        })
        .catch(() => {
            console.log("Erro ao Atualizar a Tarefa")
            setTatefaInput('')
            setEdit({})
        })
    }

    async function handleRegister(e){
        e.preventDefault();
        if(tarefaInput == ''){
            alert("Digite sua tarefa") 
            return;
        }
        if(edit?.id){
            handleUpdateTarefa();
            return;
        }
        await addDoc(collection(db, 'tarefas'),{
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid
        })
        .then(()=>{
            console.log("Tarefa registrada")
            setTatefaInput('')
        })
        .catch((error)=>{
            console.log("Erro ao Registrar "+error)
        })
    }
    return(
        <div className="admin-container">
           <h1>Minhas tarefas</h1>
           <form className="form" onSubmit={handleRegister}>
                <textarea
                placeholder="Digite sua tarefa"
                value={tarefaInput}
                onChange={(e)=> setTatefaInput(e.target.value)}
                />
                {Object.keys(edit).lenght > 0 ? (
                    <button className='btn-register' type="submit">Registrar tarefa</button>
                )
                :(
                    <button className='btn-register' type="submit">Registrar tarefa</button>
                )
            }
           </form>

           {tarefas.map((item)=>(
            <article key={item.id} className='list'>
                <p>{item.tarefa}</p>
                <div>
                    <button onClick={()=>editTarefa(item)}> Editar</button>
                    <button onClick={()=>deleteTarefa(item.id)} 
                    className='btn-delete'>Concluir</button>
                </div>
            </article>
           ))}

           <button className='btn-logout' onClick={handleLogout}>Sair</button>
        </div>
    )
}
export default Admin;