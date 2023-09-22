// "use strict";
import { getLocalStorage, setLocalStorage } from "./db_client.js";

const openModal = () =>
  document.getElementById("modal").classList.add("active");

const closeModal = () => {
  clearFields();
  document.getElementById("modal").classList.remove("active");
};

const btnRegister = document.getElementById("cadastrarCliente");
const btnCloseModal = document.getElementById("modalClose");
const btnSaveClient = document.getElementById("saveClient");
const btnCancelClient = document.getElementById("cancelClient");
const btnUpdateClient = document.querySelector("#tableClient > tbody");

//Validando Inputs do Formulário
const isValidFields = () => {
  const form = document.getElementById("form");

  return form.reportValidity();
};

//Limpando Inputs do Formulário pelo valor da Classes
const clearFields = () => {
  const fields = document.querySelectorAll(".modal-field");
  fields.forEach((field) => {
    field.value = "";
  });
};

//Interação com Usuário
const saveClient = () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const city = document.getElementById("city").value;

  if (isValidFields()) {
    const client = {
      name: name,
      email: email,
      phone: phone,
      city: city,
    };

    const id = document.getElementById("name").dataset.id;

    if (id === "new") {
      createClient(client);
      clientList();
      closeModal();
    } else {
      updateClient(id, client);
      clientList();
      closeModal();
    }
  }
};

//CRUD - create, read, update e delete

//CREATE
const createClient = (client) => {
  const dbClient = getLocalStorage();
  dbClient.push(client); //Adicionando cliente
  setLocalStorage(dbClient);
};

//READ
const readClient = () => {
  return getLocalStorage(); //Lendo dados LocalStorage
};

//UPDATE
const updateClient = (id, client) => {
  const dbClient = readClient();
  dbClient[id] = client;
  setLocalStorage(dbClient);
};

//DELETE
const deleteClient = (id) => {
  const dbClient = readClient();
  dbClient.splice(id, 1);
  setLocalStorage(dbClient);
};

//Lista de Clientes
const clientRow = (client, id) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
  <td>${client.name}</td>
  <td>${client.email}</td>
  <td>${client.phone}</td>
  <td>${client.city}</td>
  <td>
    <button type="button" class="button green" data-action="edit-${id}">Editar</button>
    <button type="button" class="button red" data-action="delete-${id}">Excluir</button>
  </td>`;

  const tableClient = document.querySelector("#tableClient > tbody");

  tableClient.appendChild(newRow);
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableClient > tbody tr");

  rows.forEach((row) => row.parentNode.removeChild(row)); //Apagando cada linha('tr') do elemento pai('tbody')
};

const clientList = () => {
  const dbClient = readClient();
  clearTable();
  dbClient.forEach(clientRow);
};

clientList();

const fillFields = (client) => {
  document.getElementById("name").value = client.name;
  document.getElementById("email").value = client.email;
  document.getElementById("phone").value = client.phone;
  document.getElementById("city").value = client.city;
  document.getElementById("name").dataset.id = client.id;
};

const editClient = (id) => {
  const client = readClient()[id];
  client.id = id;
  fillFields(client);
  openModal();
};

const cancelClient = () => {
  clearFields();
  document.getElementById("modal").classList.remove("active");
};

const updateAndEdit = (ev, client) => {
  if (ev.target.type === "button") {
    //Retornar valor apenas do tipo 'button'
    //Trabalhando com atributo personalizado 'dataset'
    const [action, id] = ev.target.dataset.action.split("-");

    if (action === "edit") {
      editClient(id);
    } else {
      const client = readClient()[id];
      const confirmation = confirm(
        `Você realmente deseja excluir esse cliente? ${client.name}`
      );
      if (confirmation) {
        deleteClient(id);
        clientList();
      } else {
        clientList();
      }
    }
  }
};

//Eventos
btnRegister.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
btnSaveClient.addEventListener("click", saveClient);
btnCancelClient.addEventListener("click", cancelClient);
btnUpdateClient.addEventListener("click", updateAndEdit);
