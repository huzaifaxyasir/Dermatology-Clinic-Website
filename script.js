// Handle appointment form submission
const form = document.getElementById("appointmentForm");
if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const booking = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      date: document.getElementById("date").value,
      phone: document.getElementById("phone").value
    };

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("Your appointment request has been submitted!");

    form.reset();
  });

}
