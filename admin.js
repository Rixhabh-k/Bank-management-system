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
            dateOfJoin: e.target.dateOfJoin.value,
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

            //! user adding in home tab 

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

            //! adding user in update user tab

            const updateMemberRow = document.createElement("div");
            updateMemberRow.className = "update-member-row";

            const updateName = document.createElement("span");
            updateName.textContent = userData.fullName;

            const updateId = document.createElement("span");
            updateId.textContent = userData.id;

            const updateStatus = document.createElement("span");
            updateStatus.className = "status active";

            if (userData.status == "active") {
                updateStatus.textContent = "Active";
            } else {
                updateStatus.textContent = "Blocked";
                updateStatus.style.color = "#ff6b6b"
            }

            const updateAction = document.createElement("div");
            updateAction.className = "updateAction";

            const viewBtn = document.createElement("button");
            viewBtn.id = "viewUser";
            viewBtn.textContent = "View";



            const editBtn = document.createElement("button");
            editBtn.id = "editUser";
            editBtn.textContent = "Edit";

            updateAction.appendChild(viewBtn);
            updateAction.appendChild(editBtn);


            updateMemberRow.appendChild(updateName);
            updateMemberRow.appendChild(updateId);
            updateMemberRow.appendChild(updateStatus);
            updateMemberRow.appendChild(updateAction);

            // jahan append karna ho (Update tab ke container me)
            const updateMembersContainer = document.querySelector(".update-members");
            updateMembersContainer.appendChild(updateMemberRow);

            //! view user logic 

            viewBtn.addEventListener('click', function () {
                console.log("click");

                let update = document.querySelector('.update')
                update.classList.add('main-update-member')

                // main-update-member
                

                const container = document.createElement("div");
                container.className = "update-members-container viewUser";

                function createViewModel(label, value, extraClass = "") {
                    const viewModel = document.createElement("div");
                    viewModel.className = `view-model ${extraClass}`.trim();

                    const h1 = document.createElement("h1");
                    h1.textContent = label + ": ";

                    const span = document.createElement("span");
                    span.textContent = value;

                    h1.appendChild(span);
                    viewModel.appendChild(h1);

                    return viewModel;
                }

                container.appendChild(createViewModel("Name", userData.fullName));
                container.appendChild(createViewModel("User Id", userData.id));
                container.appendChild(createViewModel("Account Number", userData.accountNumber));
                container.appendChild(createViewModel("Email", userData.email));
                container.appendChild(createViewModel("Phone", `+91 ${userData.mobile}`));
                container.appendChild(createViewModel("Account Type", userData.accountType));
                container.appendChild(createViewModel("Account Balance", userData.balance));
                container.appendChild(createViewModel("Account Status", userData.status));

                // Last row with Close button
                const lastViewModel = createViewModel("Date Of Creation", userData.dateOfJoin, "view-close");

                const closeBtn = document.createElement("button");
                closeBtn.id = "viewUserClose";
                closeBtn.textContent = "Close";

                lastViewModel.appendChild(closeBtn);
                container.appendChild(lastViewModel);

                // append 
                document.querySelector('.updateUserSection-container').appendChild(container)

                closeBtn.addEventListener('click', function () {
                    document.querySelector('.updateUserSection-container').removeChild(container)
                    update.classList.remove('main-update-member')
                })


            })

            //! view user logic 



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






