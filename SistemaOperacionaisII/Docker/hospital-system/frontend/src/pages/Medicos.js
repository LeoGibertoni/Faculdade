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

    // edit modal state
    const [editing, setEditing] = useState(null);
    const [editNome, setEditNome] = useState('');
    const [editEspecialidade, setEditEspecialidade] = useState('');
    const [editCrm, setEditCrm] = useState('');

    function openEdit(m){
        setEditing(m);
        setEditNome(m.nome||'');
        setEditEspecialidade(m.especialidade||'');
        setEditCrm(m.crm||'');
    }

    async function saveEdit(){
        try{
            await axios.put('http://localhost:3001/medicos/'+editing.id,{nome:editNome,especialidade:editEspecialidade,crm:editCrm});
            setEditing(null);
            fetch();
        }catch(err){console.error(err);alert('Erro ao salvar')}
    }

    return (
        <div className="page-content" style={{ padding: 20 }}>
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

            <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Especialidade</th>
                        <th>CRM</th>
                        <th style={{width:160}}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(m => (
                        <tr key={m.id}>
                            <td>{m.id}</td>
                            <td>{m.nome}</td>
                            <td>{m.especialidade}</td>
                            <td>{m.crm}</td>
                            <td>
                                <button className="btn-action btn-edit me-2" title="Editar" onClick={()=>openEdit(m)}>✏️ Editar</button>
                                <button className="btn-action btn-delete" title="Remover" onClick={async ()=>{
                                    if(!confirm('Confirma remover médico?')) return;
                                    try{await axios.delete('http://localhost:3001/medicos/'+m.id);fetch();}catch(err){console.error(err);alert('Erro')}
                                }}>🗑️ Remover</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

            {editing && (
                <div className="modal-backdrop" style={{position:'fixed',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <div className="card p-3" style={{width:600}}>
                        <h5>Editar Médico</h5>
                        <div className="mb-2"><input className="form-control" value={editNome} onChange={e=>setEditNome(e.target.value)} /></div>
                        <div className="mb-2">
                            <select className="form-select" value={editEspecialidade} onChange={e=>setEditEspecialidade(e.target.value)}>
                                <option value="">Selecione especialidade</option>
                                {specialties.map(s=> <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="mb-2"><input className="form-control" value={editCrm} onChange={e=>setEditCrm(e.target.value)} /></div>
                        <div className="d-flex justify-content-end" style={{gap:8}}>
                            <button className="btn btn-secondary" onClick={()=>setEditing(null)}>Cancelar</button>
                            <button className="btn btn-primary" onClick={saveEdit}>Salvar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Medicos;
