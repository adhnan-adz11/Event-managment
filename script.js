/* EVENT TIMER */
const eventDate = new Date("March 15, 2026 10:00:00").getTime();
const timer = document.getElementById("timer");

setInterval(() => {
    const now = new Date().getTime();
    const diff = eventDate - now;

    if (diff <= 0) {
        timer.textContent = "🎉 Event Started!";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    timer.textContent = `⏳ Starts in ${days}d ${hours}h ${minutes}m`;
}, 1000);

/* SEAT SYSTEM */
const seatsContainer = document.getElementById("seats");
const seatSection = document.getElementById("seatSection");
const confirmation = document.getElementById("confirmation");

let selectedSeat = null;
let bookedSeats = JSON.parse(localStorage.getItem("bookedSeats")) || [];

// Create seats
for (let i = 1; i <= 30; i++) {
    const seat = document.createElement("div");
    seat.textContent = "S" + i;
    seat.classList.add("seat");

    if (bookedSeats.includes(seat.textContent)) {
        seat.classList.add("booked");
    }

    seat.addEventListener("click", () => {
        if (seat.classList.contains("booked")) return;

        document.querySelectorAll(".seat").forEach(s => s.classList.remove("selected"));
        seat.classList.add("selected");
        selectedSeat = seat.textContent;
    });

    seatsContainer.appendChild(seat);
}

/* REGISTRATION */
document.getElementById("registerForm").addEventListener("submit", e => {
    e.preventDefault();
    seatSection.classList.remove("hidden");
});

/* CONFIRM BOOKING */
document.getElementById("confirmBtn").addEventListener("click", () => {
    if (!selectedSeat) {
        alert("Please select a seat");
        return;
    }

    bookedSeats.push(selectedSeat);
    localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));

    confirmation.innerHTML = `
        <h2>✅ Booking Confirmed</h2>
        <p><strong>Name:</strong> ${name.value}</p>
        <p><strong>Email:</strong> ${email.value}</p>
        <p><strong>Seat:</strong> ${selectedSeat}</p>
        <p>🎫 This is your ticket</p>
    `;

    seatSection.classList.add("hidden");
});
