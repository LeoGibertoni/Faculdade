// Quick syntax checker: require modified files
try{
    require('../backend/routes/pacientes');
    require('../frontend/src/pages/Login.js');
    require('../frontend/src/components/Header.js');
    require('../frontend/src/pages/Pacientes.js');
    console.log('Requires completed without throwing (syntax ok).');
}catch(e){
    console.error('Error requiring files:', e);
    process.exit(1);
}
