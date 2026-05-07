import { useEffect, useState } from 'react';
import axios from 'axios';

function Medicos() {
    const [list, setList] = useState([]);
    const [nome, setNome] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [crm, setCrm] = useState('');

    const specialties = [
        'Clínica Geral', 'Cardiologia', 'Pediatria', 'Ginecologia', 'Ortopedia', 'Neurologia'
    ];

    function fetch(){
        axios.get('http://localhost:3001/medicos').then(r=>setList(r.data)).catch(err=>console.error(err));
    }

    useEffect(()=>{fetch()},[]);

    async function handleCreate(e){
        e.preventDefault();
        try{await axios.post('http://localhost:3001/medicos',{nome,especialidade,crm});setNome('');setEspecialidade('');setCrm('');fetch();}catch(err){console.error(err);alert('Erro')}
    }

    return (
        <div style={{ padding: 20 }}>
            <h3>Médicos</h3>

            <div className="card mb-3 p-3">
                <form onSubmit={handleCreate} className="row g-2">
                    <div className="col-md-5"><input className="form-control" placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)} /></div>
                    <div className="col-md-5">
                        <select className="form-select" value={especialidade} onChange={e=>setEspecialidade(e.target.value)}>
                            <option value="">Selecione especialidade</option>
                            {specialties.map(s=> <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="col-md-2"><input className="form-control" placeholder="CRM (ex: 12345)" value={crm} onChange={e=>setCrm(e.target.value)} /></div>
                    <div className="col-12 d-grid mt-2"><button className="btn btn-success">Criar Médico</button></div>
                </form>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Especialidade</th>
                        <th>CRM</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(m => (
                        <tr key={m.id}>
                            <td>{m.id}</td>
                            <td>{m.nome}</td>
                            <td>{m.especialidade}</td>
                            <td>{m.crm}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Medicos;
