// GLOBAL VARIABLES
let totalWattage = 0; // Total wattage for system build
let currentModal = null; // Track the currently open modal

// Function to open the CPU modal
function openCpuModal() {
  currentModal = document.getElementById('cpuModal');
  if (currentModal) {
    currentModal.style.display = 'block'; // Show CPU modal
  }
}

// Function to close modals
function closeModal() {
  if (currentModal) {
    currentModal.style.display = 'none'; // Hide current modal
    currentModal = null; // Reset the modal tracker
  }
}

// Add event listener to close the modal when clicking outside of it
window.onclick = function(event) {
  if (currentModal && event.target === currentModal) {
    closeModal(); // Close the modal if clicked outside
  }
};

// Event listener for CPU button to open the CPU modal
document.addEventListener('DOMContentLoaded', function () {
  const cpuButton = document.getElementById('cpuButton');
  if (cpuButton) {
    cpuButton.onclick = openCpuModal; // Attach event to open modal
  }

  // Fetch CPU data after page load
  fetchCpus();
});

// Function to fetch CPU data from PHP and populate the modal
// Function to fetch CPU data
function fetchCpus() {
  fetch('get_cpus.php') // Ensure this PHP file returns the correct JSON
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      const cpuTableBody = document.querySelector('#cpu-table tbody');
      cpuTableBody.innerHTML = ''; // Clear previous table data

      // Iterate through the CPU data and populate the modal table
      data.forEach(cpu => {
        const row = document.createElement('tr');
        // Ensure wattage is handled as a number and fallback to 0 if it's missing or invalid
        const wattage = parseFloat(cpu.wattage) || 0;

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
          <td>${wattage}W</td> <!-- Use the calculated wattage -->
          <td>${cpu.memory_type}</td>
          <td>${cpu.max_memory_speed} MHz</td>
          <td>${cpu.cooler_included}</td>
          <td><button onclick="addCpuToBuild('${cpu.brand}', '${cpu.model}', '${cpu.socket}', ${cpu.p_cores}, ${wattage},'${cpu.pcie_gen}' )">Add</button></td>
        `;
        cpuTableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching CPU data:', error));
}
let selectedMotherboardVCoreVRM = null
let selectedCpuCores = null
// Function to add CPU to the PC build and check compatibility
function addCpuToBuild(brand, model, socket, cores, wattage, pcie_gen) {
  const cpuRow = document.getElementById('cpuRow');
  if (!cpuRow) {
    console.error('Error: CPU row not found');
    return;
  }

  // Store the selected CPU socket and cores for compatibility check
  selectedCpuSocket = socket;
  selectedCpuCores = cores;
  selectedCpuPcieGen = pcie_gen; // Store the CPU core count

  // Update the row with the selected CPU data
  cpuRow.innerHTML = `
    <td>CPU</td>
    <td>${brand} ${model}</td>
    <td>RP 0</td>
    <td><a href="#">Link</a></td>
    <td><button onclick="removeCpu(${wattage})">X</button></td>
  `;

  // Update total wattage and close the modal
  totalWattage += wattage;
  console.log("Adding wattage: " + wattage + "W");
 updateTotalWattage();

  // Close the modal
  closeModal();

  // Check CPU and Motherboard compatibility after adding the CPU
performAllChecks();
}

// Function to remove CPU from the build
function removeCpu(wattage) {
  const cpuRow = document.getElementById('cpuRow'); // Target the CPU row directly

  if (!cpuRow) {
    console.error('Error: CPU row not found!');
    return;
  }

  // Reset the row to allow picking a new CPU
  cpuRow.innerHTML = `
    <td>CPU</td>
    <td><button id="cpuButton">Pick your CPU</button></td>
    <td>RP 0</td>
    <td><a href="#">Link</a></td>
    <td><button>X</button></td>
  `;

  // Subtract wattage and update compatibility
  totalWattage -= wattage;
  updateTotalWattage();

  // Re-attach the CPU button's event listener
  document.getElementById('cpuButton').onclick = openCpuModal;

  // Clear the selected CPU socket and core count since the CPU is removed
  selectedCpuSocket = null;
  selectedCpuPcieGen = null;
  selectedCpuCores = null; // Clear the CPU core count
  resetCompatibilityStatus();
  // Re-check compatibility after removing the CPU
performAllChecks();
}
function searchCpu() {
  const input = document.getElementById('cpuSearch').value.toLowerCase(); // Get the search input and convert it to lowercase
  const cpuTableRows = document.querySelectorAll('#cpu-table tbody tr'); // Get all rows from the CPU table

  cpuTableRows.forEach(row => {
    const rowText = row.textContent.toLowerCase(); // Get the text content of each row
    row.style.display = rowText.includes(input) ? '' : 'none'; // Show or hide the row based on whether it matches the input
  });
}

// Function to update total wattage and compatibility status
function updateTotalWattage() {
  const totalWattageEl = document.getElementById('total-wattage');
  
  // Update the total wattage display
  totalWattageEl.textContent = `Total Wattage: ${totalWattage}W`;
}

// Function to open the GPU modal
function openGpuModal() {
  currentModal = document.getElementById('gpuModal');
  if (currentModal) {
    currentModal.style.display = 'block'; // Show GPU modal
  }
}

// Function to fetch GPU data from PHP and populate the modal
let selectedGpuPcieGen = null; // Variable to store selected GPU PCIe Gen
let selectedGpuLength=null;
let selectedGpuBrand=null;  
function fetchGpus() {
  fetch('get_gpus.php') // Make sure this PHP file returns the correct JSON
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      const gpuTableBody = document.querySelector('#gpu-table tbody');
      gpuTableBody.innerHTML = ''; // Clear previous table data

      // Iterate through the GPU data and populate the modal table
      data.forEach(gpu => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${gpu.brand}</td>
          <td>${gpu.manufacturer}</td>
          <td>${gpu.model} ${gpu.gpu_name ? gpu.gpu_name : ''}</td>
          <td>${gpu.wattage}W</td>
          <td>${gpu.pcie_gen ? `PCIe Gen ${gpu.pcie_gen}` : 'N/A'}</td> <!-- Added PCIe Gen display -->
          <td>${gpu.connector_type}</td>
          <td>${gpu.length || 'N/A'} mm</td>
          <td>${gpu.width || 'N/A'} mm</td>
          <td>${gpu.height || 'N/A'} mm</td>
          <td>${gpu.price ? `RP ${gpu.price}` : 'N/A'}</td>
          <td>${gpu.link ? `<a href="${gpu.link}" target="_blank">Link</a>` : 'N/A'}</td>
          <td><button onclick="addGpuToBuild('${gpu.brand}', '${gpu.model}', ${gpu.wattage}, '${gpu.pcie_gen}',${gpu.length})">Add</button></td> <!-- Pass PCIe Gen -->
        `;
        gpuTableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching GPU data:', error));
}

// Function to add GPU to the PC build
function addGpuToBuild(brand, model, wattage, pcie_gen, length) {
  const gpuRow = document.getElementById('gpuRow'); // Target the GPU row directly

  if (!gpuRow) {
    console.error('Error: GPU row not found');
    return;
  }

  // Store the selected GPU PCIe generation
  selectedGpuPcieGen = pcie_gen;
  selectedGpuLength = length; 
  selectedGpuBrand = brand;

  // Update the row with the selected GPU data
  gpuRow.innerHTML = `
    <td>GPU</td>
    <td>${brand} ${model}</td>
    <td>RP 0</td>
    <td><a href="#">Link</a></td>
    <td><button onclick="removeGpu(${wattage})">X</button></td>
  `;

  // Update total wattage and close the modal
  totalWattage += wattage;
  updateTotalWattage();
  closeModal(); // Close the modal

  // Call PCIe compatibility check
performAllChecks();
}

// Function to remove GPU from the build
function removeGpu(wattage) {
  const gpuRow = document.getElementById('gpuRow'); // Target the GPU row directly

  if (!gpuRow) {
    console.error('Error: GPU row not found');
    return;
  }

  // Reset the row to allow picking a new GPU
  gpuRow.innerHTML = `
    <td>GPU</td>
    <td><button id="gpuButton">Pick your GPU</button></td>
    <td>RP 0</td>
    <td><a href="#">Link</a></td>
    <td><button>X</button></td>
  `;

  // Subtract wattage and update compatibility
  totalWattage -= wattage;
  updateTotalWattage();

  // Clear the selected GPU PCIe generation
  selectedGpuPcieGen = null;
  selectedGpuLength = null; 
  selectedGpuBrand = null;
  // Re-attach the GPU button's event listener
  document.getElementById('gpuButton').onclick = openGpuModal;

  // Re-check PCIe compatibility
  resetCompatibilityStatus();
performAllChecks();
}

// Add event listener to close the modal when clicking outside of it
window.onclick = function(event) {
  if (currentModal && event.target === currentModal) {
    closeModal(); // Close the modal if clicked outside
  }
};

// Initialize event listener on page load
document.addEventListener('DOMContentLoaded', function () {
  const gpuButton = document.getElementById('gpuButton');
  if (gpuButton) {
    gpuButton.onclick = openGpuModal; // Attach the modal open function
  }

  // Fetch GPU data after page load
  fetchGpus();
});
function searchGpu() {
  const input = document.getElementById('gpuSearch').value.toLowerCase(); // Get the search input and convert it to lowercase
  const gpuTableRows = document.querySelectorAll('#gpu-table tbody tr'); // Get all rows from the GPU table

  gpuTableRows.forEach(row => {
    const rowText = row.textContent.toLowerCase(); // Get the text content of each row
    row.style.display = rowText.includes(input) ? '' : 'none'; // Show or hide the row based on whether it matches the input
  });
}
// Helper function to get NVMe slots
function getNvmeSlots(motherboard) {
  if (motherboard.nvme4) {
    return 4;
  } else if (motherboard.nvme3) {
    return 3;
  } else if (motherboard.nvme2) {
    return 2;
  } else if (motherboard.nvme1) {
    return 1;
  } else {
    return 0;
  }
}
let selectedMotherboardWattage = null;
let selectedMotherboardFormFactor = null;
let selectedMotherboardRamType = null;

// Function to fetch motherboard data
function fetchMotherboards() {
  fetch('get_motherboards.php') // Ensure this PHP file returns JSON data
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      const motherboardTableBody = document.querySelector('#motherboard-table tbody');
      motherboardTableBody.innerHTML = ''; // Clear the table

      // Populate the Motherboard table with all available motherboards
      data.forEach(motherboard => {
        const row = document.createElement('tr');

        // Null check and form factor handling
        let formFactor = motherboard.form_factor ? motherboard.form_factor.toLowerCase() : 'unknown';
        let motherboardWattage = 0;

        // Determine the wattage based on form factor
        switch (formFactor) {
          case 'e-atx':
            motherboardWattage = 60; // E-ATX ~60W
            break;
          case 'atx':
            motherboardWattage = 50; // ATX ~50W
            break;
          case 'm-atx':
            motherboardWattage = 40; // mATX ~40W
            break;
          case 'itx':
            motherboardWattage = 30; // ITX ~30W
            break;
          default:
            motherboardWattage = 0; // Unknown form factor
            break;
        }

        // Ensure that vcore_vrm is fetched correctly
        const vcoreVRM = motherboard.vcore_vrm ? motherboard.vcore_vrm : 'N/A';

        row.innerHTML = `
          <td>${motherboard.brand}</td>
          <td>${motherboard.socket}</td>
          <td>${motherboard.chipset}</td>
          <td>${motherboard.name}</td>
          <td>${motherboard.form_factor ? motherboard.form_factor : 'N/A'}</td>
          <td>${motherboard.pcie_gen}</td>
          <td>${motherboard.bios_flashback ? 'Yes' : 'No'}</td>
          <td>${motherboard.ram_slots}</td>
          <td>${motherboard.ram_type}</td>
          <td>${motherboard.max_ram_capacity}</td>
          <td>${motherboard.sata_ports}</td>
          <td>${getNvmeSlots(motherboard)}</td>
          <td>${motherboard.wifi ? 'Yes' : 'No'}</td>
          <td>${motherboard.audio}</td>
          <td>${vcoreVRM}</td>
          <td><button onclick="addMotherboardToBuild('${motherboard.brand}', '${motherboard.name}', '${motherboard.socket}', ${vcoreVRM}, '${motherboard.form_factor}', ${motherboardWattage},'${motherboard.pcie_gen}' ,'${motherboard.ram_type}')">Add</button></td>
        `;
        motherboardTableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching Motherboard data:', error));
}
// Function to add motherboard to the PC build and check compatibility
function addMotherboardToBuild(brand, name, socket, vcoreVRM, formFactor, wattage, pcie_gen,ram_type) {
  const motherboardRow = document.getElementById('motherboardRow');

  if (!motherboardRow) {
    console.error('Error: Motherboard row not found');
    return;
  }

  // Log to check what wattage is being passed
  console.log("Adding motherboard with wattage: ", wattage, "W");

  // Store the selected motherboard socket and VRM count for compatibility check
  selectedMotherboardSocket = socket;
  selectedMotherboardVCoreVRM = vcoreVRM;
  selectedMotherboardPcieGen = pcie_gen;  // Store the VCore VRM count
  selectedMotherboardFormFactor = formFactor;
  selectedMotherboardRamType= ram_type;
  // Add motherboard details to the row
  motherboardRow.innerHTML = `
    <td>Motherboard</td>
    <td>${brand} ${name}</td>
    <td>RP 0</td>
    <td><a href="#">Link</a></td>
    <td><button onclick="removeMotherboard(${wattage})">X</button></td>
  `;

  // Update wattage and compatibility
  totalWattage += wattage;
  updateTotalWattage();
performAllChecks();
  
  document.getElementById('motherboardModal').style.display = 'none'; // Close modal after adding
}


// Function to remove the motherboard and adjust wattage
function removeMotherboard(wattage) {
  const motherboardRow = document.getElementById('motherboardRow');

  if (!motherboardRow) {
    console.error('Error: Motherboard row not found!');
    return;
  }

  // Reset the row content back to "Pick your Motherboard"
  motherboardRow.innerHTML = `
    <td>Motherboard</td>
    <td><button id="motherboardButton">Pick your Motherboard</button></td>
    <td>RP 0</td>
    <td><a href="#">Link</a></td>
    <td><button>X</button></td>
  `;

  // Update wattage and compatibility
  totalWattage -= wattage;
  updateTotalWattage();

  // Re-attach the motherboard button's event listener
  document.getElementById('motherboardButton').onclick = openMotherboardModal;

  // Clear the selected motherboard socket and VRM since it's removed
  selectedMotherboardSocket = null;
  selectedMotherboardPcieGen = null;
  selectedMotherboardVCoreVRM = null;
  selectedMotherboardFormFactor = null;
  selectedMotherboardRamType=null; // Clear the VRM value
  resetCompatibilityStatus();
  // Re-check compatibility after removing the motherboard
  performAllChecks();
}


// Function to open the Motherboard modal
function openMotherboardModal() {
  const modal = document.getElementById('motherboardModal');
  if (!modal) {
    console.error('Error: Modal element not found');
    return;
  }
  modal.style.display = 'block'; // Show modal
}

// Function to close the modal when user clicks outside
window.onclick = function(event) {
  const modal = document.getElementById('motherboardModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Function to close the modal
document.querySelectorAll('.close').forEach(closeBtn => {
  closeBtn.onclick = function () {
    const modal = this.closest('.modal');
    modal.style.display = 'none'; // Hide modal
  };
});

// Initialize event listener on page load
document.addEventListener('DOMContentLoaded', function() {
  const motherboardButton = document.getElementById('motherboardButton');
  if (motherboardButton) {
    motherboardButton.onclick = openMotherboardModal;
  }

  fetchMotherboards(); // Fetch motherboard data on page load
});

// Search function for Motherboard
function searchMotherboard() {
  const input = document.getElementById('motherboardSearch').value.toLowerCase(); // Get the search input and convert it to lowercase
  const motherboardTableRows = document.querySelectorAll('#motherboard-table tbody tr'); // Get all rows from the Motherboard table

  motherboardTableRows.forEach(row => {
    const rowText = row.textContent.toLowerCase(); // Get the text content of each row
    row.style.display = rowText.includes(input) ? '' : 'none'; // Show or hide the row based on whether it matches the input
  });
}
// Function to fetch CPU coolers from the database and populate the modal
function fetchCpuCoolers() {
  fetch('get_cpucoolers.php') // Assuming this PHP file exists to return CPU Cooler data
    .then(response => response.json())
    .then(data => {
      const cpuCoolerTableBody = document.querySelector('#cpucooler-table tbody');
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
          <td><button onclick="addCpuCoolerToBuild('${cooler.manufacturer}', '${cooler.name}', ${cooler.am5}, ${cooler.am4}, ${cooler.LGA_1700}, ${cooler.LGA_1200}, ${cooler.height},${cooler.ram_clearance})">Add</button></td>
        `;
        cpuCoolerTableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching CPU cooler data:', error));
}
let selectedCoolerHeight = null;
let selectedCoolerSupportedSockets = null;
let selectedCpuCoolerClearance =null;
// Function to add a CPU cooler to the PC build
function addCpuCoolerToBuild(manufacturer, name, am5, am4, lga1700, lga1200, height, ram_clearance) {
  const cpucoolerRow = document.getElementById('cpucoolerRow');

  if (!cpucoolerRow) {
    console.error('Error: CPU cooler row not found!');
    return;
  }

  // Update the row with the selected CPU cooler
  cpucoolerRow.innerHTML = `
    <td>CPU Cooler</td>
    <td>${manufacturer} ${name}</td>
    <td>RP 0</td>
    <td><a href="#">Link</a></td>
    <td><button onclick="removeCpuCooler()">X</button></td>
  `;

  // Store selected cooler height and socket compatibility for checking
  selectedCoolerHeight = height;
  selectedCoolerSupportedSockets = { am5, am4, lga1700, lga1200 };
  selectedCpuCoolerClearance =ram_clearance;

  document.getElementById('cpucoolerModal').style.display = 'none'; // Close the modal

  // Perform all checks including cooler compatibility
  performAllChecks();
}

// Function to remove a CPU cooler from the PC build
function removeCpuCooler(heatpipes) {
  const cpuCoolerRow = document.getElementById('cpucoolerRow');

  if (!cpuCoolerRow) {
    console.error('Error: CPU cooler row not found!');
    return;
  }

  // Reset the row content back to the "Pick your CPU cooler" state
  cpuCoolerRow.innerHTML = `
    <td>CPU Cooler</td>
    <td><button id="cpucoolerButton">Pick your CPU Cooler</button></td>
    <td>RP 0</td>
    <td><a href="#">Link</a></td>
    <td><button>X</button></td>
  `;

  // Ensure that heatpipes is defined and is a valid string before calling toLowerCase
  let wattageToRemove = 0;
  
  if (typeof heatpipes === 'string' && heatpipes.toLowerCase() === "aio") {
    wattageToRemove = 20; // AIO cooler removes 20W
  } else if (!isNaN(parseInt(heatpipes))) {
    wattageToRemove = 10; // Air cooler with heatpipes removes 10W
  }

  // Update total wattage and compatibility
  totalWattage -= wattageToRemove;
  updateTotalWattage();

  // Reset cooler-specific compatibility checks
  selectedCoolerHeight = null;
  selectedCoolerSupportedSockets = null;
  selectedCpuCoolerClearance = null;

  // Re-assign the event listener for the "Pick your CPU cooler" button
  const cpuCoolerButton = document.getElementById('cpucoolerButton');
  if (cpuCoolerButton) {
    cpuCoolerButton.onclick = openCpuCoolerModal;
  } else {
    console.error('Error: CPU cooler button not found');
  }

  resetCompatibilityStatus();
  performAllChecks();
}



// Function to open the CPU cooler modal
function openCpuCoolerModal() {
  document.getElementById('cpucoolerModal').style.display = 'block'; // Show CPU cooler modal
}

// Function to close the modal
document.querySelectorAll('.close').forEach(closeBtn => {
  closeBtn.onclick = function () {
    const modal = this.closest('.modal');
    modal.style.display = 'none'; // Hide modal
  };
});

// Search function to filter CPU cooler table based on user input (case-insensitive)
function searchCpuCooler() {
  const input = document.getElementById('cpucoolerSearch').value.toLowerCase(); // Convert search input to lowercase
  const cpuCoolerTableRows = document.querySelectorAll('#cpucooler-table tbody tr');

  cpuCoolerTableRows.forEach(row => {
    const rowText = row.textContent.toLowerCase(); // Convert row text to lowercase for case-insensitive comparison
    row.style.display = rowText.includes(input) ? '' : 'none'; // Show or hide rows based on search input
  });
}

// Initialize event listener on page load
document.addEventListener('DOMContentLoaded', function() {
  const cpucoolerButton = document.getElementById('cpucoolerButton');
  if (cpucoolerButton) {
    cpucoolerButton.onclick = openCpuCoolerModal;
  }

  fetchCpuCoolers(); // Fetch CPU cooler data on page load
});
// Function to fetch RAMs from the database and populate the modal
function fetchRams() {
  fetch('get_rams.php') // Assuming this PHP file exists to return RAM data
    .then(response => response.json())
    .then(data => {
      const ramTableBody = document.querySelector('#ram-table tbody');
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
          <td>${ram.speed}</td>
          <td>${ram.cas_latency}</td>
          <td>${ram.height_mm} mm</td>
          <td><button onclick="addRamToBuild('${ram.brand}', '${ram.model} (${ram.capacity}) (${ram.speed})', '${ram.memory_type}', '${ram.capacity}',${ram.height_mm})">Add</button></td>
        `;
        ramTableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching RAM data:', error));
}

// Function to calculate RAM wattage based on memory type and capacity
function calculateRamWattage(memoryType, capacity) {
  // Convert capacity from "2x8GB" or "16GB" format to just the total number of GB
  let totalCapacity = 0;
  const match = capacity.match(/(\d+)x(\d+)/); // Matches "2x8GB" or similar
  if (match) {
    totalCapacity = parseInt(match[1]) * parseInt(match[2]); // Calculate total capacity
  } else {
    totalCapacity = parseInt(capacity); // If no "x", just parse the capacity directly
  }

  // Apply wattage logic based on DDR type and capacity
  let wattage = 0;
  if (memoryType.toLowerCase() === "ddr4") {
    if (totalCapacity <= 16) {
      wattage = 3; // DDR4 <= 16GB uses 3W
    } else if (totalCapacity <= 32) {
      wattage = 4; // DDR4 32GB uses 4W
    } else {
      wattage = 5; // DDR4 > 32GB uses 5W
    }
  } else if (memoryType.toLowerCase() === "ddr5") {
    if (totalCapacity <= 16) {
      wattage = 4; // DDR5 <= 16GB uses 4W
    } else if (totalCapacity <= 32) {
      wattage = 5; // DDR5 32GB uses 5W
    } else {
      wattage = 6; // DDR5 > 32GB uses 6W
    }
  }

  return wattage;
}
let selectedRamType=null;
let selectedRamHeight=null;
// Function to add RAM to the PC build
function addRamToBuild(brand, model, memoryType, capacity, height_mm) {
  const ramRow = document.getElementById('ramRow');
  if (!ramRow) {
    console.error('Error: RAM row not found!');
    return;
  }

  // Calculate wattage based on memory type and capacity
  const wattageToAdd = calculateRamWattage(memoryType, capacity);
  selectedRamType=memoryType;
  selectedRamHeight=height_mm;
  // Update the row with the RAM information, including capacity and speed in the model name
  ramRow.innerHTML = `
    <td>RAM</td>
    <td>${brand} ${model}</td>
    <td>RP 0</td>
    <td><a href="#">Link</a></td>
    <td><button onclick="removeRam('${memoryType}', '${capacity}', ${wattageToAdd})">X</button></td>
  `;

  totalWattage += wattageToAdd; // Add wattage to total wattage
 updateTotalWattage();

  document.getElementById('ramModal').style.display = 'none'; // Close modal after adding
 
  performAllChecks();
}

// Function to remove RAM from the PC build
function removeRam(memoryType, capacity,wattageToRemove) {
  const ramRow = document.getElementById('ramRow');

  if (!ramRow) {
    console.error('Error: RAM row not found!');
    return;
  }
wattageToRemove=calculateRamWattage(memoryType,capacity);
  // Reset the row content back to the "Pick your RAM" state
  ramRow.innerHTML = `
    <td>RAM</td>
    <td><button id="ramButton">Pick your RAM</button></td>
    <td>RP 0</td>
    <td><a href="#">Link</a></td>
    <td><button>X</button></td>
  `;
  resetCompatibilityStatus();
  totalWattage -= wattageToRemove; // Subtract the wattage
 updateTotalWattage();
 selectedRamType=null;
 selectedRamHeight=null;
  // Re-assign the event listener for the "Pick your RAM" button
  const ramButton = document.getElementById('ramButton');
  if (ramButton) {
    ramButton.onclick = openRamModal;
  } else {
    console.error('Error: RAM button not found');
  }

  performAllChecks();
}

// Function to open the RAM modal
function openRamModal() {
  document.getElementById('ramModal').style.display = 'block'; // Show RAM modal
}

// Function to close the modal
document.querySelectorAll('.close').forEach(closeBtn => {
  closeBtn.onclick = function () {
    const modal = this.closest('.modal');
    modal.style.display = 'none'; // Hide modal
  };
});

// Search function to filter RAM table based on user input (case-insensitive)
function searchRam() {
  const input = document.getElementById('ramSearch').value.toLowerCase(); // Convert search input to lowercase
  const ramTableRows = document.querySelectorAll('#ram-table tbody tr');

  ramTableRows.forEach(row => {
    const rowText = row.textContent.toLowerCase(); // Convert row text to lowercase for case-insensitive comparison
    row.style.display = rowText.includes(input) ? '' : 'none'; // Show or hide rows based on search input
  });
}

// Initialize event listener on page load
document.addEventListener('DOMContentLoaded', function() {
  const ramButton = document.getElementById('ramButton');
  if (ramButton) {
    ramButton.onclick = openRamModal;
  }

  fetchRams(); // Fetch RAM data on page load
});
// Function to calculate storage power consumption
// Function to calculate storage power consumption
function calculateStorageWattage(pcie_gen, size) {
  let wattage = 0;

  // Determine wattage based on PCIe generation
  switch (pcie_gen) {
    case 'PCIe 3.0':
      if (size.includes('512GB') || size.includes('1TB')) {
        wattage = 3;
      } else if (size.includes('2TB') || size.includes('4TB')) {
        wattage = 5;
      } else if (size.includes('8TB')) {
        wattage = 7;
      }
      break;

    case 'PCIe 4.0':
      if (size.includes('512GB') || size.includes('1TB')) {
        wattage = 5;
      } else if (size.includes('2TB') || size.includes('4TB')) {
        wattage = 7;
      } else if (size.includes('8TB')) {
        wattage = 9;
      }
      break;

    case 'PCIe 5.0':
      if (size.includes('512GB') || size.includes('1TB')) {
        wattage = 7;
      } else if (size.includes('2TB') || size.includes('4TB')) {
        wattage = 9;
      } else if (size.includes('8TB')) {
        wattage = 12;
      }
      break;

    default:
      // For 2.5" SATA SSDs (assuming other cases)
      if (size.includes('512GB') || size.includes('1TB')) {
        wattage = 2;
      } else if (size.includes('2TB') || size.includes('4TB')) {
        wattage = 3;
      } else if (size.includes('8TB')) {
        wattage = 4;
      }
      break;
  }

  return wattage;
}
function openStorageModal(storageType) {
  const modal = document.getElementById(`${storageType}Modal`);
  if (!modal) {
    console.error(`Error: ${storageType}Modal not found!`);
    return;
  }
  modal.style.display = 'block'; // Show the respective storage modal
}
// Fetch Storage 1 data
function fetchStorage1() {
  fetch('get_storages.php')
    .then(response => response.json())
    .then(data => {
      const storage1TableBody = document.querySelector('#storage1-table tbody');
      if (!storage1TableBody) {
        console.error('Error: Storage 1 table body not found!');
        return;
      }

      storage1TableBody.innerHTML = ''; // Clear the table

      data.forEach(storage => {
        // Set NAND type and Controller to "Unknown" if they are null or empty
        const nandType = storage.nand_type ? storage.nand_type : 'Unknown';
        const controller = storage.Controller ? storage.Controller : 'Unknown';

        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${storage.manufacturer}</td>
          <td>${storage.name}</td>
          <td>${storage.PCIE_gen}</td>
          <td>${storage.size}</td>
          <td>${storage.Read_speed} MB/s</td>
          <td>${storage.Write_speed} MB/s</td>
          <td>${nandType}</td>
          <td>${storage.dram_cache ? 'Yes' : 'No'}</td>
          <td>${controller}</td>
          <td><button onclick="addStorageToBuild('storage1', '${storage.manufacturer}', '${storage.name}', '${storage.PCIE_gen}', '${storage.size}')">Add</button></td>
        `;
        storage1TableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching Storage 1 data:', error));
}

// Fetch Storage 2 data
function fetchStorage2() {
  fetch('get_storages.php')
    .then(response => response.json())
    .then(data => {
      const storage2TableBody = document.querySelector('#storage2-table tbody');
      if (!storage2TableBody) {
        console.error('Error: Storage 2 table body not found!');
        return;
      }

      storage2TableBody.innerHTML = ''; // Clear the table

      data.forEach(storage => {
        // Set NAND type and Controller to "Unknown" if they are null or empty
        const nandType = storage.nand_type ? storage.nand_type : 'Unknown';
        const controller = storage.Controller ? storage.Controller : 'Unknown';

        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${storage.manufacturer}</td>
          <td>${storage.name}</td>
          <td>${storage.PCIE_gen}</td>
          <td>${storage.size}</td>
          <td>${storage.Read_speed} MB/s</td>
          <td>${storage.Write_speed} MB/s</td>
          <td>${nandType}</td>
          <td>${storage.dram_cache ? 'Yes' : 'No'}</td>
          <td>${controller}</td>
          <td><button onclick="addStorageToBuild('storage2', '${storage.manufacturer}', '${storage.name}', '${storage.PCIE_gen}', '${storage.size}')">Add</button></td>
        `;
        storage2TableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching Storage 2 data:', error));
}
// Function to add storage to the PC build
function addStorageToBuild(storageType, manufacturer, name, pcieGen, size) {
  const storageRow = document.getElementById(`${storageType}Row`);

  if (!storageRow) {
    console.error(`Error: ${storageType} row not found!`);
    return;
  }

  // Calculate the wattage based on the storage type and size
  const wattageToAdd = getStorageWattage(pcieGen, size);

  // Update the row with the storage information
  storageRow.innerHTML = `
    <td>${storageType === 'storage1' ? 'Storage 1' : 'Storage 2'}</td>
    <td>${manufacturer} ${name} (${pcieGen}) (${size})</td>
    <td>RP 0</td>
    <td><a href="#">Link</a></td>
    <td><button onclick="removeStorage('${storageType}', ${wattageToAdd})">X</button></td>
  `;

  // Update the total wattage and compatibility
  totalWattage += wattageToAdd;
 updateTotalWattage();

  // Close the modal after adding
  document.getElementById(`${storageType}Modal`).style.display = 'none';
}

// Function to remove storage from the PC build
function removeStorage(storageType, wattageToRemove) {
  const storageRow = document.getElementById(`${storageType}Row`);

  if (!storageRow) {
    console.error(`Error: ${storageType} row not found!`);
    return;
  }

  // Reset the row content back to the "Pick your Storage" state
  storageRow.innerHTML = `
    <td>${storageType === 'storage1' ? 'Storage 1' : 'Storage 2'}</td>
    <td><button id="${storageType}Button">Pick your ${storageType === 'storage1' ? 'Storage 1' : 'Storage 2'}</button></td>
    <td>RP 0</td>
    <td><a href="#">Link</a></td>
    <td><button>X</button></td>
  `;

  // Decrease the total wattage and update compatibility
  totalWattage -= wattageToRemove;
 updateTotalWattage();

  // Re-assign the event listener for the "Pick your Storage" button
  const storageButton = document.getElementById(`${storageType}Button`);
  if (storageButton) {
    storageButton.onclick = () => openStorageModal(storageType);
  } else {
    console.error(`Error: ${storageType} button not found`);
  }
}

// Function to open the storage modal
function openStorageModal(storageType) {
  document.getElementById(`${storageType}Modal`).style.display = 'block'; // Show the correct modal for Storage 1 or Storage 2
}

// Function to close the modal
document.querySelectorAll('.close').forEach(closeBtn => {
  closeBtn.onclick = function () {
    const modal = this.closest('.modal');
    modal.style.display = 'none'; // Hide modal
  };
});
function getStorageWattage(pcieGen, size) {
  const sizeInGb = parseInt(size.replace(/\D/g, '')); // Extract numerical size value

  if (pcieGen.includes('5.0')) {
    return sizeInGb >= 1000 ? 9 : 7; // PCIe 5.0: >=1TB -> 9W, otherwise -> 7W
  } else if (pcieGen.includes('4.0')) {
    return sizeInGb >= 1000 ? 8 : 6; // PCIe 4.0: >=1TB -> 8W, otherwise -> 6W
  } else if (pcieGen.includes('3.0')) {
    return sizeInGb >= 1000 ? 6 : 5; // PCIe 3.0: >=1TB -> 6W, otherwise -> 5W
  } else {
    // Assume for 2.5" drives or unknown types
    return sizeInGb >= 1000 ? 5 : 3; // For >=1TB -> 5W, otherwise -> 3W
  }
}

// Initialize event listener on page load
document.addEventListener('DOMContentLoaded', function() {
  const storage1Button = document.getElementById('storage1Button');
  const storage2Button = document.getElementById('storage2Button');

  if (storage1Button) {
    storage1Button.onclick = () => openStorageModal('storage1');
  }

  if (storage2Button) {
    storage2Button.onclick = () => openStorageModal('storage2');
  }

  fetchStorage1(); // Fetch storage1 data on page load
  fetchStorage2(); // Fetch storage2 data on page load
});

// Function to fetch PSUs from the database and populate the PSU modal
function fetchPsus() {
  fetch('get_psus.php') // Assuming this PHP file exists to return PSU data
    .then(response => response.json())
    .then(data => {
      const psuTableBody = document.querySelector('#psu-table tbody');
      if (!psuTableBody) {
        console.error('Error: PSU table body not found!');
        return;
      }

      psuTableBody.innerHTML = ''; // Clear the table

      data.forEach(psu => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${psu.manufacturer}</td>
          <td>${psu.name}</td>
          <td>${psu.wattage} W</td>
          <td>${psu.efficiency_rating || 'Unknown'}</td>
          <td>${psu.form_factor}</td>
          <td>${psu.type || 'Unknown'}</td>
          <td>${psu.Length || 'Unknown'} mm</td> <!-- PSU Length -->
          <td>${psu.PSU_Tierlist || 'Unknown'}</td> <!-- PSU Tier List -->
          <td><button onclick="addPsuToBuild('${psu.manufacturer}', '${psu.name}', ${psu.wattage}, '${psu.form_factor}', ${psu.Length})">Add</button></td>
        `;
        psuTableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching PSU data:', error));
}

let selectedPsuWattage=null;
// Function to add a PSU to the PC build
function addPsuToBuild(manufacturer, name, wattage, formFactor, length) {
  const psuRow = document.getElementById('psuRow');

  if (!psuRow) {
    console.error('Error: PSU row not found!');
    return;
  }

  // Update the row with the PSU information
  psuRow.innerHTML = `
    <td>PSU</td>
    <td>${manufacturer} ${name}</td>
    <td>RP 0</td>
    <td><a href="#">Link</a></td>
    <td><button onclick="removePsu()">X</button></td>
  `;

  // Store the selected PSU form factor and length for compatibility checks
  selectedPsuFormFactor = formFactor;
  selectedPsuLength = length;
  selectedPsuWattage=wattage;
  // Perform all compatibility checks after adding the PSU
  performAllChecks();

  // Close the modal after adding
  document.getElementById('psuModal').style.display = 'none';
}



// Function to remove a PSU from the PC build
function removePsu(wattage) {
  const psuRow = document.getElementById('psuRow');

  if (!psuRow) {
    console.error('Error: PSU row not found!');
    return;


    
  }

  // Reset the row content back to the "Pick your PSU" state
  psuRow.innerHTML = `
    <td>PSU</td>
    <td><button id="psuButton">Pick your PSU</button></td>
    <td>RP 0</td>
    <td><a href="#">Link</a></td>
    <td><button>X</button></td>
  `;


  // Re-assign the event listener for the "Pick your PSU" button
  const psuButton = document.getElementById('psuButton');
  if (psuButton) {
    psuButton.onclick = openPsuModal;
  } else {
    console.error('Error: PSU button not found');
  }
  selectedPsuFormFactor = null;
  selectedPsuLength = null;
  selectedPsuWattage=null;
  resetCompatibilityStatus();
  performAllChecks();
}


// Function to open the PSU modal
function openPsuModal() {
  document.getElementById('psuModal').style.display = 'block'; // Show PSU modal
}

// Function to close the modal
document.querySelectorAll('.close').forEach(closeBtn => {
  closeBtn.onclick = function () {
    const modal = this.closest('.modal');
    modal.style.display = 'none'; // Hide modal
  };
});

// Search function to filter PSU table based on user input (case-insensitive)
function searchPsu() {
  const input = document.getElementById('psuSearch').value.toLowerCase(); // Convert search input to lowercase
  const psuTableRows = document.querySelectorAll('#psu-table tbody tr');

  psuTableRows.forEach(row => {
    const rowText = row.textContent.toLowerCase(); // Convert row text to lowercase for case-insensitive comparison
    row.style.display = rowText.includes(input) ? '' : 'none'; // Show or hide rows based on search input
  });
}

// Initialize event listener on page load
document.addEventListener('DOMContentLoaded', function() {
  const psuButton = document.getElementById('psuButton');
  if (psuButton) {
    psuButton.onclick = openPsuModal;
  }

  fetchPsus(); // Fetch PSU data on page load
});
// Function to fetch case data from the database and populate the modal
let selectedPsuFormFactor = null;
let selectedPsuLength = null;
let selectedCasePsuFormFactor = null;
let selectedCaseMaxPsuLength = null;
let selectedCaseFormFactor = null;
let selectedCaseMaxGpuLength=null;
function fetchCases() {
  fetch('get_cases.php') // Assuming this PHP file returns JSON data for cases
    .then(response => response.json())
    .then(data => {
      const caseTableBody = document.querySelector('#case-table tbody');
      if (!caseTableBody) {
        console.error('Error: Case table body not found!');
        return;
      }

      caseTableBody.innerHTML = ''; // Clear the table

      data.forEach(caseItem => {
        // Combine PSU form factors into a single field
        const psuFormFactors = [];
        if (caseItem.PSU_SFX == 1) psuFormFactors.push('SFX');
        if (caseItem.PSU_SFX_L == 1) psuFormFactors.push('SFX-L');
        if (caseItem.PSU_ATX == 1) psuFormFactors.push('ATX');
        if (caseItem.PSU_E_ATX == 1) psuFormFactors.push('E-ATX');

        // Combine AIO support into a single field
        const aioSupport = [];
        if (caseItem.AIO_120 == 1) aioSupport.push('120mm');
        if (caseItem.AIO_140 == 1) aioSupport.push('140mm');
        if (caseItem.AIO_240 == 1) aioSupport.push('240mm');
        if (caseItem.AIO_280 == 1) aioSupport.push('280mm');
        if (caseItem.AIO_360 == 1) aioSupport.push('360mm');
        if (caseItem.AIO_420 == 1) aioSupport.push('420mm');

        // Combine motherboard support into a single field
        const motherboardSupport = [];
        if (caseItem.motherboard_itx == 1) motherboardSupport.push('ITX');
        if (caseItem.motherboard_matx == 1) motherboardSupport.push('M-ATX');
        if (caseItem.motherboard_atx == 1) motherboardSupport.push('ATX');
        if (caseItem.motherboard_e_atx == 1) motherboardSupport.push('E-ATX');
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${caseItem.manufacturer}</td>
          <td>${caseItem.name}</td>
          <td>${caseItem.case_height ? caseItem.case_height + ' mm' : 'N/A'}</td>
          <td>${caseItem.case_width ? caseItem.case_width + ' mm' : 'N/A'}</td>
          <td>${caseItem.case_length ? caseItem.case_length + ' mm' : 'N/A'}</td>
          <td>${caseItem.volume ? caseItem.volume + ' L' : 'N/A'}</td>
          <td>${psuFormFactors.length ? psuFormFactors.join(', ') : 'N/A'}</td>
          <td>${caseItem.max_psu_length ? caseItem.max_psu_length + ' mm' : 'N/A'}</td>
          <td>${caseItem.warning ? caseItem.warning : 'No warning'}</td> <!-- Added warning field -->
          <td>${caseItem.max_cpu_height ? caseItem.max_cpu_height + ' mm' : 'N/A'}</td>
          <td>${aioSupport.length ? aioSupport.join(', ') : 'N/A'}</td>
          <td>${caseItem.max_gpu_length ? caseItem.max_gpu_length + ' mm' : 'N/A'}</td>
          <td>${motherboardSupport.length ? motherboardSupport.join(', ') : 'N/A'}</td>
          <td>${caseItem.max_2_5_drives ? caseItem.max_2_5_drives : 'N/A'}</td>
   
          <td><button onclick="addCaseToBuild('${caseItem.manufacturer}', '${caseItem.name}',${caseItem.volume}, '${motherboardSupport.join(', ')}', '${psuFormFactors.join(', ')}', ${caseItem.max_psu_length},${caseItem.max_gpu_length}, ${caseItem.max_cpu_height})">Add</button></td>
        `;
        caseTableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching case data:', error));
}

let selectedCaseMaxCpuCoolerHeight = null;
let selectedCaseSupportedFormFactor=null;
// Function to add the selected case to the build
function addCaseToBuild(manufacturer, name, volume, motherboardSupport, supportedPsuFormFactors, maxPsuLength, max_gpu_length, max_cpu_height) {
  const caseRow = document.getElementById('caseRow'); // Target the correct case row

  if (!caseRow) {
    console.error('Error: Case row not found!');
    return;
  }

  // Update the row with the case information
  caseRow.innerHTML = `
    <td>Case</td>
    <td>${manufacturer} ${name} (${volume ? volume + ' L' : 'N/A'})</td>
    <td>RP 0</td>
    <td><a href="#">Link</a></td>
    <td><button onclick="removeCase()">X</button></td>
  `;
  console.log("Max CPU Cooler Height for selected case:", max_cpu_height);
  // Ensure motherboardSupport is an array and split it only if it's a string
  if (typeof motherboardSupport === 'string') {
    selectedCaseSupportedFormFactor = motherboardSupport.split(', ');
  } else if (Array.isArray(motherboardSupport)) {
    selectedCaseSupportedFormFactor = motherboardSupport; // Already an array
  } else {
    selectedCaseSupportedFormFactor = []; // Fallback to empty array if not a string or array
  }
  selectedCaseMaxCpuCoolerHeight=max_cpu_height;
  selectedCasePsuFormFactor = supportedPsuFormFactors || '';  // Ensure formFactor is passed as a string or empty
  selectedCasePsuLength = maxPsuLength || 0; // Storing max PSU length
  selectedCaseMaxGpuLength = max_gpu_length;  // Corrected variable name to match the function parameter
 
  document.getElementById('caseModal').style.display = 'none'; // Close modal after adding
  
  performAllChecks();  // Perform all checks after adding the case
}




// Function to remove the case from the PC build
function removeCase() {
  const caseRow = document.getElementById('caseRow'); // Target the correct case row

  if (!caseRow) {
    console.error('Error: Case row not found!');
    return;
  }

  // Reset the row content back to the "Pick your Case" state
  caseRow.innerHTML = `
    <td>Case</td>
    <td><button id="caseButton">Pick your Case</button></td>
    <td>RP 0</td>
    <td><a href="#">Link</a></td>
    <td><button>X</button></td>
  `;
 
  selectedCaseSupportedFormFactor = null;
  selectedCasePsuFormFactor = null;  // Ensure formFactor is passed as a string or empty
  selectedCasePsuLength = null; // Storing max PSU length
  selectedCaseMaxGpuLength = null;
  selectedCaseMaxCpuCoolerHeight = null;
  // Re-assign the event listener for the "Pick your Case" button
  const caseButton = document.getElementById('caseButton');
  if (caseButton) {
    caseButton.onclick = openCaseModal;
  } else {
    console.error('Error: Case button not found');
  }
  resetCompatibilityStatus();
performAllChecks();
}

// Function to open the case modal
function openCaseModal() {
  document.getElementById('caseModal').style.display = 'block'; // Show case modal
}

// Function to close the modal when user clicks outside
window.onclick = function(event) {
  const modal = document.getElementById('caseModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Function to close the modal
document.querySelectorAll('.close').forEach(closeBtn => {
  closeBtn.onclick = function () {
    const modal = this.closest('.modal');
    modal.style.display = 'none'; // Hide modal
  };
});

// Search function to filter case table based on user input (case-insensitive)
function searchCase() {
  const input = document.getElementById('caseSearch').value.toLowerCase(); // Convert search input to lowercase
  const caseTableRows = document.querySelectorAll('#case-table tbody tr');

  caseTableRows.forEach(row => {
    const rowText = row.textContent.toLowerCase(); // Convert row text to lowercase for case-insensitive comparison
    row.style.display = rowText.includes(input) ? '' : 'none'; // Show or hide rows based on search input
  });
}

// Initialize event listener on page load
document.addEventListener('DOMContentLoaded', function() {
  const caseButton = document.getElementById('caseButton');
  if (caseButton) {
    caseButton.onclick = openCaseModal;
  }

  fetchCases(); // Fetch case data on page load
});
