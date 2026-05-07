import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function fazerLogin(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/auth/login', {
                email,
                senha: password
            });

            // salvar token
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            alert('Login realizado');
            navigate('/dashboard');

        } catch (err) {
            console.error(err);
            alert('Usuário inválido');
        }
    }

    return (
        <div className="hospital-card">
            <div className="brand">
                <div className="logo">H</div>
                <div>
                    <div className="hospital-title">Hospital System</div>
                    <div className="hospital-sub">Acesso à administração</div>
                </div>
            </div>

            <form onSubmit={fazerLogin}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="seu@hospital.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Senha</label>
                    <input type="password" className="form-control" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
                </div>

                <div className="d-grid">
                    <button className="btn btn-primary">Entrar</button>
                </div>
            </form>
            <div className="mt-3 text-center">
                <Link to="/register">Ainda não tem conta? Criar usuário</Link>
            </div>
        </div>
    );
}

export default Login;