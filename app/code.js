const indexedDB = window.indexedDB;
const form = document.getElementById('form');
const task = document.getElementById('task');


if(indexedDB && form){
    let db;
    const request = indexedDB.open('taskList',1);

    request.onsuccess = ()=>{
        db = request.result;
        console.log('OPEN', db);
        readData();
    }
    request.onupgradeneeded = ()=>{
        db = request.result;
        console.log('CREATE', db);
        const ObjectStore = db.createObjectStore('Tasks',{
            keyPath: 'Titulo'
        });
    }
    request.onerror =(err) =>{
        console.log('error', err);
    
    }
    const addData = (data) =>{
        const transaccion = db.transaction(['Tasks'], 'readwrite');
        const objectStore = transaccion.objectStore('Tasks');
        const request = objectStore.add(data);
        readData();
    }

    const getData = (key) =>{
        const transaccion = db.transaction(['Tasks'], 'readwrite');
        const objectStore = transaccion.objectStore('Tasks');
        const request = objectStore.get(key);
        
        request.onsuccess = () =>{
            form.task.value = request.result.Titulo;
            form.prioridad.value = request.result.Prioridad;
            form.button.dataset.action = 'update';
            form.button.textContent = 'Update task';
        }
    }

    const updateData = (data) =>{
        const transaccion = db.transaction(['Tasks'], 'readwrite');
        const objectStore = transaccion.objectStore('Tasks');
        const request = objectStore.put(data);

        request.onsuccess = () =>{
            form.button.dataset.action = 'add';
            form.button.textContent = 'Add task';
            readData();
        }
    }

    const readData = (data) =>{
        const transaccion = db.transaction(['Tasks'], 'readonly');
        const objectStore = transaccion.objectStore('Tasks');
        const request = objectStore.openCursor();
        
        const fragment = document.createDocumentFragment();
        

        request.onsuccess = (e) =>{
            const cursor = e.target.result;
            if(cursor){
                const row = document.createElement('tr');
                const taskTitle = document.createElement('td');
                taskTitle.textContent =cursor.value.Titulo;
                row.appendChild(taskTitle);
                fragment.appendChild(row);

                const taskPrioridad = document.createElement('td');
                taskPrioridad.textContent =cursor.value.Prioridad;
                row.appendChild(taskPrioridad);
                fragment.appendChild(row);

                const td = document.createElement('td');

                const taskUpdate = document.createElement('button');
                taskUpdate.classList.add('btn', 'btn-warning')
                taskUpdate.dataset.type = 'update';
                taskUpdate.dataset.key = cursor.key;
                taskUpdate.textContent = 'Update';


                const taskDelete = document.createElement('button');
                taskDelete.classList.add('btn', 'btn-danger')
                taskDelete.textContent = 'Delete';
                td.appendChild(taskUpdate);
                td.appendChild(taskDelete);
                row.appendChild(td);
                fragment.appendChild(row);
                cursor.continue()
            }else{
                //console.log('---------------not more data----------------');
                task.textContent = "";
                task.appendChild(fragment);
            }
            
        }
    }

    form.addEventListener('submit', (e) =>{
        e.preventDefault();
        const data ={
            Titulo: e.target.task.value,
            Prioridad: e.target.prioridad.value
        }
        //console.log(data);
        if(e.target.button.dataset.action == 'add'){
            addData(data)

        }else if(e.target.button.dataset.action == 'update'){
            updateData(data);

        }
        form.reset();
    });
    task.addEventListener('click', (e) =>{
        if(e.target.dataset.type == 'update'){
            getData(e.target.dataset.key);

        }
        
    });
}