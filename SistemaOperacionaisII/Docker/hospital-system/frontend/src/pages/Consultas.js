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

    const [editing, setEditing] = useState(null);
    const [editPaciente, setEditPaciente] = useState('');
    const [editMedico, setEditMedico] = useState('');
    const [editData, setEditData] = useState('');
    const [editObs, setEditObs] = useState('');

    function openEdit(c){
        setEditing(c);
        setEditPaciente(c.paciente_id || c.paciente || '');
        setEditMedico(c.medico_id || c.medico || '');
        setEditData(c.data_consulta || '');
        setEditObs(c.observacoes || '');
    }

    async function saveEdit(){
        try{
            await axios.put('http://localhost:3001/consultas/'+editing.id,{paciente_id:editPaciente,medico_id:editMedico,data_consulta:editData,observacoes:editObs});
            setEditing(null);fetch();
        }catch(err){console.error(err);alert('Erro')}
    }

    return (
        <div className="page-content" style={{ padding: 20 }}>
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

            <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Paciente</th>
                        <th>Médico</th>
                        <th>Data</th>
                        <th>Observações</th>
                        <th style={{width:160}}>Ações</th>
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
                            <td className="actions-cell">
                                <button className="btn-action btn-edit me-2" onClick={()=>openEdit(c)}>✏️ Editar</button>
                                <button className="btn-action btn-delete" onClick={async ()=>{
                                    if(!confirm('Confirma remover consulta?')) return;
                                    try{await axios.delete('http://localhost:3001/consultas/'+c.id);fetch();}catch(err){console.error(err);alert('Erro')}
                                }}>🗑️ Remover</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

            {editing && (
                <div className="modal-backdrop" style={{position:'fixed',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <div className="card p-3" style={{width:700}}>
                        <h5>Editar Consulta</h5>
                        <div className="row g-2">
                            <div className="col-md-3"><input className="form-control" placeholder="Paciente ID" value={editPaciente} onChange={e=>setEditPaciente(e.target.value)} /></div>
                            <div className="col-md-3"><input className="form-control" placeholder="Médico ID" value={editMedico} onChange={e=>setEditMedico(e.target.value)} /></div>
                            <div className="col-md-3"><input className="form-control" type="date" value={editData} onChange={e=>setEditData(e.target.value)} /></div>
                            <div className="col-md-3"><input className="form-control" placeholder="Observações" value={editObs} onChange={e=>setEditObs(e.target.value)} /></div>
                        </div>
                        <div className="d-flex justify-content-end mt-3" style={{gap:8}}>
                            <button className="btn btn-secondary" onClick={()=>setEditing(null)}>Cancelar</button>
                            <button className="btn btn-primary" onClick={saveEdit}>Salvar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Consultas;
