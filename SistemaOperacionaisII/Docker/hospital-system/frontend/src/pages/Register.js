import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register(){
    const [nome,setNome] = useState('');
    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const navigate = useNavigate();

    async function handleRegister(e){
        e.preventDefault();
        try{
            await axios.post('http://localhost:3001/auth/register',{nome,email,senha});
            alert('Registrado com sucesso');
            navigate('/');
        }catch(err){
            console.error(err);
            alert('Erro ao registrar');
        }
    }

    return (
        <div className="hospital-card">
            <h4>Registrar novo usuário</h4>
            <form onSubmit={handleRegister}>
                <div className="mb-2"><input className="form-control" placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)} /></div>
                <div className="mb-2"><input className="form-control" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
                <div className="mb-2"><input className="form-control" placeholder="Senha" type="password" value={senha} onChange={e=>setSenha(e.target.value)} /></div>
                <div className="d-grid"><button className="btn btn-primary">Registrar</button></div>
            </form>
        </div>
    );
}

export default Register;
