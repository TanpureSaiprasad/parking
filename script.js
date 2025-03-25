let bookings = [];
let parkingSpots = {
    "City Center": 12,
    "Mall Parking": 8,
    "Office Parking": 5
};

// Function to open booking modal
function openBooking(spot) {
    document.getElementById("parkingSpot").value = spot;
    document.getElementById("bookingForm").reset();
    new bootstrap.Modal(document.getElementById("bookingModal")).show();
}

// Handle booking form submission
document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let name = document.getElementById("userName").value;
    let date = document.getElementById("bookingDate").value;
    let arrival = document.getElementById("arrivalTime").value;
    let leaving = document.getElementById("leavingTime").value;
    let spot = document.getElementById("parkingSpot").value;

    if (parkingSpots[spot] > 0) {
        bookings.push({
            id: bookings.length + 1,
            name, date, spot, arrival, leaving,
            status: "Booked"
        });

        parkingSpots[spot]--; // Reduce available slots
        updateBookings();
    } else {
        alert("No slots available for " + spot);
    }

    bootstrap.Modal.getInstance(document.getElementById("bookingModal")).hide();
});

// Update bookings table
function updateBookings() {
    let bookingList = document.getElementById("bookingList");
    bookingList.innerHTML = "";

    bookings.forEach((booking, index) => {
        let row = `<tr>
            <td>${index + 1}</td>
            <td>${booking.name}</td>
            <td>${booking.date}</td>
            <td>${booking.spot}</td>
            <td>${booking.arrival}</td>
            <td>${booking.leaving}</td>
            <td>${booking.status}</td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteBooking(${index})">Delete</button></td>
        </tr>`;
        bookingList.innerHTML += row;
    });

    // Update slots in UI
    document.getElementById("city-center").innerText = parkingSpots["City Center"];
    document.getElementById("mall-parking").innerText = parkingSpots["Mall Parking"];
    document.getElementById("office-parking").innerText = parkingSpots["Office Parking"];

    document.getElementById("bookingTable").classList.remove("d-none");
}

// Delete booking and update slots
function deleteBooking(index) {
    let spot = bookings[index].spot;
    parkingSpots[spot]++; // Increase available slots
    bookings.splice(index, 1); // Remove booking
    updateBookings();
}

// Show all bookings
function showAllBookings() {
    document.getElementById("bookingTable").classList.toggle("d-none");
}
