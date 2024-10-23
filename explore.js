// Fetch and display prebuild PCs on the explore page
function fetchPrebuilds() {
    fetch('get_prebuilds.php') // Fetch prebuild data from the backend
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const prebuildList = document.getElementById('prebuild-list');
            prebuildList.innerHTML = '';

            // Check if data is not empty
            if (data.length === 0) {
                prebuildList.innerHTML = '<p>No prebuilds available.</p>';
                return;
            }

            // Dynamically create cards for each prebuild PC
            data.forEach(prebuild => {
                const imgSrc = `/Rakit-PC-Entre/Prebuilds/${encodeURIComponent(prebuild.pictures.trim())}`;
                const div = document.createElement('div');
                div.classList.add('prebuild-item');
                div.innerHTML = `
                    <h2>${prebuild.PCName}</h2>
                    <img src="${imgSrc}" alt="${prebuild.PCName}" class="prebuild-thumbnail" />
                    <p>Price: Rp ${prebuild.Price.toLocaleString('id-ID')}</p>
                    <button class="view-details-btn" onclick="viewDetails('${prebuild.PCName}')">View Details</button>
                `;
                prebuildList.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Error fetching prebuild data:', error);
            document.getElementById('prebuild-list').innerHTML = '<p>Failed to load prebuilds. Please try again later.</p>';
        });
}


// Redirect to details page
function viewDetails(pcName) {
    window.location.href = `details.html?pcName=${encodeURIComponent(pcName)}`;
}

// Fetch prebuilds when page loads
window.onload = fetchPrebuilds;
