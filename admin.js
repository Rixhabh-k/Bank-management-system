function authentication() {
    // Auth Guard
    let isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");

    if (isAdminLoggedIn !== "true") {

        window.location.href = "index.html";
    }
}

authentication()

function logOutAdmin() {
    let logOutBtn = document.querySelector('#logout')

    logOutBtn.addEventListener("click", function () {
        localStorage.removeItem("isAdminLoggedIn")
        window.location.href = "index.html";
    })
}

logOutAdmin()

function switchTabs() {
    // tabs 
    let homeTab = document.querySelector('#homeTab');
    let addUserTab = document.querySelector('#addUserTab');
    let updateUserTab = document.querySelector('#updateUserTab');

    // content 
    let homeContent = document.querySelector('.content');
    let addUserContent = document.querySelector('.addUserSection');
    let updateUserSection = document.querySelector('.updateUserSection');

    // helper: sab hide karo
    function hideAllSections() {
        homeContent.style.display = "none";
        addUserContent.style.display = "none";
        updateUserSection.style.display = "none";

        homeTab.classList.remove("active");
        addUserTab.classList.remove("active");
        updateUserTab.classList.remove("active");
    }

    // Add User Tab
    addUserTab.addEventListener("click", function () {
        hideAllSections();
        addUserTab.classList.add("active");
        addUserContent.style.display = "flex";
    });

    // Home Tab
    homeTab.addEventListener("click", function () {
        hideAllSections();
        homeTab.classList.add("active");
        homeContent.style.display = "flex";
    });

    // Update User Tab
    updateUserTab.addEventListener("click", function () {
        hideAllSections();
        updateUserTab.classList.add("active");
        updateUserSection.style.display = "flex";
    });
}


switchTabs()

function addUser() {
    const addUserForm = document.getElementById("addUserForm");

    // generate user account number 
    function generateAccountNumber() {
        return "AC" + Date.now() + Math.floor(Math.random() * 1000);
    }

    // user random id generate 
    function generateUserId() {
        return "USER" + Math.floor(Math.random() * 1000);
    }


    addUserForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const pin = e.target.pin.value.trim();
        const confirmPin = e.target.confirmPin.value.trim();

        // PIN validation
        if (pin !== confirmPin) {
            alert("ATM PIN and Confirm PIN do not match!");
            return;
        }

        const userId = generateUserId();
        const userData = {
            id: userId,
            fullName: e.target.fullName.value,
            email: e.target.email.value,
            mobile: e.target.mobile.value,
            balance: e.target.balance.value,
            accountType: e.target.accountType.value,
            pin: e.target.pin.value,
            status: e.target.status.value,
            accountNumber: generateAccountNumber()
        };

        localStorage.setItem(userId, JSON.stringify(userData));

        console.log(userData);

        // toast notification 

        const notifyDiv = document.createElement("div");
        notifyDiv.className = "addUserNorify";

        const icon = document.createElement("i");
        icon.className = "ri-check-line";

        const heading = document.createElement("h1");
        heading.textContent = "User Added Successfully";

        notifyDiv.appendChild(icon);
        notifyDiv.appendChild(heading);

        let addUserContent = document.querySelector('.addUserSection')


        addUserContent.appendChild(notifyDiv);


        setTimeout(() => {
            notifyDiv.classList.add("show");
        }, 10);


        setTimeout(() => {
            notifyDiv.classList.remove("show");
            setTimeout(() => {
                notifyDiv.remove();
            }, 400);
        }, 3000);


        //! adding user at home dashboard




        function addingUser() {

            const memberRow = document.createElement("div");
            memberRow.className = "member-row";

            const name = document.createElement("span");
            name.textContent = userData.fullName;

            const id = document.createElement("span");
            id.textContent = userData.id;

            const date = document.createElement("span");

            if (userData.accountType == "personal") {
                date.textContent = "Personal"
            } else if (userData.accountType == "business") {
                date.textContent = "Business"

            }

            const status = document.createElement("span");

            status.className = "status active";

            if (userData.status == "active") {
                status.textContent = "Active";
            } else {
                status.textContent = "Blocked";
                status.style.color = "#ff6b6b"
            }

            memberRow.appendChild(name);
            memberRow.appendChild(id);
            memberRow.appendChild(date);
            memberRow.appendChild(status);

            // append child

            let homeMembers = document.querySelector('.home-members')

            homeMembers.appendChild(memberRow);

            if (homeMembers.children.length > 5) {
                homeMembers.firstElementChild.remove();
            }


            //! updating cards 

            function updateCards() {

                //! total members update 
                let totalUsers = document.querySelector('#totalUsers')
                let totalUserCount = Number(totalUsers.textContent);

                totalUserCount += 1

                totalUsers.textContent = totalUserCount;

                //! active users update 
                let totalActiveUsers = document.querySelector('#totalActiveUsers')
                let totalActiveUsersCount = Number(totalActiveUsers.textContent)

                let totalBlockedUsers = document.querySelector('#totalBlockedUsers')
                let totalBlockedUsersCount = Number(totalBlockedUsers.textContent)

                if (userData.status == "active") {
                    totalActiveUsersCount += 1
                } else if (userData.status == "blocked") {
                    totalBlockedUsersCount += 1
                }

                totalActiveUsers.textContent = totalActiveUsersCount
                totalBlockedUsers.textContent = totalBlockedUsersCount

                //! total funds update 
                let totalFunds = document.querySelector('#totalFunds')

                let totalFundsCount = Number(
                    totalFunds.textContent.replace("₹", "").replace(/,/g, "").trim()
                );

                let userBalance = Number(userData.balance);

                totalFundsCount += userBalance;

                totalFunds.textContent = `₹ ${totalFundsCount.toLocaleString("en-IN")}`;
            }

            updateCards()
        }

        addingUser()


        e.target.reset();
    });



}

addUser()






