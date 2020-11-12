require('dotenv').config();
const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
    contactPoints: [process.env.CASSANDRA_HOST],
    localDataCenter: process.env.CASSANDRA_DATACENTER,
    keyspace: process.env.CASSANDRA_KEYSPACE
});

client.connect();

async function inserirPessoa(pessoa){
    const query = `INSERT INTO pessoa JSON '${JSON.stringify(pessoa)}'`;
    console.log(query);
    await client.execute(query).then(console.log('OK'));
}

async function listarPessoas(){
    const query = 'SELECT JSON * FROM pessoa';
    await client.execute(query).then(result => result.rows.forEach(r => console.log(r.get('[json]'))));
}

async function atualizarPessoa(){
    const novoNome = 'Paulo Freitas';
    const cpf = '333.333.333-03';
    const query = `UPDATE pessoa SET nome='${novoNome}' WHERE cpf='${cpf}'`;
    await client.execute(query).then(console.log('Atualizado'));
}

async function deletarPessoa(cpf){
    const query = `DELETE FROM pessoa WHERE cpf='${cpf}'`;
    await client.execute(query).then(console.log('Removido'));
}

// listarPessoas();

// const paulo = {
//     cpf: '333.333.333-03',
//     nome: 'Paulo',
//     idade: 25
// };

// inserirPessoa(paulo);

// atualizarPessoa();

deletarPessoa('333.333.333-03');