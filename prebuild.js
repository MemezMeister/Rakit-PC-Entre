// Fetch prebuild data from the backend
function fetchPrebuilds() {
    fetch('get_prebuilds.php') // PHP script that returns JSON from Prebuild table
        .then(response => response.json())
        .then(data => {
            const prebuildTableBody = document.querySelector('#prebuild-table tbody');
            prebuildTableBody.innerHTML = ''; // Clear any existing table data

            // Populate the table with prebuild data
            data.forEach(prebuild => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${prebuild.PCName}</td>
                    <td>${prebuild.CPU}</td>
                    <td>${prebuild.Cooler}</td>
                    <td>${prebuild.Mobo}</td>
                    <td>${prebuild.Ram}</td>
                    <td>${prebuild.SSD}</td>
                    <td>${prebuild.PSU}</td>
                    <td>${prebuild.Casing}</td>
                    <td>${prebuild.GPU}</td>
                    <td>${prebuild.Peripheral}</td>
                    <td>Rp ${prebuild.Price}</td>
                    <td><button class="add-to-cart-btn" onclick="addToCart('${prebuild.PCName}', ${prebuild.Price})">Add to Cart</button></td>
                `;
                prebuildTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching prebuild data:', error));
}

// Function to add a prebuild to the cart
function addToCart(pcName, price) {
    alert(`Added ${pcName} to the cart at Rp ${price}`);
}

// Fetch prebuild data when the page loads
window.onload = fetchPrebuilds;
