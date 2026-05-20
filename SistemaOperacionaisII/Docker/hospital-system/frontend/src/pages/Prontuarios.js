import { useEffect, useState } from 'react';
import axios from 'axios';

function Prontuarios(){
	const [list,setList] = useState([]);
	const [paciente_id,setPacienteId] = useState('');
	const [descricao,setDescricao] = useState('');

	function fetch(){axios.get('http://localhost:3001/prontuarios').then(r=>setList(r.data)).catch(err=>console.error(err));}
	useEffect(()=>{fetch()},[]);

	async function handleCreate(e){
		e.preventDefault();
		try{await axios.post('http://localhost:3001/prontuarios',{paciente_id,descricao});setPacienteId('');setDescricao('');fetch();}catch(err){console.error(err);alert('Erro')}
	}

	const [editing,setEditing]=useState(null);
	const [epaciente,setEPaciente]=useState('');
	const [edesc,setEDesc]=useState('');

	function openEdit(p){setEditing(p);setEPaciente(p.paciente_id||'');setEDesc(p.descricao||'');}
	async function saveEdit(){try{await axios.put('http://localhost:3001/prontuarios/'+editing.id,{paciente_id:epaciente,descricao:edesc});setEditing(null);fetch();}catch(err){console.error(err);alert('Erro')}}

	return (
		<div className="page-content" style={{padding:20}}>
			<h3>Prontuários</h3>
			<div className="card mb-3 p-3">
				<form onSubmit={handleCreate} className="row g-2">
					<div className="col-md-3"><input className="form-control" placeholder="Paciente ID" value={paciente_id} onChange={e=>setPacienteId(e.target.value)} /></div>
					<div className="col-md-9"><input className="form-control" placeholder="Descrição" value={descricao} onChange={e=>setDescricao(e.target.value)} /></div>
					<div className="col-12 d-grid mt-2"><button className="btn btn-success">Salvar Prontuário</button></div>
				</form>
			</div>

			<table className="table">
				<thead><tr><th>ID</th><th>Paciente</th><th>Descrição</th><th></th></tr></thead>
				<tbody>
					{list.map(p=> (
						<tr key={p.id}>
							<td>{p.id}</td>
							<td>{p.paciente_id}</td>
							<td>{p.descricao}</td>
							<td className="actions-cell">
								<button className="btn-action btn-edit me-2" onClick={()=>openEdit(p)}>✏️ Editar</button>
								<button className="btn-action btn-delete" onClick={async ()=>{if(!confirm('Confirma remover prontuário?')) return; try{await axios.delete('http://localhost:3001/prontuarios/'+p.id);fetch();}catch(err){console.error(err);alert('Erro ao remover')}}}>🗑️ Remover</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{editing && (
				<div className="modal-backdrop" style={{position:'fixed',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
					<div className="card p-3" style={{width:700}}>
						<h5>Editar Prontuário</h5>
						<div className="mb-2"><input className="form-control" value={epaciente} onChange={e=>setEPaciente(e.target.value)} /></div>
						<div className="mb-2"><input className="form-control" value={edesc} onChange={e=>setEDesc(e.target.value)} /></div>
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

export default Prontuarios;

