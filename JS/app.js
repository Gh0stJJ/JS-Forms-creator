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

var numQuestions = 0;



function addToStructure(e){

   let question = {
         name: creator_fieldName.value,
         type: creator_fieldType.value
    }
}

function renderForm(){
    
}

function addQuestion(){
    numQuestions++;
    let div = document.createElement('div');
    div.className = 'card';
    let card_header = document.createElement('div');
    card_header.className = 'card-header';
    let strong = document.createElement('strong');
    strong.innerHTML = 'Configuracion de la pregunta';
    card_header.appendChild(strong);
    div.appendChild(card_header);
    let card_body = document.createElement('div');
    card_body.className = 'card-body';
    let div_group = document.createElement('div');
    div_group.className = 'form-group';
    let label = document.createElement('label');
    label.innerHTML = 'Nombre de la pregunta';
    let input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control';
    input.id = 'question'+numQuestions;
    div_group.appendChild(label);
    div_group.appendChild(input);
    card_body.appendChild(div_group);
    let div_group2 = document.createElement('div');
    div_group2.className = 'form-group';
    let label2 = document.createElement('label');
    label2.innerHTML = 'Tipo de pregunta';
    let select = document.createElement('select');
    select.className = 'form-control form-select';
    let option1 = document.createElement('option');
    option1.value = 1;
    option1.innerHTML = 'Texto';
    let option2 = document.createElement('option');
    option2.value = 2;
    option2.innerHTML = 'Verdadero/falso';
    let option3 = document.createElement('option');
    option3.value = 3;
    option3.innerHTML = 'Opcion multiple';
    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);
    div_group2.appendChild(label2);
    div_group2.appendChild(select);
    card_body.appendChild(div_group2);
    div.appendChild(card_body);
    document.getElementById('questions').appendChild(div);

    //Poner listener al select

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




function domReady(){
    finish_btn = document.getElementById('finish_btn');
    formName = document.getElementById('formName');
    formDescription = document.getElementById('formDescription');
    
    form_select = document.getElementsByClassName('form-select');
    add_form_btn = document.getElementById('add_form_btn');
    
    finish_btn.addEventListener('click', renderForm);
    add_form_btn.addEventListener('click', addQuestion);
    
    for(var i = 0; i < form_select.length; i++){  
        form_select[i].addEventListener('change', function(){
            if (this.value == 3){
                //opcion multiple
                //Contenedor de opciones
                let contain_div = document.createElement('div');
                contain_div.className = 'form-container';
                let div = document.createElement('div');
                div.className = 'form-group';
                let label = document.createElement('label');
                label.innerHTML = 'Nombre de la opcion';
                let input = document.createElement('input');
                input.type = 'text';
                input.className = 'form-control';
                div.appendChild(label);
                div.appendChild(input);
                
                this.parentNode.appendChild(contain_div);
                contain_div.appendChild(div);
                
                //Remove this
                this.parentNode.removeChild(this);
                //Boton para agregar otra opcion
                let add_option = document.createElement('button');
                add_option.innerHTML = 'Agregar otra opcion';
                add_option.className = 'btn btn-success';
                add_option.addEventListener('click', function(){
                    let div = document.createElement('div');
                    div.className = 'form-group';
                    let label = document.createElement('label');
                    let numOptions = contain_div.children.length;
                    label.innerHTML = 'Nombre de la opcion '+numOptions;
                    let input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'form-control';
                    div.appendChild(label);
                    div.appendChild(input);
                    this.parentNode.insertBefore(div, this);
                });
                
                contain_div.appendChild(add_option);
                
            }
        });
    }

}



document.addEventListener('DOMContentLoaded', domReady);