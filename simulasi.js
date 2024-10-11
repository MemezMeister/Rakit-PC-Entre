// Fetch GPU data from PHP
function fetchGpus() {
  fetch('get_gpus.php') // Ensure this PHP file returns JSON data
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log("Received GPU data:", data); // Log the received data for debugging

      const gpuTableBody = document.querySelector('#gpu-table tbody');
      if (!gpuTableBody) {
        console.error('Error: GPU table body not found!');
        return;
      }

      gpuTableBody.innerHTML = ''; // Clear the table

      const manufacturers = new Set();
      const models = new Set();

      // Populate the GPU table with all available GPUs
      data.forEach(gpu => {
        manufacturers.add(gpu.manufacturer);
        models.add(gpu.model);

        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${gpu.brand}</td>
          <td>${gpu.manufacturer}</td>
          <td>${gpu.model} ${gpu.gpu_name ? gpu.gpu_name : ''}</td>
          <td>${gpu.wattage}W</td>
          <td>${gpu.connector_type}</td>
          <td>${gpu.length_mm || 'N/A'} mm</td>
          <td>${gpu.width_mm || 'N/A'} mm</td>
          <td>${gpu.height_mm || 'N/A'} mm</td>
          <td>${gpu.price ? `RP ${gpu.price}` : 'N/A'}</td>
          <td>${gpu.link ? `<a href="${gpu.link}" target="_blank">Link</a>` : 'N/A'}</td>
          <td><button onclick="addToBuild('${gpu.brand}', '${gpu.manufacturer}', '${gpu.model}', '${gpu.price}', '${gpu.link}', ${gpu.wattage})">Add</button></td>
        `;
        gpuTableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching GPU data:', error));
}

// Function to add GPU to the PC build list
function addToBuild(brand, manufacturer, model, price, link, wattage) {
  const gpuRow = document.querySelector('tr:nth-child(7)'); // The GPU row in the table
  gpuRow.innerHTML = `
    <td>GPU</td>
    <td>${brand} ${manufacturer} ${model}</td>
    <td>${price ? `RP ${price}` : 'N/A'}</td>
    <td>${link ? `<a href="${link}" target="_blank">Link</a>` : 'N/A'}</td>
    <td><button onclick="removeGpu(${wattage})">X</button></td>
  `;

  totalWattage += wattage;
  updateTotalWattageAndCompatibility();
  document.getElementById('gpuModal').style.display = 'none'; // Close modal after adding
}

// Function to remove GPU from the PC build list
function removeGpu(wattage) {
  const gpuRow = document.querySelector('tr:nth-child(7)'); // The GPU row in the table
  if (!gpuRow) {
    console.error('Error: GPU row not found!');
    return;
  }

  gpuRow.innerHTML = `
    <td>GPU</td>
    <td><button id="gpuButton">Pick your GPU</button></td>
    <td>RP 0</td>
    <td><a href="#">Link</a></td>
    <td><button>X</button></td>
  `;

  totalWattage -= wattage;
  updateTotalWattageAndCompatibility();
  document.getElementById('gpuButton').onclick = openGpuModal;
}

// Function to update total wattage and compatibility status
let totalWattage = 0; // Initialize total wattage
const totalWattageEl = document.getElementById('total-wattage');
const compatibilityStatusEl = document.getElementById('compatibility-status');

function updateTotalWattageAndCompatibility() {
  if (!totalWattageEl || !compatibilityStatusEl) {
    console.error('Error: Wattage or compatibility elements not found!');
    return;
  }

  totalWattageEl.textContent = `Total Wattage: ${totalWattage}W`;

  if (totalWattage < 500) {
    compatibilityStatusEl.textContent = 'Compatibility: Compatible';
    compatibilityStatusEl.className = 'compatible';
  } else if (totalWattage >= 500 && totalWattage < 800) {
    compatibilityStatusEl.textContent = 'Compatibility: Potential Issues';
    compatibilityStatusEl.className = 'potential-issues';
  } else {
    compatibilityStatusEl.textContent = 'Compatibility: Incompatible';
    compatibilityStatusEl.className = 'incompatible';
  }
}

// Function to open the modal
function openGpuModal() {
  const modal = document.getElementById('gpuModal');
  if (!modal) {
      console.error('Error: Modal element not found');
      return;
  }
  modal.style.display = 'block'; // Show modal
}

// Function to close the modal
document.querySelector('.close').onclick = function() {
  const modal = document.getElementById('gpuModal');
  if (modal) {
      modal.style.display = 'none'; // Hide modal
  }
};

// Add event listener to GPU button to open modal
document.addEventListener('DOMContentLoaded', function() {
  const gpuButton = document.getElementById('gpuButton');
  fetchGpus();
  if (gpuButton) {
      gpuButton.onclick = openGpuModal;
  } else {
      console.error('Error: GPU button not found');
  }
});

// Close modal if user clicks outside of it
window.onclick = function(event) {
  const modal = document.getElementById('gpuModal');
  if (event.target === modal) {
      modal.style.display = 'none';
  }
};

// Search function to filter GPU table based on user input
function searchGpu() {
  const input = document.getElementById('gpuSearch').value.toLowerCase();
  const gpuTableRows = document.querySelectorAll('#gpu-table tbody tr');

  gpuTableRows.forEach(row => {
    const gpuData = row.textContent.toLowerCase();
    row.style.display = gpuData.includes(input) ? '' : 'none';
  });
}
