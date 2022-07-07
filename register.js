
function getEL(id) {
    return document.querySelector(`#${id}`)
}

const successColor = '#0ba360'
const failColor = '#dc3545'
let myForm = document.querySelector('.myform')
let inputs = myForm.querySelectorAll('input')
let submitBtn = document.querySelector('.form-submit')
let errors = {}

inputs.forEach(item => item.addEventListener('keyup', handleValidate))

function showError(name, mess, check) {
    if (!check) {
        getEL(`${name}`).style.borderColor = failColor
    } else {
        getEL(`${name}`).style.borderColor = successColor
    }
    errors[name] = mess
    getEL(`${name}_error`).innerHTML = mess
}

function handleValidate(e) {
    const { name, value, type } = e.target

    if (value.trim() === '') {
        showError(name, `This field is required!`, false)
    } else {
        showError(name, '', true)
    }

    if (name === 'passWord') {
        let passWordConfirm = getEL('passWordConfirm').value
        if (passWordConfirm !== value ) {
            showError('passWordConfirm', `Password does not match!`, false)
        } else {
            showError('passWordConfirm', '', true)
        }
    }

    if (name === 'passWordConfirm') {
        let passWord = getEL('passWord').value
        if (passWord !== value && passWord !== '') {
            showError(name, `Password does not match!`, false)
        } else {
            showError(name, '', true)
        }
    }

    if (name === 'email') {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(value)) {
            showError(name, `Email is invalid!`, false)
        } else {
            showError(name, '', true)
        }
    }
}

