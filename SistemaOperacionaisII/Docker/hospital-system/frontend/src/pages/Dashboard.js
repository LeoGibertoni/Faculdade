import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div style={{ padding: 20 }}>
            <div className="nav-card">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h3>Bem-vindo ao Sistema Hospitalar</h3>
                        <div className="text-muted">Escolha uma seção para começar</div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-4 mb-3">
                        <Link to="/pacientes" className="text-decoration-none text-dark">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">Pacientes</h5>
                                    <p className="card-text">Gerencie informações dos pacientes.</p>
                                    <button className="btn btn-outline-primary">Abrir</button>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-4 mb-3">
                        <Link to="/medicos" className="text-decoration-none text-dark">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">Médicos</h5>
                                    <p className="card-text">Cadastro e especialidades.</p>
                                    <button className="btn btn-outline-primary">Abrir</button>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-4 mb-3">
                        <Link to="/consultas" className="text-decoration-none text-dark">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">Consultas</h5>
                                    <p className="card-text">Agendamentos e histórico.</p>
                                    <button className="btn btn-outline-primary">Abrir</button>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;