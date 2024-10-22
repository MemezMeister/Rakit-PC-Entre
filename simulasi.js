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

      // Populate the GPU table with all available GPUs
      data.forEach(gpu => {
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
function getComponentRow(type) {
  const components = ['cpu', 'motherboard', 'ram', 'cpucooler', 'storage1', 'storage2', 'gpu', 'psu', 'case'];
  return components.indexOf(type) + 2; // The +2 is because the index starts at 0 and the table starts at the 2nd row
}
// Function to add GPU to the PC build list
function addToBuild(brand, manufacturer, model, price, link, wattage) {
  const gpuRow = document.querySelector('tr:nth-child(7)'); // You know GPU is in the 7th row

  if (!gpuRow) {
    console.error('Error: GPU row not found');
    return;
  }

  // Update the row with the GPU information
  gpuRow.innerHTML = `
    <td>GPU</td>
    <td>${brand} ${manufacturer} ${model}</td>
    <td>${price ? `RP ${price}` : 'N/A'}</td>
    <td>${link ? `<a href="${link}" target="_blank">Link</a>` : 'N/A'}</td>
    <td><button onclick="removeGpu(${wattage})">X</button></td>
  `;

  totalWattage += wattage;
  updateTotalWattageAndCompatibility();

  // Close the modal
  document.getElementById('gpuModal').style.display = 'none';
}

// Function to remove GPU from the build
function removeGpu(wattage) {
  const gpuRow = document.querySelector('tr:nth-child(7)'); // Ensure you're targeting the correct GPU row

  if (!gpuRow) {
    console.error('Error: GPU row not found');
    return;
  }

  // Reset the row content back to the "Pick your GPU" state
  gpuRow.innerHTML = `
    <td>GPU</td>
    <td><button id="gpuButton">Pick your GPU</button></td>
    <td>RP 0</td>
    <td><a href="#">Link</a></td>
    <td><button>X</button></td>
  `;

  // Decrease the total wattage
  totalWattage -= wattage;
  updateTotalWattageAndCompatibility();

  // Re-assign the event listener for the "Pick your GPU" button
  const gpuButton = document.getElementById('gpuButton');
  if (gpuButton) {
    gpuButton.onclick = openGpuModal;
  } else {
    console.error('Error: GPU button not found');
  }
}

// Function to update total wattage and compatibility status
function updateTotalWattageAndCompatibility() {
  const totalWattageEl = document.getElementById('total-wattage');
  const compatibilityStatusEl = document.getElementById('compatibility-status');

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
document.querySelectorAll('.close').forEach(btn => {
  btn.onclick = function() {
    const modal = document.getElementById('gpuModal');
    if (modal) {
      modal.style.display = 'none'; // Hide modal
    }
  };
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

// Initialize total wattage and compatibility elements
let totalWattage = 0; // Initialize total wattage

// Initialize event listener on page load
document.addEventListener('DOMContentLoaded', function() {
  const gpuButton = document.getElementById('gpuButton');
  if (gpuButton) {
    gpuButton.onclick = openGpuModal;
  }

  fetchGpus(); // Fetch GPU data on page load
});

// Fetch CPU data from PHP
function fetchCpus() {
  fetch('get_cpus.php')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      const cpuTableBody = document.querySelector('#cpu-table tbody');
      cpuTableBody.innerHTML = ''; // Clear the table

      data.forEach(cpu => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${cpu.brand}</td>
          <td>${cpu.line}</td>
          <td>${cpu.model}</td>
          <td>${cpu.socket}</td>
          <td>${cpu.p_cores}</td>
          <td>${cpu.e_cores}</td>
          <td>${cpu.threads}</td>
          <td>${cpu.base_speed} GHz</td>
          <td>${cpu.boost_speed} GHz</td>
          <td>${cpu.pcie_gen}</td>
          <td>${cpu.igpu}</td>
          <td>${cpu.wattage}W</td>
          <td>${cpu.memory_type}</td>
          <td>${cpu.max_memory_speed} MHz</td>
          <td>${cpu.cooler_included}</td>
          <td><button onclick="addToBuild('cpu', '${cpu.brand}', '${cpu.line} ${cpu.model}', ${cpu.wattage})">Add</button></td>
        `;
        cpuTableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching CPU data:', error));
}

// Function to open the CPU modal
function openCpuModal() {
  document.getElementById('cpuModal').style.display = 'block'; // Show CPU modal
}

// Function to close the modal
document.querySelectorAll('.close').forEach(closeBtn => {
  closeBtn.onclick = function () {
    const modal = this.closest('.modal');
    modal.style.display = 'none'; // Hide modal
  };
});

// Add event listeners for CPU and GPU buttons to open their respective modals

function searchCpu() {
  const input = document.getElementById('cpuSearch').value.toLowerCase();
  const cpuTableRows = document.querySelectorAll('#cpu-table tbody tr');

  cpuTableRows.forEach(row => {
      const rowText = row.textContent.toLowerCase();
      row.style.display = rowText.includes(input) ? '' : 'none'; // Show or hide rows based on search input
  });
}
// Function to add CPU to the PC build list
function addToBuild(type, brand, model, wattage) {
  const cpuRow = document.querySelector('tr:nth-child(2)'); // Targeting the 2nd row for CPU

  if (!cpuRow) {
    console.error('Error: CPU row not found');
    return;
  }

  // Update the row with the CPU information
  cpuRow.innerHTML = `
    <td>CPU</td>
    <td>${brand} ${model}</td>
    <td>RP 0</td>
    <td><a href="#">Link</a></td>
    <td><button onclick="removeComponent('${type}', ${wattage})">X</button></td>
  `;

  totalWattage += wattage; // Update total wattage with CPU wattage
  updateTotalWattageAndCompatibility();

  // Close the CPU modal
  document.getElementById('cpuModal').style.display = 'none';
}

// Function to remove the CPU from the build list
function removeComponent(type, wattage) {
  const cpuRow = document.querySelector('tr:nth-child(2)'); // Targeting the 2nd row for CPU

  if (!cpuRow) {
    console.error('Error: CPU row not found');
    return;
  }

  // Reset the row content back to the "Pick your CPU" state
  cpuRow.innerHTML = `
    <td>CPU</td>
    <td><button id="cpuButton">Pick your CPU</button></td>
    <td>RP 0</td>
    <td><a href="#">Link</a></td>
    <td><button>X</button></td>
  `;

  // Decrease the total wattage
  totalWattage -= wattage;
  updateTotalWattageAndCompatibility();

  // Re-assign the event listener for the "Pick your CPU" button
  document.getElementById('cpuButton').onclick = openCpuModal;
}

// Function to update total wattage and compatibility status
function updateTotalWattageAndCompatibility() {
  const totalWattageEl = document.getElementById('total-wattage');
  const compatibilityStatusEl = document.getElementById('compatibility-status');

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

// Fetch Motherboard data from PHP
function fetchMotherboards() {
  fetch('get_motherboards.php')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log("Received Motherboard data:", data); // Log the received data for debugging

      const motherboardTableBody = document.querySelector('#motherboard-table tbody');
      if (!motherboardTableBody) {
        console.error('Error: Motherboard table body not found!');
        return;
      }

      motherboardTableBody.innerHTML = ''; // Clear the table

      data.forEach(motherboard => {
        // Logic to determine the maximum number of NVMe slots available
        let nvmeSlots = 0;
        if (motherboard.nvme4) {
          nvmeSlots = 4;
        } else if (motherboard.nvme3) {
          nvmeSlots = 3;
        } else if (motherboard.nvme2) {
          nvmeSlots = 2;
        } else if (motherboard.nvme1) {
          nvmeSlots = 1;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${motherboard.brand}</td>
          <td>${motherboard.socket}</td>
          <td>${motherboard.chipset}</td>
          <td>${motherboard.name}</td>
          <td>${motherboard.form_factor}</td>
          <td>${motherboard.pcie_gen}</td>
          <td>${motherboard.bios_flashback ? 'Yes' : 'No'}</td>
          <td>${motherboard.ram_slots}</td>
          <td>${motherboard.ram_type}</td>
          <td>${motherboard.max_ram_capacity}</td>
          <td>${motherboard.sata_ports}</td>
          <td>${nvmeSlots}</td>  <!-- Display maximum NVMe slots -->
          <td>${motherboard.wifi ? 'Yes' : 'No'}</td>
          <td>${motherboard.audio}</td>
          <td>${motherboard.vcore_vrm}</td>
          <td><button onclick="addToBuild('motherboard', '${motherboard.brand}', '${motherboard.name}', ${motherboard.vcore_vrm})">Add</button></td>
        `;
        motherboardTableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching Motherboard data:', error));
}

// Function to add Motherboard to the PC build list
function addToBuild(type, brand, model, wattage) {
  let componentRow = document.querySelector(`tr:nth-child(${getComponentRow(type)})`); // Get the specific row based on component type
  componentRow.innerHTML = `
      <td>${type.toUpperCase()}</td>
      <td>${brand} ${model}</td>
      <td>RP 0</td>
      <td><a href="#">Link</a></td>
      <td><button onclick="removeComponent('${type}', ${wattage})">X</button></td>
  `;

  totalWattage += wattage;
  updateTotalWattageAndCompatibility();
  document.getElementById(`${type}Modal`).style.display = 'none'; // Close modal after adding
}

// Search function to filter Motherboard table based on user input
function searchMotherboard() {
  const input = document.getElementById('motherboardSearch').value.toLowerCase();
  const motherboardTableRows = document.querySelectorAll('#motherboard-table tbody tr');

  motherboardTableRows.forEach(row => {
      const motherboardData = row.textContent.toLowerCase();
      row.style.display = motherboardData.includes(input) ? '' : 'none';
  });
}

// Function to open the Motherboard modal
function openMotherboardModal() {
  document.getElementById('motherboardModal').style.display = 'block'; // Show modal
}

// Close modal if user clicks outside of it
window.onclick = function(event) {
  const modal = document.getElementById('motherboardModal');
  if (event.target === modal) {
      modal.style.display = 'none';
  }
};
// Fetch CPU Cooler data from PHP
// Fetch CPU Cooler data from PHP
function fetchCpuCoolers() {
  fetch('get_cpucoolers.php') // Assuming this PHP file exists to return CPU Cooler data
    .then(response => response.json())
    .then(data => {
      console.log("Received CPU Cooler data:", data); // Log the received data for debugging

      const cpuCoolerTableBody = document.querySelector('#cpucooler-table tbody'); // Correct ID
      if (!cpuCoolerTableBody) {
        console.error('Error: CPU Cooler table body not found!');
        return;
      }

      cpuCoolerTableBody.innerHTML = ''; // Clear the table

      data.forEach(cooler => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${cooler.manufacturer}</td>
          <td>${cooler.name}</td>
          <td>${cooler.heatpipes || 'N/A'}</td>
          <td>${cooler.height || 'N/A'} mm</td>
          <td>${cooler.tdp || 'N/A'} W</td>
          <td>${cooler.ram_clearance || 'N/A'}</td>
          <td>${cooler.am5 == 1 ? 'Yes' : 'No'}</td>
          <td>${cooler.am4 == 1 ? 'Yes' : 'No'}</td>
          <td>${cooler.LGA_1700 == 1 ? 'Yes' : 'No'}</td>
          <td>${cooler.LGA_1200 == 1 ? 'Yes' : 'No'}</td>
          <td><button onclick="addToBuild('cpucooler', '${cooler.manufacturer}', '${cooler.name}', ${cooler.tdp})">Add</button></td>
        `;
        cpuCoolerTableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching CPU Cooler data:', error));
}

// Search function to filter CPU Cooler table based on user input
function searchCpuCooler() {
  const input = document.getElementById('cpucoolerSearch').value.toLowerCase();
  const cpuCoolerTableRows = document.querySelectorAll('#cpucooler-table tbody tr');

  cpuCoolerTableRows.forEach(row => {
      const cpuCoolerData = row.textContent.toLowerCase();
      row.style.display = cpuCoolerData.includes(input) ? '' : 'none';
  });
}



// Function to open CPU Cooler modal
function openCpuCoolerModal() {
  document.getElementById('cpucoolerModal').style.display = 'block'; // Show modal
}

// Function to close modal if user clicks outside of it
window.onclick = function(event) {
  const modal = document.getElementById('cpucoolerModal');
  if (event.target === modal) {
      modal.style.display = 'none';
  }
};
// Fetch RAM data from PHP
function fetchRams() {
  fetch('get_rams.php') // Assuming this PHP file exists to return RAM data
    .then(response => response.json())
    .then(data => {
      console.log("Received RAM data:", data); // Log the received data for debugging

      const ramTableBody = document.querySelector('#ram-table tbody'); // Correct ID
      if (!ramTableBody) {
        console.error('Error: RAM table body not found!');
        return;
      }

      ramTableBody.innerHTML = ''; // Clear the table

      data.forEach(ram => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${ram.brand}</td>
          <td>${ram.model}</td>
          <td>${ram.memory_type}</td>
          <td>${ram.capacity}</td>
          <td>${ram.speed} MHz</td>
          <td>${ram.cas_latency}</td>
          <td>${ram.height_mm} mm</td>
          <td><button onclick="addToBuild('ram', '${ram.brand}', '${ram.model}', ${ram.speed})">Add</button></td>
        `;
        ramTableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching RAM data:', error));
}

// Function to open RAM modal
function openRamModal() {
  document.getElementById('ramModal').style.display = 'block'; // Show RAM modal
}

// Function to close RAM modal if user clicks outside of it
window.onclick = function(event) {
  const ramModal = document.getElementById('ramModal');
  if (event.target === ramModal) {
      ramModal.style.display = 'none';
  }
};
// Fetch Storage 1 data
function fetchStorage1() {
  fetch('get_storages.php') // Assuming this PHP file exists to return Storage 1 data
  .then(response => response.json())
  .then(data => {
      console.log("Received Storage 1 data:", data); // Log the received data for debugging

      const storage1TableBody = document.querySelector('#storage1-table tbody'); // Ensure correct ID
      if (!storage1TableBody) {
          console.error('Error: Storage 1 table body not found!');
          return;
      }

      storage1TableBody.innerHTML = ''; // Clear the table

      data.forEach(storage => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${storage.manufacturer}</td>
              <td>${storage.name}</td>
              <td>${storage.PCIE_gen}</td>
              <td>${storage.size}</td>
              <td>${storage.Read_speed} MB/s</td>
              <td>${storage.Write_speed} MB/s</td>
              <td>${storage.nand_type}</td>
              <td>${storage.dram_cache ? 'Yes' : 'No'}</td>
              <td>${storage.Controller}</td>
              <td><button onclick="addToBuild('storage1', '${storage.manufacturer}', '${storage.name}', ${storage.Read_speed})">Add</button></td>
          `;
          storage1TableBody.appendChild(row);
      });
  })
  .catch(error => console.error('Error fetching Storage 1 data:', error));
}

// Fetch Storage 2 data
function fetchStorage2() {
  fetch('get_storages.php') // Assuming this PHP file exists to return Storage 2 data
  .then(response => response.json())
  .then(data => {
      console.log("Received Storage 2 data:", data); // Log the received data for debugging

      const storage2TableBody = document.querySelector('#storage2-table tbody'); // Ensure correct ID
      if (!storage2TableBody) {
          console.error('Error: Storage 2 table body not found!');
          return;
      }

      storage2TableBody.innerHTML = ''; // Clear the table

      data.forEach(storage => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${storage.manufacturer}</td>
              <td>${storage.name}</td>
              <td>${storage.PCIE_gen}</td>
              <td>${storage.size}</td>
              <td>${storage.Read_speed} MB/s</td>
              <td>${storage.Write_speed} MB/s</td>
              <td>${storage.nand_type}</td>
              <td>${storage.dram_cache ? 'Yes' : 'No'}</td>
              <td>${storage.Controller}</td>
              <td><button onclick="addToBuild('storage2', '${storage.manufacturer}', '${storage.name}', ${storage.Read_speed})">Add</button></td>
          `;
          storage2TableBody.appendChild(row);
      });
  })
  .catch(error => console.error('Error fetching Storage 2 data:', error));
}

// Event listeners for storage buttons
document.getElementById('storage1Button').onclick = () => openStorageModal(1);
document.getElementById('storage2Button').onclick = () => openStorageModal(2);

// Open the correct modal based on storage number
function openStorageModal(storageNum) {
  document.getElementById(`storage${storageNum}Modal`).style.display = 'block'; // Show the correct modal
}

// Close modal if user clicks outside
window.onclick = function(event) {
  const modal1 = document.getElementById('storage1Modal');
  const modal2 = document.getElementById('storage2Modal');
  if (event.target === modal1 || event.target === modal2) {
      modal1.style.display = 'none';
      modal2.style.display = 'none';
  }
};

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('cpuButton').onclick = openCpuModal;
  document.getElementById('gpuButton').onclick = openGpuModal;
  document.getElementById('motherboardButton').onclick = openMotherboardModal;  
  document.getElementById('cpucoolerButton').onclick = openCpuCoolerModal;  
  document.getElementById('ramButton').onclick = openRamModal;
  
  // Correct storage button event handlers
  document.getElementById('storage1Button').onclick = () => openStorageModal(1);
  document.getElementById('storage2Button').onclick = () => openStorageModal(2);
  
  // Fetch data for all components
  fetchCpus();
  fetchGpus();
  fetchMotherboards();
  fetchCpuCoolers();
  fetchRams();
  fetchStorage1();
  fetchStorage2(); // Fetch data for Storage 1
});
// Updated storage modal opener to accept the storage number
function openStorageModal(storageNum) {
  document.getElementById(`storage${storageNum}Modal`).style.display = 'block'; // Show the correct modal based on storage number
}