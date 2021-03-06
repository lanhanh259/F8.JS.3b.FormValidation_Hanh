const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

function Validator(options) {
    formElement = $(options.form)
    if(formElement){

        formElement.onsubmit =function (e){
            e.preventDefault();
            var isValidForm = true;

            options.rules.forEach((rule) =>{
                var inputElement = $(rule.selector)
                var valid = !validate(inputElement,rule)
                if(!valid) {
                    isValidForm = false;
                }
            })

            if(isValidForm){
                if(typeof options.onSubmit === 'function'){
                    var enableInputs = $$('.form-group [name]')

                    var formValues = Array.from(enableInputs).reduce((values,input)=>{
                        
                        return (values[input.name]) = input.value && values
                    },{})
                    options.onSubmit(formValues)
                }
            }
        }

        var selectorrules={};

        function validate(inputElement,rule){
            var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
            
            var rules = selectorrules[rule.selector]
            for(var i=0; i<rules.length; i++) {
                var errorMessage = rules[i](inputElement.value)
                if(errorMessage){
                    break;
                }
            }
    
            if(errorMessage) {
                inputElement.parentElement.classList.add('invalid')
                errorElement.innerText = errorMessage
            }else {
                inputElement.parentElement.classList.remove('invalid')
                errorElement.innerText = ''
            }
            return !!errorMessage;
        }
    
        options.rules.forEach((rule)=>{
            var inputElement = $(rule.selector)
            var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
    
            if(Array.isArray(selectorrules[rule.selector])){
                selectorrules[rule.selector].push(rule.test)
            }else{
                selectorrules[rule.selector] = [rule.test]

            }

            if(inputElement){
                inputElement.onblur = function () {
                    validate(inputElement,rule)
                }
                inputElement.oninput = function () {
                    inputElement.parentElement.classList.remove('invalid')
                    errorElement.innerText = ''
                }
            }
            
        })
    }

}

//C??c rules
Validator.isRequired = function(selector) {
    return{
        selector:selector,
        test: function(value) {
            return value.trim() ? undefined :'VUi l??ng ??i???n tr?????ng n??y'
        }

    }
}
Validator.isEmail = function(selector) {
    return{
        selector:selector,
        test: function(value) {
            let regex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            return regex.test(value) ? undefined :'Email kh??ng h???p l???'
        }

    }
}
Validator.isMinLength = function(selector,min) {
    return{
        selector:selector,
        test: function(value) {
            return value.length >= min ? undefined :`M???t kh???u t???i thi???u ${min} k?? t???`
        }

    }
}

Validator.isCorfirmed = function(selector,password) {
    return{
        selector:selector,
        test: function(value) {
            return password() === value ? undefined :`M???t kh???u kh??ng kh???p`
        }

    }
}
