import { useEffect, useState } from 'react';
import axios from 'axios';

function Pacientes() {
    const [list, setList] = useState([]);
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');

    function fetch() {
        axios.get('http://localhost:3001/pacientes')
            .then(r => setList(r.data))
            .catch(err => console.error(err));
    }

    useEffect(() => { fetch(); }, []);

    async function handleCreate(e){
        e.preventDefault();
        // validate cpf digits
        const digits = cpf.replace(/\D/g,'');
        if(digits.length !== 11){
            alert('CPF deve ter 11 dígitos');
            return;
        }
        try{
            await axios.post('http://localhost:3001/pacientes',{nome,idade,cpf,telefone});
            setNome('');setIdade('');setCpf('');setTelefone('');
            fetch();
        }catch(err){console.error(err);alert('Erro ao criar')}
    }

    return (
        <div style={{ padding: 20 }}>
            <h3>Pacientes</h3>

            <div className="card mb-3 p-3">
                <form onSubmit={handleCreate} className="row g-2">
                    <div className="col-md-4"><input className="form-control" placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)} /></div>
                    <div className="col-md-2"><input className="form-control" placeholder="Idade" value={idade} onChange={e=>setIdade(e.target.value)} /></div>
                    <div className="col-md-3">
                        <input className={"form-control " + (cpf.replace(/\D/g,'').length>11? 'is-invalid':'')} placeholder="CPF" value={cpf} onChange={e=>{
                            let v = e.target.value.replace(/\D/g,'');
                            if(v.length>11) v=v.slice(0,11);
                            // format 000.000.000-00
                            v = v.replace(/(\d{3})(\d)/,'$1.$2');
                            v = v.replace(/(\d{3})(\d)/,'$1.$2');
                            v = v.replace(/(\d{3})(\d{1,2})$/,'$1-$2');
                            setCpf(v);
                        }} />
                    </div>
                    <div className="col-md-3">
                        <input className="form-control" placeholder="(00) 00000-0000" value={telefone} onChange={e=>{
                            let v = e.target.value.replace(/\D/g,'');
                            if(v.length>11) v=v.slice(0,11);
                            if(v.length>2){
                                v = '('+v.slice(0,2)+') '+v.slice(2);
                            }
                            if(v.length>9){
                                // ensure dash before last 4
                                let plain = v.replace(/\D/g,'');
                                v = '('+plain.slice(0,2)+') '+plain.slice(2, -4)+'-'+plain.slice(-4);
                            }
                            setTelefone(v);
                        }} />
                    </div>
                    <div className="col-12 d-grid mt-2"><button className="btn btn-success">Criar Paciente</button></div>
                </form>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>CPF</th>
                        <th>Telefone</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.nome}</td>
                            <td>{p.idade}</td>
                            <td>{p.cpf}</td>
                            <td>{p.telefone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Pacientes;
