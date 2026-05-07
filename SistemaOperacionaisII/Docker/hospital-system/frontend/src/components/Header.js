import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('token');
        navigate('/');
    }

    const nome = 'Administrador';

    return (
        <div className="app-header">
            <div style={{display:'flex',alignItems:'center',gap:12}}>
                <Link to="/dashboard" className="text-decoration-none"><h4 style={{margin:0}}>Hospital</h4></Link>
            </div>

            <div className="profile-pill">
                <div className="profile-avatar">{nome.charAt(0)}</div>
                <div>
                    <div style={{fontWeight:600}}>{nome}</div>
                    <div style={{fontSize:12}}>
                        <Link to="/change-password" className="me-2">Alterar senha</Link>
                        <button className="btn btn-sm btn-link" onClick={logout}>Sair</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
