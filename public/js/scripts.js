// const addItem = () => {
//     const add = document.querySelector('#btn-add');

//     const addUnidade = document.querySelector('#input-unidade');
//     const addPatrimonio = document.querySelector('#input-patrimonio');
//     const addDescricao = document.querySelector('#input-descricao');
//     const addUsuario = document.querySelector('#input-usuario');
//     const addModelo = document.querySelector('#input-modelo');
//     const addDepartamento = document.querySelector('#input-departamento');
//     const addValor = document.querySelector('#input-valor-compra');
//     const addNumSerie = document.querySelector('#input-serie');

//     add.addEventListener('click', (e) => {
//         addRow();
//     });

//     const addRow = () => {
//         const table = document
//             .querySelector('#table')
//             .getElementsByTagName('tbody')[0];

//         const newRow = table.insertRow();
//         const newButtonEdit = document.createElement('button');
//         newButtonEdit.setAttribute('class', 'btn btn-warning btn-sm');
//         newButtonEdit.innerText = 'Editar';

//         let newCell = newRow.insertCell();
//         let newCell1 = newRow.insertCell();
//         let newCell2 = newRow.insertCell();
//         let newCell3 = newRow.insertCell();
//         let newCell4 = newRow.insertCell();
//         let newCell5 = newRow.insertCell();
//         let newCell6 = newRow.insertCell();
//         let newCell7 = newRow.insertCell();
//         let newCell8 = newRow.insertCell();

//         const newUnidade = document.createTextNode(addUnidade.value);
//         const newPatrimonio = document.createTextNode(addPatrimonio.value);
//         const newDescricao = document.createTextNode(addDescricao.value);
//         const newUsuario = document.createTextNode(addUsuario.value);
//         const newModelo = document.createTextNode(addModelo.value);
//         const newDepartamento = document.createTextNode(addDepartamento.value);
//         const newValor = document.createTextNode(addValor.value);
//         const newNumSerie = document.createTextNode(addNumSerie.value);

//         newCell.appendChild(newUnidade);
//         newCell1.appendChild(newPatrimonio);
//         newCell2.appendChild(newDescricao);
//         newCell3.appendChild(newUsuario);
//         newCell4.appendChild(newModelo);
//         newCell5.appendChild(newDepartamento);
//         newCell6.appendChild(newValor);
//         newCell7.appendChild(newNumSerie);
//         newCell8.appendChild(newButtonEdit);
//     };
// };

// addItem();
