import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Pacientes from './pages/Pacientes';
import Medicos from './pages/Medicos';
import Consultas from './pages/Consultas';
import Prontuarios from './pages/Prontuarios';
import Exames from './pages/Exames';
import Register from './pages/Register';
import ChangePassword from './pages/ChangePassword';
import Header from './components/Header';

function Layout({ children }){
    const location = useLocation();
    if(location.pathname === '/' || location.pathname === '/register'){
        return children;
    }
    return (
        <>
            <Header />
            {children}
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/pacientes" element={<Pacientes />} />
                    <Route path="/medicos" element={<Medicos />} />
                    <Route path="/consultas" element={<Consultas />} />
                    <Route path="/prontuarios" element={<Prontuarios />} />
                    <Route path="/exames" element={<Exames />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;