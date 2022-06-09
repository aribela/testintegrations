function muestraUsuarios(json){
    let html = ``;

    html += `
    <table class="table table-hover table-striped">
        <tr>
            <th>ID</th>
            <th>Empresa</th>
            <th>Nombre</th>
            <th>Acciones</th>
        </tr>
        `;

    for (let item of json) {
        // console.log(item);
        html += `
        <tr>
            <td>${item.id}</td>
            <td>${item.company.name}</td>
            <td>${item.name}</td>
            <td>
            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="cargaDetalle(${item.id})">Detalle</button>

            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="cargaPost(${item.id})">Ver Posts</button>

            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="cargaTodos(${item.id})">Todos</button>
            </td>
        </tr>
        `;
    }

    html += `
    </table>
    `;

    $("#divContent").html(html);
}

function cargaTodos(userId){
    fetch('https://jsonplaceholder.typicode.com/users/'+userId+'/todos')
            .then((response) => response.json())
            .then((json) => verDetalle(json, 3));
}

function cargaPost(userId){
    fetch('https://jsonplaceholder.typicode.com/users/'+userId+'/posts')
            .then((response) => response.json())
            .then((json) => verDetalle(json, 2));
}

function cargaDetalle(userId){
    fetch('https://jsonplaceholder.typicode.com/users/'+userId)
            .then((response) => response.json())
            .then((json) => verDetalle(json, 1));
}
function verDetalle(item, tipo){
    console.log(item);
    $("#contentDetalle").html("");
    // contentDetalle
    let html = ``;

    html += `
    
        
        `;

    if(tipo == 1){
        // console.log(item);
        html += `
        <h2>Detalle</h2>
        <ul>
            <li>${item.id}</li>
            <li>${item.company.name}</li>
            <li>${item.name}</li>
            <li>${item.username}</li>
            <li>${item.email}</li>
            <li>${item.address.street} ${item.address.zipcode} ${item.address.city}</li>
        </ul>
        `;
        $("#contentDetalle").html(html);
       
    }

    if(tipo == 2){
        $("#contentDetalle").html('<h2>Posts</h2>');
        
        let htmlPosts = ``;
        for (let post of item) {
            htmlPosts = ``;
            htmlPosts += `
            <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">${post.title}</h3>
            </div>
            <div class="panel-body">
                ${post.body}
                <div id="divComentarios_${post.id}"></div>
            </div>
            </div>
            `;
            $("#contentDetalle").append(htmlPosts);
            fetch('https://jsonplaceholder.typicode.com/post/'+post.id+'/comments')
            .then((response) => response.json())
            .then((json) => verComentarios(json, post.id));
        }
    }

    if(tipo == 3){
        let htmlTodos = `<h2>Todos</h2>
        <table class="table table-hover table-striped">`;
        let userId = 0;
        for (let tarea of item) {
            userId = tarea.userId;
            htmlTodos += `
                <tr>
                    <td>${tarea.id}</td>
                    <td>${tarea.title}</td>
                    <td>${tarea.completed}</td>
                </tr>
            `;
        }
        htmlTodos += `
                <tr>
                    <td><input class="" type="hidden" name="userId" id="userId" value="${userId}"></td>
                    <td><input type="text" name="title" id="title" value="" class="form-control tarea required"></td>
                    <td>
                        <select class="form-control tarea required" name="completed" id="completed">
                            <option value="">Seleccione...</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td colspan="3"><button type="button" class="btn btn-info" onclick="crearTarea()">Crear</button></td>
                </tr>
            `;
        htmlTodos += `</table>`;
        $("#contentDetalle").html(htmlTodos);
    }

    

    
}

function crearTarea(){
    let userId = $("#userId").val();
    let title = $("#title").val();
    let completed = $("#completed").val();
    
    if(completed != "" && title != ""){
        fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify({
            userId: userId,
            title: title,
            completed: completed,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((json) => respuestaGuardado(json));
    }else{
        alert("Complete los campos");
    }
}

function verComentarios(comentarios, postId){
    let html = ``;
    $("#divComentarios_"+postId).html("<h2>Comentarios</h2>");
    for (let comentario of comentarios) {
        html = `
        <div class="media">
        <a class="pull-left" href="#">
            <img class="media-object" src="..." alt="">
        </a>
        <div class="media-body">
            <h4 class="media-heading">${comentario.name}</h4>
            <p>${comentario.email}</p>
            ${comentario.body}
        </div>
        </div>
        `;
    }
    $("#divComentarios_"+postId).html(html);

}

function respuestaGuardado(json){
    console.log(json);
    if(json.id > 0){
        alert("Guardado");
    }
}