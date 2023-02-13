document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');

  // создаем и возвращаем форму поиска
  function createSearch() {
    const heder = document.createElement('div');
    const logo = document.createElement('img');
    const inputHeder = document.createElement('input');

    heder.classList.add('heder');
    logo.classList.add('logo');
    inputHeder.classList.add('inputHeder');

    logo.src = 'img/logo.jpg';
    inputHeder.placeholder = "Введите запрос";

    heder.append(logo, inputHeder);
    container.append(heder);
  };

  createSearch();

  // создаем и возвращаем таблицу
  function createTable() {
    container.innerHTML += `
      <div class="mainBlok">
      <div class="container">
        <table class="table">
          <caption class="title">Клиенты</caption>
          <thead>
            <tr class="row">
              <th class="clientID" data-column="id">
                <span>ID</span>
                <span class="arrowID"></span>
              </th>
              <th class="fio" data-column="surname">
                <span>Фамилия Имя Отчество</span>
                <span class="arrowFio"></span>
                <span class="sortfio">А-Я</span>
              </th>
              <th class="creationOfDate" data-column="createdAt">
                <span>Дата и время создания</span>
                <span class="arrowDate"></span>
              </th>
              <th class="lastChanes" data-column="updatedAt">
                <span>Последние изменения</span>
                <span class="arrowChanes"></span>
              </th>
              <th class="contacts">Контакты</th>
              <th class="actions">Действия</th>
            </tr>
          </thead>
          <tbody class="table-body"></tbody>
        </table>
        </div>
      </div>
      <button class="add-client">
        <img src="img/addclient.png" class="imgbutton">
        <span>Добавить клиента</span>
      </button>
    `
  };

  createTable();

  // создаем функцию получения даты создания
  function getcrationDate(data) {
    let date = new Date(data.createdAt);
    let yyyy = date.getFullYear();
    let mm = date.getMonth();
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return dd + '.' + mm + '.' + yyyy;
  };

  // создаем функцию получения времени даты создания
  function getcrationTime(data) {
    let date = new Date(data.createdAt);
    let hh = date.getHours();
    let mm = date.getMinutes();
    if (hh < 10) hh = '0' + hh;
    if (mm < 10) mm = '0' + mm;
    return hh + ':' + mm;
  };

  // создаем функцию даты редактирования
  function getlastChanes(data) {
    let date = new Date(data.updatedAt);
    let yyyy = date.getFullYear();
    let mm = date.getMonth();
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return dd + '.' + mm + '.' + yyyy;
  };

  // создаем функцию времени даты редактирования
  function getlastchanesTime(data) {
    let date = new Date(data.updatedAt);
    let hh = date.getHours();
    let mm = date.getMinutes();
    if (hh < 10) hh = '0' + hh;
    if (mm < 10) mm = '0' + mm;
    return hh + ':' + mm;
  };

  // прорисовываем блок контактов с иконками
  function createBlokContacts(user) {
    let ul = document.createElement('ul');
    ul.classList.add('icon-contacts');

      let objects = user.contacts;

      for (const object of objects) {
        let li = document.createElement('li');
        li.classList.add('icon');
        li.classList.add('js-tooltip-btn', 'tooltip-btn');

        if (object.type.includes('VK')) {
          li.classList.add('icon-vk');
          ul.append(li);
          tippy(li, {
            content: object.type + ': ' + object.value,
          });
        };
        if (object.type.includes('Facebook')) {
          li.classList.add('icon-facebook');
          ul.append(li);
          tippy(li, {
            content: object.type + ': ' + object.value,
          });
        };
        if (object.type.includes('email')) {
          li.classList.add('icon-email');
          ul.append(li);
          tippy(li, {
            content: object.type + ': ' + object.value,
          });
        };
        if (object.type.includes('Телефон')) {
          li.classList.add('icon-phone');
          ul.append(li);
          tippy(li, {
            content: object.type + ': ' + object.value,
          });
        };
      };

    return ul;
  };
//<span role="status"></span>
  // создаем тело таблицы
  function paintUsers(user) {
    let tableBody = document.querySelector('.table-body');
    let spinner = document.createElement('span');
    spinner.classList.add('spinner-border', 'spinner-border-sm');
    spinner.style.display = 'block';
    let row = document.createElement('tr');
    row.classList.add('user');

    let namberID = document.createElement('td');
    namberID.classList.add('namberID');
    namberID.textContent = `${user.id.substring(0, 8)}`;

    let fio = document.createElement('td');
    fio.classList.add('fio-client');
    fio.textContent = `${user.surname} ${user.name} ${user.lastName}`;

    let creationDate = document.createElement('td');
    creationDate.classList.add('creation-date');
    let creationDay = document.createElement('div');
    creationDay.classList.add('creation-day');
    creationDay.textContent = `${getcrationDate(user)}`;
    let creationTime = document.createElement('div');
    creationTime.classList.add('creation-time');
    creationTime.textContent = `${getcrationTime(user)}`;
    creationDate.append(creationDay, creationTime);

    let lastChanes = document.createElement('td');
    lastChanes.classList.add('last-chanes');
    let lastchanesDate = document.createElement('div');
    lastchanesDate.classList.add('lastchanes-date');
    lastchanesDate.textContent = `${getlastChanes(user)}`;
    let lastchanesTime = document.createElement('div');
    lastchanesTime.classList.add('lastchanes-time');
    lastchanesTime.textContent = `${getlastchanesTime(user)}`;
    lastChanes.append(lastchanesDate, lastchanesTime);

    let contacts = document.createElement('td');
    contacts.classList.add('contacts-dscr');

    let ul = createBlokContacts(user);
    contacts.append(ul);

    let actionsButton = document.createElement('td');
    actionsButton.classList.add('actions-button');

    let chanesButton = document.createElement('button');
    chanesButton.classList.add('actions-chanes', 'btn');
    let spanChanes = document.createElement('span');
    spanChanes.classList.add('span-chanes');
    let textChanes = document.createElement('span');
    textChanes.classList.add('text-chanes');
    textChanes.textContent = 'Изменить';
    chanesButton.append(spanChanes, textChanes);

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('actions-delete', 'btn');
    let spanDelete = document.createElement('span');
    spanDelete.classList.add('span-delete');
    let textDelete = document.createElement('span');
    textDelete.classList.add('text-delete');
    textDelete.textContent = 'Удалить';
    deleteButton.append(spanDelete, textDelete);

    actionsButton.append(chanesButton, deleteButton);
    row.append(namberID, fio, creationDate, lastChanes, contacts, actionsButton);
    tableBody.append(spinner, row);

    // нажатие на кнопку изменить открывает заполненное модальное окно
    chanesButton.addEventListener('click', () => {
      createModalChangeClient(user, row);
      fillForm(user);
    });

    // нажатие на кнопку удалить клиента открывает модальное окно
    deleteButton.addEventListener('click', () => {
      createModalDeleteClient(user, row);
    });

    return tableBody;
  };

  // функция заполнения формы модального окна
  function fillForm(user) {
    let name = document.querySelector('.modal .input-name');
    let sureName = document.querySelector('.modal .input-surename');
    let lastName = document.querySelector('.modal .input-lastname');
    let buttonAdd = document.querySelector('.modal .modal-add');

    name.value = user.name;
    sureName.value = user.surname;
    lastName.value = user.lastName;

    let objects = user.contacts;
    let addContacts = document.querySelector('.modal .add-contacts');
    let count = objects.length;
    buttonAdd.style.padding = '25px';

    addContacts.innerHTML = '';

    for (const object of objects) {
      let formAddNewContact = createAddContact(object);
      addContacts.append(formAddNewContact);
      };

    // кнопка добавления контакта
    buttonAdd.addEventListener('click', e => {
      e.preventDefault();
      if (count >= 10) {
        return;
      };
      count +=1;
      let formAddNewContact = createAddContact();
      addContacts.append(formAddNewContact);
      buttonAdd.style.padding = '25px';
      if (count === 10) {
        buttonAdd.style.display = 'none';
        addContacts.style.padding = '0 0 25px 0';
        addContacts.style.marginBottom = '25px';
      }
    });
  };

  // создаем функцию удаления с сервера
  async function deleteClient(user) {
    const response = await fetch(`http://localhost:3000/api/clients/${user.id}`, {
      method: 'DELETE',
    });
    await response.json();
  };

  //создаем и возвращаем функцию запроса данных
  async function loadClients() {
    const response = await fetch('http://localhost:3000/api/clients');
    const data = await response.json();

    let spinner = document.querySelector('.spinner-border');
    //console.log(spinner)
    //spinner.style.display = 'flex';
    for (let object of data) {
      paintUsers(object);
    }
    //spinner.style.display = 'none';
  };

  loadClients();

  // создаем модальное окно для нового клиента
  function createModalNewClient() {
    const modal = document.createElement('div');
    modal.classList.add('modal-new');
    const modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog_new');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    const modalTitle = document.createElement('h1');
    modalTitle.classList.add('modal-title');
    modalTitle.textContent = 'Новый клиент';
    const modalClose = document.createElement('button');
    modalClose.classList.add('modal-close');
    modalHeader.append(modalTitle, modalClose);

    let form = document.createElement('form');
    form.classList.add('modal-form_new');
    form.setAttribute('id', 'form');
    let inputSurename = document.createElement('input');
    inputSurename.classList.add('input_newsurename');
    inputSurename.setAttribute('id', 'input-surename');
    inputSurename.setAttribute('required', true);
    inputSurename.placeholder = 'Фамилия*';
    let inputName = document.createElement('input');
    inputName.classList.add('input_newname');
    inputName.setAttribute('id', 'input-name');
    inputName.setAttribute('required', true);
    inputName.placeholder = 'Имя*';
    let inputLastname = document.createElement('input');
    inputLastname.classList.add('input_newlastname');
    inputLastname.setAttribute('id', 'input-lastname');
    inputLastname.setAttribute('required', true);
    inputLastname.placeholder = 'Отчество';
    form.append(inputSurename, inputName, inputLastname);

    let modalFooter = document.createElement('div');
    modalFooter.classList.add('modal-footer');
    let addContacts = document.createElement('div');
    addContacts.classList.add('add-contacts');
    let buttonAdd = document.createElement('button');
    buttonAdd.classList.add('modal-add');
    let buttonAddspan = document.createElement('span');
    buttonAddspan.classList.add('modal-addspan');
    let buttonAddtext = document.createElement('span');
    buttonAddtext.textContent = 'Добавить контакт';
    buttonAdd.append(buttonAddspan, buttonAddtext);

    let error = document.createElement('div');
    error.classList.add('error');
    error.textContent = '"Что-то пошло не так..."';

    let saveNewClient = document.createElement('button');
    saveNewClient.classList.add('modal-save');
    saveNewClient.textContent = 'Сохранить';
    saveNewClient.setAttribute('form', 'form');
    saveNewClient.setAttribute('type', 'submit');
    let cancelSave = document.createElement('button');
    cancelSave.classList.add('modal-cancel');
    cancelSave.textContent = 'Отмена';
    modalFooter.append(addContacts, buttonAdd, error, saveNewClient, cancelSave);

    modalDialog.append(modalHeader, form, modalFooter);
    modal.append(modalDialog);
    container.append(modal);

    // флаг на модальное окно
    modalDialog.addEventListener('click', event => {
      event._isClickModal = true;
    });

    modal.addEventListener('click', event => {
      if (event._isClickModal) return;
      modal.remove();
    });

    // крестик закрыващий модальное окно
    modalClose.addEventListener('click', () => {
      onClose(modal);
    });

    // кнопка отмена
    cancelSave.addEventListener('click', event => {
      event._isClickModal = false;
      modal.remove();
    });

    // кнопка добавить контакт
    let count = 0;
    let contacts = [];

    buttonAdd.addEventListener('click', e => {
      e.preventDefault();
      if (count >= 10) {
        return;
      };
      count +=1;
      let formAddNewContact = createAddContact();
      addContacts.append(formAddNewContact);
      buttonAdd.style.padding = '25px';
      if (count === 10) {
        buttonAdd.style.display = 'none';
        addContacts.style.padding = '0 0 25px 0';
        addContacts.style.marginBottom = '25px';
      }
    });

    // сохранить нового клиента
    form.addEventListener('submit', e => {
      e.preventDefault();

      let form = document.querySelectorAll('.modal-form_contacts');
      form.forEach((e) => {
        let object = {};
        object.value = e.querySelector('.form-control').value;
        object.type = e.querySelector('.select').value;
        contacts.push(object);
      })

      const data = {
        contacts: [...contacts],
        name: inputName.value.trim(),
        surname: inputSurename.value.trim(),
        lastName: inputLastname.value.trim(),
        get fullName() {
          return this.surname + ' ' + this.name + ' ' + this.lastName
        },
        createdAt: new Date(),
      };

      onSave(data, modal, error, buttonAdd);
    });

    return modal;
  };

  // открываем модальное окно
  let openButton = document.querySelector('.add-client');

  openButton.addEventListener('click', () => {
    createModalNewClient();
  });

  // функция закрытия окна
  function onClose(modal) {
    modal.remove();
  };

  // функция сохранения нового клиента на сервере
  async function onSave(data, modal, error, buttonAdd) {
    const response = await fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contacts: data.contacts,
        name: data.name,
        surname: data.surname,
        lastName: data.lastName,
        createdAt: data.createdAt,
      }),
    });
    const user = await response.json();

    if (response.status === 200) {
      modal.remove();
    };
    if (response.status === 422) {
      error.style.display = 'block';
      buttonAdd.style.marginBottom = 0;
    };

    paintUsers(user);

    modal.remove();
  };

  // функция изменения клиента на сервере
  async function onChaned(data, modal, error, buttonAdd) {
    const response = await fetch(`http://localhost:3000/api/clients/${data.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contacts: data.contacts,
        name: data.name,
        surname: data.surname,
        lastName: data.lastName,
        createdAt: data.createdAt,
        id: data.id
      }),
    });
    if (response.status === 200) {
      modal.remove();
    };
    if (response.status === 422) {
      error.style.display = 'block';
      buttonAdd.style.marginBottom = 0;
    };
  };

  // создаем функцию добавления контакта
  function createAddContact(user) {
    let formAddNewContact = document.createElement('div');
    formAddNewContact.classList.add('modal-form_contacts');

    let selector = document.createElement('select');
    selector.setAttribute('id', 'select');
    selector.classList.add('select')
    let phoneOption = new Option("Телефон", "Телефон");
    let emailOption = new Option("email", "email");
    let VKOption = new Option("VK", "VK");
    let facebookOption = new Option("Facebook", "Facebook");
    let otherOption = new Option("Другое", "Другое");

    let deleteContact = document.createElement('button');
    deleteContact.classList.add('delete_contact');

    // кнопка удаления контакта
    deleteContact.addEventListener('click', e => {
      e.preventDefault();

      formAddNewContact.remove();

      let contacts = [];

      const data = {
        id: user.id,
        contacts: [...contacts],
        updatedAt: new Date(),
      };

      onChaned(data);
    });

    selector.append(phoneOption, emailOption, facebookOption, VKOption, otherOption);

    let formInput = document.createElement('input');
    formInput.classList.add('form-control');
    formInput.setAttribute('id', 'input');

    formAddNewContact.append(selector, formInput);

    if (user == undefined) {
      formInput.placeholder = 'Введите данные контакта';

      const mediaQuery = window.matchMedia('(min-width: 320px)');

    if (mediaQuery.matches) {
      formInput.placeholder = 'Введите данные';
      Inputmask({"mask": "+7 (999) 999-99-99"}).mask(formInput);
    }
    } else {
      formInput.value = user.value;
      selector.value = user.type;
      formAddNewContact.append(deleteContact);
    };

    const choices = new Choices(selector, {
      searchEnabled: false,
      shouldSort: false,
      placeholder: true
    });

    selector.addEventListener('change', function() {
      for (var i = 0; i < selector.options.length; i++) {
        var option = selector.options[i];
        if (option.value == 'Телефон') {
          Inputmask({"mask": "+7 (999) 999-99-99"}).mask(formInput);
        } else {
          formInput.value = '';
          Inputmask.remove(formInput);
        };
      };
    });

    return formAddNewContact;
  };

  // создаем модальное окно для редактирования клиента
  function createModalChangeClient(user, row) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');
    modalDialog.setAttribute('data-simplebar', 'data-simplebar');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    const modalTitle = document.createElement('h1');
    modalTitle.classList.add('modal-title');
    modalTitle.textContent = 'Изменить данные';
    const modalClose = document.createElement('button');
    modalClose.classList.add('modal-close');
    modalHeader.append(modalTitle, modalClose);

    let form = document.createElement('form');
    form.classList.add('modal-form');
    form.setAttribute('id', 'form');
    let formLabelSurename = document.createElement('label');
    formLabelSurename.classList.add('formLabel');
    formLabelSurename.textContent = 'Фамилия*';
    let inputSurename = document.createElement('input');
    inputSurename.classList.add('input-surename');
    inputSurename.placeholder = 'Фамилия*';
    let formLabelName = document.createElement('label');
    formLabelName.classList.add('formLabel');
    formLabelName.textContent = 'Имя*'
    let inputName = document.createElement('input');
    inputName.classList.add('input-name');
    inputName.placeholder = 'Имя*';
    let formLabelLastname = document.createElement('label');
    formLabelLastname.classList.add('formLabel');
    formLabelLastname.textContent = 'Отчество';
    let inputLastname = document.createElement('input');
    inputLastname.classList.add('input-lastname');
    inputLastname.placeholder = 'Отчество';
    form.append(formLabelSurename, inputSurename, formLabelName, inputName, formLabelLastname, inputLastname);

    let modalFooter = document.createElement('div');
    modalFooter.classList.add('modal-footer');
    let addContacts = document.createElement('div');
    addContacts.classList.add('add-contacts');
    let buttonAdd = document.createElement('button');
    buttonAdd.classList.add('modal-add');
    let buttonAddspan = document.createElement('span');
    buttonAddspan.classList.add('modal-addspan');
    let buttonAddtext = document.createElement('span');
    buttonAddtext.textContent = 'Добавить контакт';
    buttonAdd.append(buttonAddspan, buttonAddtext);

    let error = document.createElement('div');
    error.classList.add('error');
    error.textContent = '"Что-то пошло не так..."';

    let saveNewClient = document.createElement('button');
    saveNewClient.classList.add('modal-save');
    saveNewClient.textContent = 'Сохранить';
    saveNewClient.setAttribute('form', 'form');
    saveNewClient.setAttribute('type', 'submit');
    let cancelSaveClient = document.createElement('button');
    cancelSaveClient.classList.add('modal-delete');
    cancelSaveClient.textContent = 'Удалить клиента';
    modalFooter.append(addContacts, buttonAdd, error, saveNewClient, cancelSaveClient);

    modalDialog.append(modalHeader, form, modalFooter);
    modal.append(modalDialog);
    container.append(modal);

    // флаг на модальное окно
    modalDialog.addEventListener('click', event => {
      event._isClickModal = true;
    });

    modal.addEventListener('click', event => {
      if (event._isClickModal) return;
      modal.remove();
    });

    // крестик закрыващий модальное окно
    modalClose.addEventListener('click', event => {
      event._isClickModal = false;
      modal.remove();
    });

    // сохранить изменения
    let contacts = [];
    form.addEventListener('submit', e => {
      e.preventDefault();

      let form = document.querySelectorAll('.modal-form_contacts');
      form.forEach((e) => {
        let object = {};
        object.value = e.querySelector('.form-control').value;
        object.type = e.querySelector('.select').value;
        contacts.push(object);
      });

      const data = {
        id: user.id,
        contacts: [...contacts],
        name: inputName.value.trim(),
        surname: inputSurename.value.trim(),
        lastName: inputLastname.value.trim(),
        get fullName() {
          return this.surname + ' ' + this.name + ' ' + this.lastName
        },
        createdAt: new Date(),
      };

      onChaned(data, modal, error, buttonAdd);
    });

    // удалить данного клиента
    cancelSaveClient.addEventListener('click', () => {
      deleteClient(user);
      row.remove();
      modal.remove();
    });

    return modal;
  };

  // создаем модальное окно для удаления клиента
  function createModalDeleteClient(user, row) {
    const modal = document.createElement('div');
    modal.classList.add('modal-delete-client');
    let modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog-delete');

    let modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    let modalTitleDelete = document.createElement('h1');
    modalTitleDelete.classList.add('modal-title-delete');
    modalTitleDelete.textContent = 'Удалить клиента';
    let modalClose = document.createElement('button');
    modalClose.classList.add('modal-close');
    modalHeader.append(modalTitleDelete, modalClose);

    let modalDscr = document.createElement('div');
    modalDscr.classList.add('modal-dscr');
    modalDscr.textContent = 'Вы действительно хотите удалить данного клиента?';

    let modalFooter = document.createElement('div');
    modalFooter.classList.add('modal-footer');
    let modalDeleteButton = document.createElement('button');
    modalDeleteButton.classList.add('modal-delete-button');
    modalDeleteButton.textContent = 'Удалить';
    let modalCancelButton = document.createElement('button');
    modalCancelButton.classList.add('modal-cancel-button');
    modalCancelButton.textContent = 'Отмена';
    modalFooter.append(modalDeleteButton, modalCancelButton);

    modalDialog.append(modalHeader,modalDscr, modalFooter);
    modal.append(modalDialog);
    container.append(modal);

    // флаг на модальное окно
    modalDialog.addEventListener('click', event => {
      event._isClickModal = true;
    });

    modal.addEventListener('click', event => {
      if (event._isClickModal) return;
      modal.style.display = 'none';
    });

    // крестик закрыващий модальное окно
    modalClose.addEventListener('click', event => {
      event._isClickModal = false;
      modal.style.display = 'none';
    });

    modalCancelButton.addEventListener('click', event => {
      event._isClickModal = false;
      modal.style.display = 'none';
    });

    // подтверждение удаления клиента в модальном окне
    modalDeleteButton.addEventListener('click', () => {
      deleteClient(user);
      row.remove();
      modal.remove();
      //render(user);
    });

    return modal;
  };

  function sortClients(arr, prop, dir) {
    let clientsCopy = [...arr];

    return clientsCopy.sort(function(clientA, clientB) {
      if ((!dir == false ? clientA[prop] > clientB[prop] : clientA[prop] < clientB[prop]))
      return -1;
    });
  };

  async function render() {
    const response = await fetch('http://localhost:3000/api/clients');
    const data = await response.json();

    let clientsCopy = [... data];

    clientsCopy = sortClients(clientsCopy, column, columnDir);

    document.querySelector('.table-body').innerHTML = '';

      for (const object of clientsCopy) {
        paintUsers(object);
      };
  };

  const thAll = document.querySelectorAll('th');
  let column = 'id';
  let columnDir = true;

  thAll.forEach(item => {
    item.addEventListener('click', function() {

      if (column == this.dataset.column) {
        columnDir = !columnDir;
      } else {
        columnDir = true;
      };

      column = this.dataset.column;

      render();
      this.classList.toggle('active');

      thAll.forEach(el => {
        if (el != this) {
          el.classList.remove('active')
        }
      });
    });
  });

  document.querySelector('.inputHeder').addEventListener('input', function() {
    setTimeout(() => {
      let value = this.value
      filter(value);
    }, 300);
  })

  async function filter(value) {
    const response = await fetch('http://localhost:3000/api/clients');
    const data = await response.json();

    let clientsCopy = [... data];

    let result = [];

    result = clientsCopy.filter(function(user) {
    user.fullName = user.surname + ' ' + user.name + ' ' + user.lastName;
      return user.fullName.toLowerCase().includes(value.toLowerCase())
    });

    document.querySelector('.table-body').innerHTML = '';

    for (const object of result) {
      paintUsers(object);
    };
  }

})
