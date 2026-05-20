import { useEffect, useState } from 'react';
import axios from 'axios';

function Exames(){
	const [list,setList] = useState([]);
	const [paciente_id,setPacienteId] = useState('');
	const [exame,setExame] = useState('');
	const [resultado,setResultado] = useState('');

	function fetch(){axios.get('http://localhost:3001/exames').then(r=>setList(r.data)).catch(err=>console.error(err));}
	useEffect(()=>{fetch()},[]);

	async function handleCreate(e){
		e.preventDefault();
		try{await axios.post('http://localhost:3001/exames',{paciente_id,exame,resultado});setPacienteId('');setExame('');setResultado('');fetch();}catch(err){console.error(err);alert('Erro')}
	}

	const [editing,setEditing]=useState(null);
	const [epaciente,setEPaciente]=useState('');
	const [eexame,setEExame]=useState('');
	const [eres,setERes]=useState('');

	function openEdit(e){setEditing(e);setEPaciente(e.paciente_id||'');setEExame(e.exame||'');setERes(e.resultado||'');}
	async function saveEdit(){try{await axios.put('http://localhost:3001/exames/'+editing.id,{paciente_id:epaciente,exame:eexame,resultado:eres});setEditing(null);fetch();}catch(err){console.error(err);alert('Erro')}}

	return (
		<div className="page-content" style={{padding:20}}>
			<h3>Exames</h3>
			<div className="card mb-3 p-3">
				<form onSubmit={handleCreate} className="row g-2">
					<div className="col-md-3"><input className="form-control" placeholder="Paciente ID" value={paciente_id} onChange={e=>setPacienteId(e.target.value)} /></div>
					<div className="col-md-4"><input className="form-control" placeholder="Exame" value={exame} onChange={e=>setExame(e.target.value)} /></div>
					<div className="col-md-4"><input className="form-control" placeholder="Resultado" value={resultado} onChange={e=>setResultado(e.target.value)} /></div>
					<div className="col-12 d-grid mt-2"><button className="btn btn-success">Cadastrar Exame</button></div>
				</form>
			</div>

			<div className="table-responsive">
			<table className="table">
				<thead>
					<tr><th>ID</th><th>Paciente</th><th>Exame</th><th>Resultado</th><th style={{width:160}}>Ações</th></tr>
				</thead>
				<tbody>
					{list.map(x=> (
						<tr key={x.id}>
							<td>{x.id}</td>
							<td>{x.paciente_id}</td>
							<td>{x.exame}</td>
							<td>{x.resultado}</td>
							<td className="actions-cell">
								<button className="btn-action btn-edit me-2" onClick={()=>openEdit(x)}>✏️ Editar</button>
								<button className="btn-action btn-delete" onClick={async ()=>{if(!confirm('Confirma remover exame?')) return; try{await axios.delete('http://localhost:3001/exames/'+x.id);fetch();}catch(err){console.error(err);alert('Erro ao remover')}}}>🗑️ Remover</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			</div>

			{editing && (
				<div className="modal-backdrop" style={{position:'fixed',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
					<div className="card p-3" style={{width:600}}>
						<h5>Editar Exame</h5>
						<div className="mb-2"><input className="form-control" value={epaciente} onChange={e=>setEPaciente(e.target.value)} /></div>
						<div className="mb-2"><input className="form-control" value={eexame} onChange={e=>setEExame(e.target.value)} /></div>
						<div className="mb-2"><input className="form-control" value={eres} onChange={e=>setERes(e.target.value)} /></div>
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

export default Exames;

