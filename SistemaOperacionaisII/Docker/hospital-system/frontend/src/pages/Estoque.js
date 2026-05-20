import { useEffect, useState } from 'react';
import axios from 'axios';

function Estoque(){
    const [list,setList]=useState([]);
    const [nome,setNome]=useState('');
    const [quantidade,setQuantidade]=useState(0);
    const [unidade,setUnidade]=useState('un');

    function fetch(){axios.get('http://localhost:3001/estoque').then(r=>setList(r.data)).catch(err=>console.error(err));}
    useEffect(()=>{fetch()},[]);

    async function handleCreate(e){
        e.preventDefault();
        try{await axios.post('http://localhost:3001/estoque',{nome,quantidade,unidade});setNome('');setQuantidade(0);setUnidade('un');fetch();}catch(err){console.error(err);alert('Erro')}
    }

    const [editing,setEditing]=useState(null);
    const [enome,setENome]=useState('');
    const [eqt,setEQt]=useState(0);
    const [eun,setEUn]=useState('un');

    function openEdit(i){setEditing(i);setENome(i.nome||'');setEQt(i.quantidade||0);setEUn(i.unidade||'un');}
    async function saveEdit(){try{await axios.put('http://localhost:3001/estoque/'+editing.id,{nome:enome,quantidade:eqt,unidade:eun});setEditing(null);fetch();}catch(err){console.error(err);alert('Erro')}}

    return (
        <div className="page-content" style={{padding:20}}>
            <h3>Estoque</h3>
            <div className="card mb-3 p-3">
                <form onSubmit={handleCreate} className="row g-2">
                    <div className="col-md-6"><input className="form-control" placeholder="Nome do item" value={nome} onChange={e=>setNome(e.target.value)} /></div>
                    <div className="col-md-3"><input className="form-control" placeholder="Quantidade" value={quantidade} onChange={e=>setQuantidade(Number(e.target.value))} /></div>
                    <div className="col-md-3"><input className="form-control" placeholder="Unidade" value={unidade} onChange={e=>setUnidade(e.target.value)} /></div>
                    <div className="col-12 d-grid mt-2"><button className="btn btn-success">Adicionar Item</button></div>
                </form>
            </div>

            <div className="table-responsive">
            <table className="table">
                <thead><tr><th>ID</th><th>Nome</th><th>Quantidade</th><th>Unidade</th><th style={{width:160}}>Ações</th></tr></thead>
                <tbody>
                    {list.map(i=> (
                        <tr key={i.id}><td>{i.id}</td><td>{i.nome}</td><td>{i.quantidade}</td><td>{i.unidade}</td>
                        <td className="actions-cell">
                            <button className="btn-action btn-edit me-2" onClick={()=>openEdit(i)}>✏️ Editar</button>
                            <button className="btn-action btn-delete" onClick={async ()=>{if(!confirm('Confirma remover item?')) return; try{await axios.delete('http://localhost:3001/estoque/'+i.id);fetch();}catch(err){console.error(err);alert('Erro')}}}>🗑️ Remover</button>
                        </td></tr>
                    ))}
                </tbody>
            </table>
            </div>

            {editing && (
                <div className="modal-backdrop" style={{position:'fixed',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <div className="card p-3" style={{width:700}}>
                        <h5>Editar Item</h5>
                        <div className="mb-2"><input className="form-control" value={enome} onChange={e=>setENome(e.target.value)} /></div>
                        <div className="mb-2"><input className="form-control" value={eqt} onChange={e=>setEQt(Number(e.target.value))} /></div>
                        <div className="mb-2"><input className="form-control" value={eun} onChange={e=>setEUn(e.target.value)} /></div>
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

export default Estoque;
