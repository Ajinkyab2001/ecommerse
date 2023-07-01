// Retrieve the form element and add a submit event listener
document.getElementById("myForm").addEventListener("submit", function(event) {
    // event.preventDefault(); // Prevent form submission
    // Get the form data
    const productName = document.getElementById("product-name").value;
    const orderType = document.getElementById("order-type").value;
    const price = document.getElementById("price").value;
    const quantity = document.getElementById("quantity").value;
    // Create a unique key for the user object
    //let key = "user_" + Date.now(); // Using current timestamp as a unique identifier
    // Create a user object
    const user = {
        productName: productName,
        orderType: orderType,
        price: price,
        quantity: quantity
    };
    // Store the user object in local storage with the unique key
    //localStorage.setItem(key, JSON.stringify(user));
    // Clear the form fields
    //document.getElementById("myForm").reset();
    axios.post("https://crudcrud.com/api/e9360aaef3444fbaa5a1deef22018698/ecommerse", user)
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });
    // Reload the booked members list to display the updated list
    loadBookedMembers();
});
// Function to load booked members from local storage and display in the list
function loadBookedMembers() {
   // Get the list of registered members
   axios.get("https://crudcrud.com/api/e9360aaef3444fbaa5a1deef22018698/ecommerse")
   .then((response) => {
    
    const electronicList = document.getElementById("electronic");
    const foodList = document.getElementById("food");
    const skinList = document.getElementById("skin");
    electronicList.innerHTML = ""; // Clear the existing electronic list
    foodList.innerHTML = ""; // Clear the existing food list
    skinList.innerHTML = "";

       // Loop through the list of members and display them on the page
       response.data.forEach((user) => {
        const li = document.createElement("li");
        // li.classList.add("list-group-item");
        li.innerHTML = `
            <div>Name: ${user.productName} ${user.orderType}</div>
            <div>Price: ${user.price}</div>
            <div>Quantity: ${user.quantity}</div>
        `;

           const editButton = document.createElement("button");
           editButton.className = "btn btn-primary btn-sm float-right edit";
           editButton.textContent = "EDIT";
           editButton.dataset.id = user._id;
           editButton.addEventListener("click", function(event){
            const userId = event.target.dataset.id;
            axios.delete(`https://crudcrud.com/api/e9360aaef3444fbaa5a1deef22018698/ecommerse/${userId}`)
            .then(() => {
                li.remove();
                document.getElementById("product-name").value = user.productName;
                document.getElementById("order-type").value = user.orderType;
                document.getElementById("price").value = user.price;
                document.getElementById("quantity").value = user.quantity;
            })
           })

           const deleteButton = document.createElement("button");
           deleteButton.className = "btn btn-danger btn-sm float-right delete";
           deleteButton.textContent = "DELETE";
           deleteButton.dataset.id = user._id;

           deleteButton.addEventListener("click", function(event) {
            const userId = event.target.dataset.id;
            axios.delete(`https://crudcrud.com/api/e9360aaef3444fbaa5a1deef22018698/ecommerse/${userId}`)
            .then(() => {
                li.remove();

            })
            .catch((err) => {
                console.log(err);
            })
           })

           li.appendChild(editButton);
           li.appendChild(deleteButton);
   
           if (user.orderType == "electronic") {
             electronicList.appendChild(li);
           } else if (user.orderType == "food") {
             foodList.appendChild(li);
            
           } else{
            skinList.appendChild(li);
         }
         });
   })
   .catch((err) => {
       console.log(err);
   });
}

// Initial load of booked members list when the page loads

window.addEventListener("DOMContentLoaded", () => {
    loadBookedMembers();
})