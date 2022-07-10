let userdata = JSON.parse(localStorage.getItem('formData'));
let user = JSON.parse(localStorage.getItem('userlogin'));

document.querySelector('#edname').value = `${user[0].fname}`;
document.querySelector('#edemail').value = `${user[0].email}`;
document.querySelector('#edphone').value = `${user[0].mobiles}`;

const reset = document.querySelectorAll('input');


function editmain(e) {
    if((document.querySelector('#edname').value === '')||
     (document.querySelector('#edemail').value === '') ||
    (document.querySelector('#edphone').value === '' )) {   
             alert('please Enter your All Details');
        return; 
    }
    user[0].fname = document.querySelector('#edname').value;
    user[0].email = document.querySelector('#edemail').value;
    user[0].mobiles = document.querySelector('#edphone').value;

    userdata.map(item => {
        if (item.Id === user[0].Id) {
            item.fname = user[0].fname;
            item.email = user[0].email;
            item.mobiles = user[0].mobiles;
            item.pwd = user[0].pwd;
        }
    });
    localStorage.setItem('formData', JSON.stringify(userdata));
    localStorage.setItem('userlogin', JSON.stringify(user));


    location.href = "/home.html";

    e.preventDefault();
}
document.getElementById('editbtn').addEventListener('click', editmain);
document.getElementById('editrest').addEventListener('click', () => { reset.forEach(input => input.value = ''); });

