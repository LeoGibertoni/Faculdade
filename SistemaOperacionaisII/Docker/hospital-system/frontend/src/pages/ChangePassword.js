import { useState } from 'react';
import axios from 'axios';

function ChangePassword(){
    const [token,setToken] = useState(localStorage.getItem('token') || '');
    const [novaSenha,setNovaSenha] = useState('');

    async function handleChange(e){
        e.preventDefault();
        try{
            await axios.post('http://localhost:3001/auth/change-password',{token,novaSenha});
            alert('Senha alterada');
        }catch(err){
            console.error(err);
            alert('Erro ao alterar');
        }
    }

    return (
        <div style={{padding:20}}>
            <div className="hospital-card">
                <h5>Alterar Senha</h5>
                <form onSubmit={handleChange}>
                    <div className="mb-2"><input className="form-control" placeholder="Token (ou use o token salvo)" value={token} onChange={e=>setToken(e.target.value)} /></div>
                    <div className="mb-2"><input className="form-control" placeholder="Nova senha" type="password" value={novaSenha} onChange={e=>setNovaSenha(e.target.value)} /></div>
                    <div className="d-grid"><button className="btn btn-primary">Alterar</button></div>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;
