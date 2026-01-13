let adminData = JSON.parse(localStorage.getItem("adminData"));
console.log(adminData);

let adminLoginForm = document.querySelector('#adminLoginForm');


adminLoginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let enteredUsername = e.target.username.value;
    let enteredPassword = e.target.password.value;

    

    if (
        enteredUsername === adminData.username &&
        enteredPassword === adminData.password
    ) {
        localStorage.setItem("isAdminLoggedIn", "true");
        window.location.href = "admin.html"
    } else {
        alert("Invalid Username or Password");
    }
});



// const adminData = {
//     username: "admin@123",
//     password: "1234"
// };

// // save to localStorage
// localStorage.setItem("adminData", JSON.stringify(adminData));