import { useEffect, useState } from 'react';
import axios from 'axios';

function Consultas() {
    const [list, setList] = useState([]);
    const [paciente_id, setPacienteId] = useState('');
    const [medico_id, setMedicoId] = useState('');
    const [data_consulta, setDataConsulta] = useState('');
    const [observacoes, setObservacoes] = useState('');

    function fetch(){
        axios.get('http://localhost:3001/consultas').then(r=>setList(r.data)).catch(err=>console.error(err));
    }

    useEffect(()=>{fetch()},[]);

    async function handleCreate(e){
        e.preventDefault();
        try{await axios.post('http://localhost:3001/consultas',{paciente_id,medico_id,data_consulta,observacoes});setPacienteId('');setMedicoId('');setDataConsulta('');setObservacoes('');fetch();}catch(err){console.error(err);alert('Erro')}
    }

    return (
        <div style={{ padding: 20 }}>
            <h3>Consultas</h3>

            <div className="card mb-3 p-3">
                <form onSubmit={handleCreate} className="row g-2">
                    <div className="col-md-3"><input className="form-control" placeholder="Paciente ID" value={paciente_id} onChange={e=>setPacienteId(e.target.value)} /></div>
                    <div className="col-md-3"><input className="form-control" placeholder="Médico ID" value={medico_id} onChange={e=>setMedicoId(e.target.value)} /></div>
                    <div className="col-md-3"><input className="form-control" type="date" placeholder="Data" value={data_consulta} onChange={e=>setDataConsulta(e.target.value)} /></div>
                    <div className="col-md-3"><input className="form-control" placeholder="Observações" value={observacoes} onChange={e=>setObservacoes(e.target.value)} /></div>
                    <div className="col-12 d-grid mt-2"><button className="btn btn-success">Criar Consulta</button></div>
                </form>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Paciente</th>
                        <th>Médico</th>
                        <th>Data</th>
                        <th>Observações</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(c => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.paciente || c.paciente_id}</td>
                            <td>{c.medico || c.medico_id}</td>
                            <td>{c.data_consulta}</td>
                            <td>{c.observacoes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Consultas;
