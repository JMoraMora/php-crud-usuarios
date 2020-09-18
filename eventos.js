const tbodydatos = document.getElementById('tbodydatos')
const btnEdit = document.getElementById('btnEdit');
const dataEdit = document.getElementById('dataEdit');
const btnUp = document.getElementById('btnUp');
const SelectEstado = document.getElementById('SelectEstado');
const btnAdd = document.getElementById('btnAdd');
const btnEstado = document.getElementById('btnEstado');
const btnDelete = document.getElementById('btnDelete');


CargarEventos();

function CargarEventos(){
    btnAdd.addEventListener('click', crearUser);
    btnEstado.addEventListener('click', mostrarUsersxEstado);
    btnEdit.addEventListener('click', ModificarUser);
    btnUp.addEventListener('click', ActualizarUser);
    btnDelete.addEventListener('click', BorrarUsers);
    document.addEventListener("DOMContentLoaded", obtenerUsuarios);
}

function obtenerUsuarios(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            myObjUsers = JSON.parse(this.responseText);
            
            myObjUsers.forEach(myObjUser => {
                
                let tr = document.createElement("tr");

                for (x in myObjUser) {
                    let td = document.createElement("td");
                    td.innerText = myObjUser[x];
                    tr.appendChild(td);
                }

                let td = document.createElement("td");
                td.className = "text-center";

                let input = document.createElement("input");
                input.setAttribute('type', 'checkbox');
                input.setAttribute('value', `${myObjUser.id}`);
                input.className = "form-check-input inpChck";
                
                input.addEventListener('click', (e)=>{
                    if (e.target.checked == true) {
                        e.target.setAttribute('checked', 'checked');
                    } else {
                        e.target.removeAttribute('checked');
                    }
                });

                td.appendChild(input);
                tr.appendChild(td);

                tbodydatos.appendChild(tr);
            });
        }
    };
    xhttp.open("GET", "getUsers.php", true);
    xhttp.send();
}

function mostrarUsersxEstado(e){
    e.preventDefault();
    let estado = SelectEstado.value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            tbodydatos.innerText = '';
            myObjUsers = JSON.parse(this.responseText);
            myObjUsers.forEach(myObjUser => {

                let tr = document.createElement("tr");

                for (x in myObjUser) {
                    let td = document.createElement("td");
                    td.innerText = myObjUser[x];
                    tr.appendChild(td);
                }

                let td = document.createElement("td");
                td.className = "text-center";

                let input = document.createElement("input");
                input.setAttribute('type', 'checkbox');
                input.setAttribute('value', `${myObjUser.id}`);
                input.className = "form-check-input inpChck";
                
                input.addEventListener('click', (e)=>{
                    if (e.target.checked == true) {
                        e.target.setAttribute('checked', 'checked');
                    } else {
                        e.target.removeAttribute('checked');
                    }
                });

                td.appendChild(input);
                tr.appendChild(td);

                tbodydatos.appendChild(tr);
            });
        }
    };
    xhttp.open("POST", "showUsersForStatus.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("status=" + estado);
}

function crearUser(e){
    let usuario = document.getElementById('inpAddUser');
    e.preventDefault();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObjUsers = JSON.parse(this.responseText);
            
            myObjUsers.forEach(myObjUser => {
                
                let tr = document.createElement("tr");

                for (x in myObjUser) {
                    let td = document.createElement("td");
                    td.innerText = myObjUser[x];
                    tr.appendChild(td);
                }

                let td = document.createElement("td");
                td.className = "text-center";

                let input = document.createElement("input");
                input.setAttribute('type', 'checkbox');
                input.setAttribute('value', `${myObjUser.id}`);
                input.className = "form-check-input inpChck";
                
                input.addEventListener('click', (e)=>{
                    if (e.target.checked == true) {
                        e.target.setAttribute('checked', 'checked');
                    } else {
                        e.target.removeAttribute('checked');
                    }
                });

                td.appendChild(input);
                tr.appendChild(td);

                tbodydatos.appendChild(tr);
            });
            
            //Cerrar Modal con Bootstrap jQuery
            $('#ModalNuevo').modal('hide');
        }
    };
    xhttp.open("POST", "crearUsuario.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("username=" + usuario.value);
    
}

function ModificarUser(){
    dataEdit.innerHTML = '';
    let inpChck = document.getElementsByClassName('inpChck');
    let ids = [];
    let inpChecks = Array.prototype.slice.call(inpChck);
    inpChecks.forEach(inpCheck => {
        if(inpCheck.checked == true){
            ids.push(inpCheck.value)
        }
    });
    ids = JSON.stringify(ids);

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObjUsers = JSON.parse(this.responseText);
            
            myObjUsers.forEach(myObjUser => {
                let row = document.createElement("div");
                row.className = "row form-group";

                let label = document.createElement("label");
                label.innerText = `ID: ${myObjUser.id}`;
                label.setAttribute('id', `${myObjUser.id}`);
                label.className = "col-2 col-form-label lblEdit";

                let divinpTxt = document.createElement("div");
                divinpTxt.className = "col-4";

                let divInpRdo = document.createElement("div");
                divInpRdo.className = "col-6 col-form-label";

                let inpTxt = document.createElement("input");
                inpTxt.setAttribute('type', 'text');
                inpTxt.setAttribute('value', `${myObjUser.username}`);
                inpTxt.className = "form-control inpEdit";

                let divRdoActivo = document.createElement('div');
                let divRdoDesactivo = document.createElement('div');

                divRdoActivo.className = "custom-control custom-radio custom-control-inline";
                divRdoDesactivo.className = "custom-control custom-radio custom-control-inline";

                let inpRdoA = document.createElement("input");
                let inpRdoD = document.createElement("input");

                let lblRdoA = document.createElement("label");
                let lblRdoD = document.createElement("label");

                inpRdoA.setAttribute('type', 'radio');
                inpRdoA.setAttribute('id', `RadioActivo${myObjUser.id}`);
                inpRdoA.setAttribute('value', '1');
                inpRdoA.setAttribute('name', `RadioBtn${myObjUser.id}`);
                inpRdoA.className = "custom-control-input";

                lblRdoA.className  = "custom-control-label";
                lblRdoA.setAttribute('for', `RadioActivo${myObjUser.id}`);                
                lblRdoA.innerText = "Activo";

                inpRdoD.setAttribute('type', 'radio');
                inpRdoD.setAttribute('id', `RadioDesactivo${myObjUser.id}`);
                inpRdoD.setAttribute('value', '0');
                inpRdoD.setAttribute('name', `RadioBtn${myObjUser.id}`);
                inpRdoD.className = "custom-control-input";

                lblRdoD.className  = "custom-control-label";
                lblRdoD.setAttribute('for', `RadioDesactivo${myObjUser.id}`);                
                lblRdoD.innerText = "Desactivo";

                if (myObjUser.estado == 1) {
                    inpRdoA.setAttribute("checked", "checked")
                } else {
                    inpRdoD.setAttribute("checked", "checked")
                }

                divRdoActivo.appendChild(inpRdoA);
                divRdoActivo.appendChild(lblRdoA);

                divRdoDesactivo.appendChild(inpRdoD);
                divRdoDesactivo.appendChild(lblRdoD);

                divinpTxt.appendChild(inpTxt);
                divInpRdo.appendChild(divRdoActivo);
                divInpRdo.appendChild(divRdoDesactivo);

                row.appendChild(label);
                row.appendChild(divinpTxt);
                row.appendChild(divInpRdo);
                
                dataEdit.appendChild(row);
            });
        }
    };
    xhttp.open("POST", "editUsers.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("ids=" + ids);
}

function ActualizarUser(e){
    e.preventDefault();
    
    let data = [];
    let lblEdit = document.getElementsByClassName('lblEdit');
    let lblEditIds = Array.prototype.slice.call(lblEdit);
    let inpEdit = document.getElementsByClassName('inpEdit');
    let inpEditUsers = Array.prototype.slice.call(inpEdit);

    for(x in lblEditIds){
        let elementsRdBtn = '';
        elementsRdBtn = document.getElementsByName(`RadioBtn${lblEditIds[x].id}`);
        let usuario = {};
        usuario.id = lblEditIds[x].id;
        usuario.username = inpEditUsers[x].value;

        elementsRdBtn.forEach(elementRdBtn => {
            if(elementRdBtn.checked){
                usuario.estado = elementRdBtn.value;
            }
        });
        data.push(usuario);
    }
    
    data = JSON.stringify(data);

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            tbodydatos.innerHTML = '';
            
            myObjUsers = JSON.parse(this.responseText);
            
            myObjUsers.forEach(myObjUser => {
                
                let tr = document.createElement("tr");

                for (x in myObjUser) {
                    let td = document.createElement("td");
                    td.innerText = myObjUser[x];
                    tr.appendChild(td);
                }

                let td = document.createElement("td");
                td.className = "text-center";

                let input = document.createElement("input");
                input.setAttribute('type', 'checkbox');
                input.setAttribute('value', `${myObjUser.id}`);
                input.className = "form-check-input inpChck";
                
                input.addEventListener('click', (e)=>{
                    if (e.target.checked == true) {
                        e.target.setAttribute('checked', 'checked');
                    } else {
                        e.target.removeAttribute('checked');
                    }
                });

                td.appendChild(input);
                tr.appendChild(td);

                tbodydatos.appendChild(tr);
            });
            
            //Cerrar Modal con Bootstrap jQuery
            $('#ModalUpdate').modal('hide');
        }
    };
    xhttp.open("POST", "updateUsers.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("data=" + data);
}

function BorrarUsers(e){
    e.preventDefault();
    let inpChck = document.getElementsByClassName('inpChck');
    let ids = [];
    let inpChecks = Array.prototype.slice.call(inpChck);
    inpChecks.forEach(inpCheck => {
        if(inpCheck.checked == true){
            ids.push(inpCheck.value)
        }
    });
    ids = JSON.stringify(ids);

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            tbodydatos.innerHTML = '';
            
            myObjUsers = JSON.parse(this.responseText);
            
            myObjUsers.forEach(myObjUser => {
                
                let tr = document.createElement("tr");

                for (x in myObjUser) {
                    let td = document.createElement("td");
                    td.innerText = myObjUser[x];
                    tr.appendChild(td);
                }

                let td = document.createElement("td");
                td.className = "text-center";

                let input = document.createElement("input");
                input.setAttribute('type', 'checkbox');
                input.setAttribute('value', `${myObjUser.id}`);
                input.className = "form-check-input inpChck";
                
                input.addEventListener('click', (e)=>{
                    if (e.target.checked == true) {
                        e.target.setAttribute('checked', 'checked');
                    } else {
                        e.target.removeAttribute('checked');
                    }
                });

                td.appendChild(input);
                tr.appendChild(td);

                tbodydatos.appendChild(tr);
            });
            
            //Cerrar Modal con Bootstrap jQuery
            $('#ModalDelete').modal('hide');
        }
    };
    xhttp.open("POST", "deleteUsers.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("ids=" + ids);   
}