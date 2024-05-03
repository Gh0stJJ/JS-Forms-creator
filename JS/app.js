/*
*    JS Para un proyecto de creacion de formularios dinamicos
*   @autor: Juanja
*   @version: 1.0
*/

// Inicializacion de var, objetos, DOM

var finish_btn;
var formName;
var formDescription;
var formStructure = [];
var formQuestions = [];
var form_select;
var add_form_btn;
var main;

var questionCounter = 0;





/**
 * Genera una nueva pregunta en el formulario
 */
function addQuestion() {
   questionCounter++
    //Html de la pregunta
    let questionHtml = `
        <!-- Question component -->
                <div class="card" id="creator${questionCounter}">
                    <div class="card-header">
                        <strong>Configuración de pregunta ${questionCounter}</strong>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <label for="fieldName">Nombre de la pregunta</label>
                            <input type="text" class="form-control" id="question_title${questionCounter}" placeholder="Ingrese un nombre para la pregunta">
                        </div>
                        <div class="form-group">
                            <label for="fieldType">Tipo de pregunta</label>
                            <select class="form-select" id=" select${questionCounter}">
                                <option selected>Tipo de pregunta...</option>
                                <option value="1">Texto</option>
                                <option value="2">Verdadero/falso</option>
                                <option value="3">Opción multiple</option>
                            </select>
                        </div>
                    </div>
                </div>
    `
    //agregar al elemento main antes del boton de agregar pregunta
    let newQuestion = document.createElement('div');
    newQuestion.innerHTML = questionHtml;
    main.insertBefore(newQuestion, add_form_btn);
    refreshListeners();
}



function appendQuestionField(){
    let div = document.createElement('div');
    div.className = 'form-group';
    let label = document.createElement('label');
    label.innerHTML = 'Nombre de la pregunta';
    let input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control';
    div.appendChild(label);
    div.appendChild(input);
    document.getElementById('questions').appendChild(div);
    

}

function refreshListeners(){
    form_select = document.getElementsByClassName('form-select');
    for (var i = 0; i < form_select.length; i++) {
        form_select[i].addEventListener('change', handleSelectChange);
    }
}

function addMultipleChoiceOptions(parentDiv) {
    let container = document.createElement('div');
    container.className = 'options-container';

    let addButton = document.createElement('button');
    addButton.innerHTML = 'Agregar opción';
    addButton.className = 'btn btn-success';
    addButton.type = 'button';
    addButton.addEventListener('click', function () {
        let optionDiv = document.createElement('div');
        optionDiv.className = 'form-group';
        let label = document.createElement('label');
        let numOptions = container.children.length;
        label.innerHTML = 'Nombre de la opción ' + numOptions;
        let input = document.createElement('input');
        input.type = 'text';
        input.className = 'form-control';
        optionDiv.appendChild(label);
        optionDiv.appendChild(input);
        container.appendChild(optionDiv);
    });

    parentDiv.appendChild(container);
    container.appendChild(addButton);

    


}

function handleSelectChange() {
    const selectedType = this.value;
    const parentDiv = this.closest('.card-body');
    if (selectedType === '3') { // Opción múltiple
        console.log('Opción múltiple');
        addMultipleChoiceOptions(parentDiv);
        //Block combobox
        this.disabled = true;
    }
}

function renderForm() {
    //Limpiar el contenedor de preguntas
    document.getElementById('questions').innerHTML = '';
    
}


function domReady(){
    
    finish_btn = document.getElementById('finish_btn');
    formName = document.getElementById('formName');
    formDescription = document.getElementById('formDescription');
    
    add_form_btn = document.getElementById('add_form_btn');
    main = document.getElementById('main');

    add_form_btn.addEventListener('click', addQuestion);

    finish_btn.addEventListener('click', function(){
        //Guardar el nombre y la descripcion del formulario
        let form = {
            name: formName.value,
            description: formDescription.value,
            questions: formQuestions
        }
        console.log(form);
    }
    );



    refreshListeners();



}



document.addEventListener('DOMContentLoaded', domReady);