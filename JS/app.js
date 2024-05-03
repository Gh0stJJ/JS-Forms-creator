/*
*    JS Para un proyecto de creacion de formularios dinamicos
*   @autor: Juanja
*   @version: 1.0
*/

// Inicializacion de var, objetos, DOM

var finish_btn;
var formName;
var formDescription;
var form;
var form_select;
var add_form_btn;
var main;
var error;

var questionCounter = 0;

/**
 * Genera una nueva pregunta en el formulario
 */
function addQuestion() {
    //Reset error
    error.className = '';
    error.innerHTML = '';
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
 
    let newQuestion = document.createElement('div');
    newQuestion.innerHTML = questionHtml;
    main.insertBefore(newQuestion, add_form_btn);
    refreshListeners();
}


/**
 * Resetea los listeners de los select
 */
function refreshListeners(){
    form_select = document.getElementsByClassName('form-select');
    for (var i = 0; i < form_select.length; i++) {
        form_select[i].addEventListener('change', handleSelectChange);
    }
}


/**
 * Agrega las opciones de una pregunta de opción múltiple
 * @param {HTMLDivElement} parentDiv 
 */
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


/**
 * Maneja el cambio de un select
 */
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


/**
 * Guarda la estructura del formulario
 * @returns JSON con la estructura del formulario
 */
function saveFormStructure() {
    
    if (!formName || !formDescription || !formName.value.trim() || !formDescription.value.trim()) {
        error.className = 'alert alert-danger';
        error.innerHTML = 'Por favor, complete todos los campos.';
        return;
    }

    form = {
        name: formName.value.trim(),
        description: formDescription.value.trim(),
        questions: []
    };

    let questionCards = document.querySelectorAll('.card:not(#creator)');
    questionCards.forEach((questionCard, index) => {
        let questionTitleInput = questionCard.querySelector('input.form-control');
        let questionTypeSelect = questionCard.querySelector('select.form-select');
        if (!questionTitleInput || !questionTypeSelect || !questionTitleInput.value.trim() || questionTypeSelect.value === 'Tipo de pregunta...') {
            error.className = 'alert alert-danger';
            error.innerHTML = `Por favor, complete todos los campos de la pregunta ${index + 1}.`;
            form = null;
            return;
        }
        let question = {
            title: questionTitleInput.value.trim(),
            type: questionTypeSelect.value
        };

        if (question.type === '3') { // Opción múltiple
            let options = Array.from(questionCard.querySelectorAll('.options-container input'))
                                .map(input => input ? input.value.trim() : '')
                                .filter(value => value);
            if (options.length === 0) {
                error.className = 'alert alert-danger';
                error.innerHTML = `Por favor, agregue al menos una opción para la pregunta ${index + 1}.`;
                return;
            }
            question.options = options;
        }

        form.questions.push(question);
        
        
        
    });

    console.log(form);
    if (form){
        alert('Formulario guardado correctamente.');
        renderForm();
    }
        
}


/**
 * Renderiza el formulario final
 */
function renderForm() {
    
    //Cambia el titulo del header
    let brand = document.getElementById('brand');
    brand.innerHTML = form.name;
    //El boton de finalizar se cambia por el de enviar
    finish_btn.innerHTML = '<button type="button" class="btn btn-success">Enviar</button>';
    finish_btn.removeEventListener('click', saveFormStructure); //Elimina el evento de guardar
    //Marcha el main
    main.innerHTML = '';
    //Renderiza el nombre
    let formNameElement = document.createElement('div');
    formNameElement.id = 'title';
    formNameElement.innerHTML = `<strong>${form.name}</strong>`;

    //Renderiza la descripcion
    let formDescriptionElement = document.createElement('div');
    formDescriptionElement.id = 'description';
    formDescriptionElement.innerHTML = form.description;

    //Renderiza las preguntas
    let questionsElement = document.createElement('div');
    questionsElement.id = 'questions';
    form.questions.forEach((question, index) => {
        let questionElement = document.createElement('div');
        questionElement.className = 'card';
        let questionTitleElement = document.createElement('div');
        questionTitleElement.className = 'card-header';
        questionTitleElement.innerHTML = `<strong>Pregunta ${index + 1}</strong>`;
        questionElement.appendChild(questionTitleElement);
        let questionBodyElement = document.createElement('div');
        questionBodyElement.className = 'card-body';
        questionBodyElement.innerHTML = `
            <h3>${question.title}</h3>
        `;

        if(question.type === '1'){
            questionBodyElement.innerHTML += `<input type="text" class="form-control">`;

        }else if(question.type === '2'){
            //Use checkboxes for true/false questions
            questionBodyElement.innerHTML += `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                    <label class="form-check-label" for="flexRadioDefault1">
                    Verdadero
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                    <label class="form-check-label" for="flexRadioDefault2">
                    Falso
                    </label>
                </div>
            `;

        }else if(question.type === '3'){
            question.options.forEach(option => {
                questionBodyElement.innerHTML += `
                <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  ${option}
                </label>
              </div> `
            });

            
        }
        questionElement.appendChild(questionBodyElement);
        questionsElement.appendChild(questionElement);



    });

    main.appendChild(formNameElement);
    main.appendChild(formDescriptionElement);
    main.appendChild(questionsElement);

    
}
    
    


/**
 * Espera a que el DOM esté listo
 */
function domReady(){
    
    finish_btn = document.getElementById('finish_btn');
    formName = document.getElementById('formName');
    formDescription = document.getElementById('formDescription');
    error = document.getElementById('error');
    add_form_btn = document.getElementById('add_form_btn');
    main = document.getElementById('main');

    add_form_btn.addEventListener('click', addQuestion);

    finish_btn.addEventListener('click', saveFormStructure);
    refreshListeners();
}


//Main
document.addEventListener('DOMContentLoaded', domReady);