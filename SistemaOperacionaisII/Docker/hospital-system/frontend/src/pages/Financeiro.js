import { useEffect, useState } from 'react';
import axios from 'axios';

function Financeiro(){
    const [list,setList]=useState([]);
    const [descricao,setDescricao]=useState('');
    const [valor,setValor]=useState('');
    const [tipo,setTipo]=useState('receita');

    function fetch(){axios.get('http://localhost:3001/financeiro').then(r=>setList(r.data)).catch(err=>console.error(err));}
    useEffect(()=>{fetch()},[]);

    async function handleCreate(e){
        e.preventDefault();
        try{await axios.post('http://localhost:3001/financeiro',{descricao,valor,data_lancamento:new Date().toISOString().slice(0,10),tipo});setDescricao('');setValor('');fetch();}catch(err){console.error(err);alert('Erro')}
    }

    const [editing,setEditing]=useState(null);
    const [edescricao,setEDescricao]=useState('');
    const [evalor,setEValor]=useState('');
    const [etipo,setETipo]=useState('receita');

    function openEdit(item){setEditing(item);setEDescricao(item.descricao||'');setEValor(item.valor||'');setETipo(item.tipo||'receita');}
    async function saveEdit(){try{await axios.put('http://localhost:3001/financeiro/'+editing.id,{descricao:edescricao,valor:evalor,data_lancamento:editing.data_lancamento,tipo:etipo});setEditing(null);fetch();}catch(err){console.error(err);alert('Erro')}}

    return (
        <div className="page-content" style={{padding:20}}>
            <h3>Financeiro</h3>
            <div className="card mb-3 p-3">
                <form onSubmit={handleCreate} className="row g-2">
                    <div className="col-md-6"><input className="form-control" placeholder="Descrição" value={descricao} onChange={e=>setDescricao(e.target.value)} /></div>
                    <div className="col-md-3"><input className="form-control" placeholder="Valor" value={valor} onChange={e=>setValor(e.target.value)} /></div>
                    <div className="col-md-3">
                        <select className="form-select" value={tipo} onChange={e=>setTipo(e.target.value)}>
                            <option value="receita">Receita</option>
                            <option value="despesa">Despesa</option>
                        </select>
                    </div>
                    <div className="col-12 d-grid mt-2"><button className="btn btn-success">Adicionar</button></div>
                </form>
            </div>

            <div className="table-responsive">
            <table className="table">
                <thead><tr><th>ID</th><th>Descrição</th><th>Valor</th><th>Data</th><th>Tipo</th><th style={{width:160}}>Ações</th></tr></thead>
                <tbody>
                    {list.map(l=> (
                        <tr key={l.id}><td>{l.id}</td><td>{l.descricao}</td><td>{l.valor}</td><td>{l.data_lancamento}</td><td>{l.tipo}</td>
                        <td className="actions-cell">
                            <button className="btn-action btn-edit me-2" onClick={()=>openEdit(l)}>✏️ Editar</button>
                            <button className="btn-action btn-delete" onClick={async ()=>{if(!confirm('Confirma remover?')) return; try{await axios.delete('http://localhost:3001/financeiro/'+l.id);fetch();}catch(err){console.error(err);alert('Erro')}}}>🗑️ Remover</button>
                        </td></tr>
                    ))}
                </tbody>
            </table>
            </div>

            {editing && (
                <div className="modal-backdrop" style={{position:'fixed',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <div className="card p-3" style={{width:700}}>
                        <h5>Editar Lançamento</h5>
                        <div className="mb-2"><input className="form-control" value={edescricao} onChange={e=>setEDescricao(e.target.value)} /></div>
                        <div className="mb-2"><input className="form-control" value={evalor} onChange={e=>setEValor(e.target.value)} /></div>
                        <div className="mb-2">
                            <select className="form-select" value={etipo} onChange={e=>setETipo(e.target.value)}>
                                <option value="receita">Receita</option>
                                <option value="despesa">Despesa</option>
                            </select>
                        </div>
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

export default Financeiro;
