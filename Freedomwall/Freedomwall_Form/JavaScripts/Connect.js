const headers = {



  "Content-Type": "application/json",



  "Authorization-Key": "CCS-OCTA-Server"

}; //For fast editing of authorization key



// Handle form submission

document.getElementById("messageForm").addEventListener("submit", function(event) {

  event.preventDefault(); // Prevent the default form submission



  // Get the input values

  const toWhom = document.getElementById("toWhom").value;

  const message = document.getElementById("message").value;



  // Get the selected theme

  const selectedTheme = document.querySelector(".themecolors .color.selected");

  const themeId = selectedTheme ? selectedTheme.getAttribute("data-theme-id") : null;



  // Get selected tags

  const selectedTags = Array.from(document.querySelectorAll(".btntags.selected"))

    .map(tag => tag.getAttribute("data-tag-id"));



  // Validate form fields

  if (!toWhom || !message || !themeId || selectedTags.length === 0) {

    // Show validation modal

    document.getElementById('validationModal').style.display = 'block';

    return; // Exit the function if validation fails

  }



  // Show confirmation modal

  document.getElementById('confirmationModal').style.display = 'block';



  // Handle confirmation of submission

  document.getElementById("confirmSubmit").onclick = function() {

    

    // Construct the request body

    const postData = {

      "ToWhom": toWhom,

      'Message': message,

      "Theme": themeId,

      "Tags": selectedTags

    };



    // Send data to the API

    axios({

        method: "POST",

        url: "https://ccs-octa-server.vercel.app/docs",

        headers,

        data: postData

      })

      .then(data => data.data)

      .then(res => {



        console.log("Success:", res);



        showModal("Message posted successfully!"); // Show success message

        document.getElementById("messageForm").reset(); // Reset the form after successful submission



        // Reset the selected theme color

        const colorButtons = document.querySelectorAll('.themecolors .color');

        colorButtons.forEach((btn) => {

          btn.classList.remove('selected'); // Remove selected class from all theme colors

        });



        // Reset the selected tags

        const tagButtons = document.querySelectorAll('.btntags');

        tagButtons.forEach((btn) => {

          btn.classList.remove('selected'); // Remove selected class from all tags

          btn.style.backgroundColor = ''; // Reset to default background color

          btn.style.color = ''; // Reset to default text color

        });

      })

      .catch((error) => {

        console.error("Error:", error);

        showModal("An error occurred: " + error.message); // Show error message

      });



    // Close confirmation modal

    document.getElementById('confirmationModal').style.display = 'none';

  };



  // Cancellation of submission

  document.getElementById("cancelSubmit").onclick = function() {

    // Close confirmation modal

    document.getElementById('confirmationModal').style.display = 'none';

  };

});



// Function to show modal with a message

function showModal(message) {

  const modal = document.getElementById("successModal");

  const modalContent = modal.querySelector(".modal-content p");

  modalContent.textContent = message;

  modal.style.display = "block"; // Show modal

}



// Handle theme color selection

const colorButtons = document.querySelectorAll('.themecolors .color');

colorButtons.forEach((color) => {

  color.addEventListener('click', function() {

    // Check if the clicked color is already selected

    if (this.classList.contains('selected')) {

      // Deselect it if it is already selected

      this.classList.remove('selected');

    } else {

      // Deselect all other color buttons

      colorButtons.forEach((btn) => btn.classList.remove('selected'));

      // Select the clicked color

      this.classList.add('selected');

    }

  });

});



// Handle tag selection

const tagButtons = document.querySelectorAll('.btntags');

tagButtons.forEach((button) => {

  button.addEventListener('click', function() {

    this.classList.toggle('selected');

    if (this.classList.contains('selected')) {

      this.style.backgroundColor = '#FBB752';

      this.style.color = 'white';

    } else {

      this.style.backgroundColor = ''; // Reset to default

      this.style.color = ''; // Reset text color to default

    }

  });

});



// Close modals

document.querySelectorAll('.close').forEach((closeBtn) => {

  closeBtn.addEventListener('click', function() {

    const modal = this.closest('.modal');

    modal.style.display = 'none';

  });

});



// Close the modal when the user clicks anywhere outside of the modal

window.addEventListener('click', function(event) {

  const modals = document.querySelectorAll('.modal');

  modals.forEach((modal) => {

    if (event.target === modal) {

      modal.style.display = 'none';

    }

  });

});
