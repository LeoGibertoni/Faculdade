import { useEffect, useState } from 'react';
import axios from 'axios';

function RH(){
    const [list,setList] = useState([]);
    const [nome,setNome] = useState('');
    const [departamento,setDepartamento] = useState('');
    const [cargo,setCargo] = useState('');
    const [matricula,setMatricula] = useState('');
    const [dataAdmissao,setDataAdmissao] = useState('');

    function fetch(){axios.get('http://localhost:3001/rh').then(r=>setList(r.data)).catch(err=>console.error(err));}
    useEffect(()=>{fetch()},[]);

    async function handleCreate(e){
        e.preventDefault();
        try{await axios.post('http://localhost:3001/rh',{nome,departamento_id:departamento,cargo_id:cargo,matricula,data_admissao:dataAdmissao});setNome('');setDepartamento('');setCargo('');setMatricula('');setDataAdmissao('');fetch();}catch(err){console.error(err);alert('Erro')}
    }

    const [editing,setEditing]=useState(null);
    const [enome,setENome]=useState('');
    const [edep,setEDep]=useState('');
    const [ecargo,setECargo]=useState('');
    const [emat,setEMat]=useState('');
    const [edata,setEData]=useState('');

    function openEdit(item){setEditing(item);setENome(item.nome||'');setEDep(item.departamento_id||'');setECargo(item.cargo_id||'');setEMat(item.matricula||'');setEData(item.data_admissao||'');}
    async function saveEdit(){try{await axios.put('http://localhost:3001/rh/'+editing.id,{nome:enome,departamento_id:edep,cargo_id:ecargo,matricula:emat,data_admissao:edata});setEditing(null);fetch();}catch(err){console.error(err);alert('Erro')}}

    return (
        <div className="page-content" style={{padding:20}}>
            <h3>RH - Funcionários</h3>
            <div className="card mb-3 p-3">
                <form onSubmit={handleCreate} className="row g-2">
                    <div className="col-md-4"><input className="form-control" placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)} /></div>
                    <div className="col-md-2"><input className="form-control" placeholder="Departamento ID" value={departamento} onChange={e=>setDepartamento(e.target.value)} /></div>
                    <div className="col-md-2"><input className="form-control" placeholder="Cargo ID" value={cargo} onChange={e=>setCargo(e.target.value)} /></div>
                    <div className="col-md-2"><input className="form-control" placeholder="Matrícula" value={matricula} onChange={e=>setMatricula(e.target.value)} /></div>
                    <div className="col-md-2"><input className="form-control" type="date" value={dataAdmissao} onChange={e=>setDataAdmissao(e.target.value)} /></div>
                    <div className="col-12 d-grid mt-2"><button className="btn btn-success">Criar Funcionário</button></div>
                </form>
            </div>

            <div className="table-responsive">
            <table className="table">
                <thead><tr><th>ID</th><th>Nome</th><th>Departamento</th><th>Cargo</th><th>Matrícula</th><th>Admissão</th><th style={{width:160}}>Ações</th></tr></thead>
                <tbody>
                    {list.map(f=> (
                        <tr key={f.id}><td>{f.id}</td><td>{f.nome}</td><td>{f.departamento}</td><td>{f.cargo}</td><td>{f.matricula}</td><td>{f.data_admissao}</td>
                        <td className="actions-cell">
                            <button className="btn-action btn-edit me-2" onClick={()=>openEdit(f)}>✏️ Editar</button>
                            <button className="btn-action btn-delete" onClick={async ()=>{if(!confirm('Confirma remover funcionário?')) return; try{await axios.delete('http://localhost:3001/rh/'+f.id);fetch();}catch(err){console.error(err);alert('Erro')}}}>🗑️ Remover</button>
                        </td></tr>
                    ))}
                </tbody>
            </table>
            </div>

            {editing && (
                <div className="modal-backdrop" style={{position:'fixed',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <div className="card p-3" style={{width:800}}>
                        <h5>Editar Funcionário</h5>
                        <div className="row g-2">
                            <div className="col-md-4"><input className="form-control" value={enome} onChange={e=>setENome(e.target.value)} /></div>
                            <div className="col-md-2"><input className="form-control" value={edep} onChange={e=>setEDep(e.target.value)} /></div>
                            <div className="col-md-2"><input className="form-control" value={ecargo} onChange={e=>setECargo(e.target.value)} /></div>
                            <div className="col-md-2"><input className="form-control" value={emat} onChange={e=>setEMat(e.target.value)} /></div>
                            <div className="col-md-2"><input className="form-control" value={edata} onChange={e=>setEData(e.target.value)} /></div>
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

export default RH;
