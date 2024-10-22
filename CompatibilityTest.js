let selectedCpuSocket = null;
let selectedMotherboardSocket = null;
let selectedCpuPcieGen = null;
let selectedMotherboardPcieGen = null;
let potentialIssues = []; 

// Compatibility check function to test CPU and Motherboard sockets
async function checkCpuMotherboardCompatibility() {
  const compatibilityStatusEl = document.getElementById('compatibility-status');
  const subheaderEl = document.querySelector('.subheader');

  // Clear existing status classes
  subheaderEl.classList.remove('compatibles', 'potential-issues', 'incompatibles', 'unknown');

  // If both CPU and Motherboard sockets are selected, check compatibility
  if (selectedCpuSocket && selectedMotherboardSocket) {
    if (selectedCpuSocket === selectedMotherboardSocket) {
      subheaderEl.classList.add('compatibles');  // Apply compatible class
      compatibilityStatusEl.textContent = "Compatibility: Compatible";
      subheaderEl.removeAttribute('title');
      return true;  // Compatible, continue
    } else {
      subheaderEl.classList.add('incompatibles');  // Apply incompatible class
      compatibilityStatusEl.textContent = "Compatibility: CPU and Motherboard are not compatible";
      subheaderEl.title = "Your CPU and Motherboard are not compatible. Please select a CPU or motherboard with the same socket.";
      return false;  // Incompatibility found, stop further checks
    }
  }
  return true;  // Continue if only one is selected
}

// VRM core compatibility check
async function checkVrmCoreCompatibility() {
  const compatibilityStatusEl = document.getElementById('compatibility-status');
  const subheaderEl = document.querySelector('.subheader');

  // Clear any existing status classes and potential issues
  subheaderEl.classList.remove('compatibles', 'potential-issues', 'incompatibles');
  potentialIssues = []; // Reset the potential issues list

  // Check if both CPU cores and motherboard VRM core count are selected
  if (selectedCpuCores && selectedMotherboardVCoreVRM) {
    // Calculate the 1.5x VRM threshold
    const vrmThreshold = selectedMotherboardVCoreVRM * 1.5;

    if (selectedCpuCores <= selectedMotherboardVCoreVRM) {
      // CPU core count is less than or equal to VRM count, it's compatible
      subheaderEl.classList.add('compatibles');
      compatibilityStatusEl.textContent = "Compatibility: Compatible";
      return true;
    } else if (selectedCpuCores <= vrmThreshold) {
      // CPU core count is within 1.5x the VRM, still compatible
      subheaderEl.classList.add('compatibles');
      compatibilityStatusEl.textContent = "Compatibility: Compatible";
      return true;
    } else {
      // CPU core count exceeds 1.5x the VRM, potential issue
      subheaderEl.classList.add('potential-issues');
      compatibilityStatusEl.innerHTML = `
        Potential Issues found
        <span class="issue-icon">!</span>
        <span class="issue-tooltip">${potentialIssues.join('<br>')}</span>
      `;
      potentialIssues.push(`Your CPU (${selectedCpuCores} cores) may be too powerful for your motherboard's VRM (${selectedMotherboardVCoreVRM} phases). Consider a motherboard with a higher VRM count.`);
      return true;
    }
  }      return true;
}



// PCIe Gen compatibility check
async function checkPcieGenCompatibility() {
  const compatibilityStatusEl = document.getElementById('compatibility-status');
  const subheaderEl = document.querySelector('.subheader');

  // Extract the first digit of the PCIe Gen for CPU, GPU, and Motherboard
  const cpuPcieGen = selectedCpuPcieGen ? parseInt(selectedCpuPcieGen.toString().charAt(0)) : null;
  const gpuPcieGen = selectedGpuPcieGen ? parseInt(selectedGpuPcieGen.toString().charAt(0)) : null;
  const motherboardPcieGen = selectedMotherboardPcieGen ? parseInt(selectedMotherboardPcieGen.toString().charAt(0)) : null;

  if (cpuPcieGen && gpuPcieGen && motherboardPcieGen) {
    if (cpuPcieGen > motherboardPcieGen && gpuPcieGen === cpuPcieGen) {
      potentialIssues.push("Motherboard may bottleneck GPU due to lower PCIe version.");
      subheaderEl.classList.add('potential-issues');  // Apply potential issues class
      compatibilityStatusEl.textContent = "Potential Issues found";
      return true;
    } else if (cpuPcieGen > motherboardPcieGen && cpuPcieGen > gpuPcieGen) {
      subheaderEl.classList.add('compatibles');  // Apply compatible class
      compatibilityStatusEl.textContent = "Compatibility: PCIe version is compatible.";
      return true;
    } else if (cpuPcieGen > motherboardPcieGen && cpuPcieGen > gpuPcieGen) {
      subheaderEl.classList.add('compatibles');  // Apply compatible class
      compatibilityStatusEl.textContent = "Compatibility: PCIe version is compatible.";
      return true;
    } else if (cpuPcieGen < gpuPcieGen && cpuPcieGen < motherboardPcieGen) {
      potentialIssues.push("CPU PCIe version may bottleneck both the motherboard and GPU.");
      subheaderEl.classList.add('potential-issues');  // Apply potential issues class
      compatibilityStatusEl.textContent = "Potential Issues found";
      return true;
    } else if (cpuPcieGen >= gpuPcieGen && motherboardPcieGen >= gpuPcieGen) {
      subheaderEl.classList.add('compatibles');  // Apply compatible class
      compatibilityStatusEl.textContent = "Compatibility: PCIe version is compatible.";
      return true;
    }
  }
  return true;  // Continue with other checks if there's a potential issue
}
function getFormFactorAsInteger(formFactor) {
  // Convert to string to avoid errors
  const formFactorStr = String(formFactor).toLowerCase();

  if (formFactorStr === 'e-atx') {
    return 4; // E-ATX
  } else if (formFactorStr === 'atx') {
    return 3; // ATX
  } else if (formFactorStr === 'm-atx') {
    return 2; // m-ATX
  } else if (formFactorStr === 'itx') {
    return 1; // ITX
  } else {
    return 0; // Unknown or unsupported form factor
  }
}

async function checkCaseCompatibility() {
  const compatibilityStatusEl = document.getElementById('compatibility-status');
  const subheaderEl = document.querySelector('.subheader');

  // Clear existing status classes
  subheaderEl.classList.remove('compatibles', 'potential-issues', 'incompatibles');

  // Log the selected motherboard and case form factor (as integers)
  console.log("Selected Motherboard Form Factor (integer):", selectedMotherboardFormFactor);
  console.log("Selected Case Supported Form Factor (integer):", selectedCaseSupportedFormFactor);

  // Get the motherboard and case form factor numbers using the updated function
  const motherboardFormFactorInt = getFormFactorAsInteger(selectedMotherboardFormFactor);
  const caseFormFactorInt = getFormFactorAsInteger(selectedCaseSupportedFormFactor);
  console.log("Selected Motherboard Form Factor (integer):", motherboardFormFactorInt);
  console.log("Selected Case Supported Form Factor (integer):", caseFormFactorInt);
  // Ensure valid form factors are selected for both motherboard and case
  if (motherboardFormFactorInt && caseFormFactorInt) {
    // If the motherboard's form factor number is greater than the case's, it's incompatible
    if (motherboardFormFactorInt > caseFormFactorInt) {
      // Incompatible
      console.log("Mobo big case mall");
      subheaderEl.classList.add('incompatibles');
      compatibilityStatusEl.textContent = "Compatibility: The motherboard form factor is not supported by the case.";
      subheaderEl.title = "Please select a case that supports your motherboard's form factor.";
      return false;
      
    } else if (motherboardFormFactorInt < caseFormFactorInt){
      // Compatible
      console.log("Mobo small case big");
      subheaderEl.classList.add('compatibles');
      compatibilityStatusEl.textContent = "Compatibility: Compatible.";
      subheaderEl.removeAttribute('title');
      return true;
    }
  } else {
    console.log("Missing motherboard or case form factor information.");
    return true;
  }
  return true;
}

function getPsuFormFactorAsInteger(psuFormFactor) {
  if (!psuFormFactor || typeof psuFormFactor !== 'string') {
    console.error('Invalid PSU form factor:', psuFormFactor);
    return null;
  }

  psuFormFactor = psuFormFactor.toLowerCase();  // Safely convert to lowercase

  if (psuFormFactor === 'e-atx') {
    return 4;
  } else if (psuFormFactor === 'atx') {
    return 3;
  } else if (psuFormFactor === 'sfx-l') {
    return 2;
  } else if (psuFormFactor === 'sfx') {
    return 1;
  } else {
    console.error('Unknown PSU form factor:', psuFormFactor);
    return null;
  }
}
async function checkPsuCaseCompatibility() {
  const compatibilityStatusEl = document.getElementById('compatibility-status');
  const subheaderEl = document.querySelector('.subheader');

  // Clear existing status classes
  subheaderEl.classList.remove('compatibles', 'potential-issues', 'incompatibles');

  // Get the PSU and Case PSU form factors as integers
  const psuFormFactorInt = getPsuFormFactorAsInteger(selectedPsuFormFactor);
  const casePsuFormFactorInt = getPsuFormFactorAsInteger(selectedCasePsuFormFactor);
  console.log("Selected PSU Form Factor (integer):", psuFormFactorInt);
  console.log("Selected Case PSU Form Factor (integer):", casePsuFormFactorInt);

  // Ensure valid PSU and case form factors are selected
  if (psuFormFactorInt && casePsuFormFactorInt) {
    if (psuFormFactorInt <= casePsuFormFactorInt) {
      // Check if both PSU and Case support ATX or higher, then check PSU length
      if (psuFormFactorInt >= 3 && casePsuFormFactorInt >= 3) {
        // Perform additional check for PSU length vs. case max PSU length
        if (selectedPsuLength > selectedCaseMaxPsuLength) {
          // PSU is too long for the case
          subheaderEl.classList.add('incompatibles');
          compatibilityStatusEl.textContent = "Compatibility: PSU is too long for the case.";
          subheaderEl.title = `The selected PSU (${selectedPsuLength}mm) exceeds the case's max PSU length (${selectedCaseMaxPsuLength}mm).`;
          console.log("PSU is too long for the case.");
          
          potentialIssues.push("PSU too long for case");
          return false;  // This will stop further checks
        }
      }
      // PSU and case form factors are compatible
      subheaderEl.classList.add('compatibles');
      compatibilityStatusEl.textContent = "Compatibility: PSU and case are compatible.";
      subheaderEl.removeAttribute('title');
      console.log("PSU and case are compatible.");
      return true;
    } else {
      // Incompatible, PSU form factor doesn't fit in the case
      subheaderEl.classList.add('incompatibles');
      compatibilityStatusEl.textContent = "Compatibility: PSU form factor is not compatible with the case.";
      subheaderEl.title = "Please select a PSU with a form factor that fits the case.";
      console.log("PSU form factor is not compatible with the case.");
      return false;
    }
  }

  console.log("No PSU or Case PSU form factor selected for compatibility check.");
  return true; // Return true if not applicable
}


async function checkGpuLengthCompatibility() {
  const compatibilityStatusEl = document.getElementById('compatibility-status');
  const subheaderEl = document.querySelector('.subheader');

  // Clear existing status classes
  subheaderEl.classList.remove('compatibles', 'potential-issues', 'incompatibles');

  // Ensure both GPU length and case max GPU length are available for comparison
  if (selectedGpuLength && selectedCaseMaxGpuLength) {
    console.log(`Selected GPU Length: ${selectedGpuLength}mm`);
    console.log(`Case Max GPU Length: ${selectedCaseMaxGpuLength}mm`);

    if (selectedGpuLength > selectedCaseMaxGpuLength) {
      // GPU is too long for the case
      subheaderEl.classList.add('incompatibles');
      compatibilityStatusEl.textContent = "Compatibility: GPU is too long for the case.";
      subheaderEl.title = `The selected GPU (${selectedGpuLength}mm) exceeds the case's max GPU length (${selectedCaseMaxGpuLength}mm).`;
      console.log("GPU is too long for the case.");
      return false;  // Mark as incompatible and stop further checks
    } else {
      // GPU and case are compatible
      subheaderEl.classList.add('compatibles');
      compatibilityStatusEl.textContent = "Compatibility: GPU and case are compatible.";
      subheaderEl.removeAttribute('title');
      console.log("GPU and case are compatible.");
      return true;  // Mark as compatible
    }
  } else {
    console.log("No GPU length or case max GPU length provided for comparison.");
  }

  return true;  // Return true if not applicable
}
async function checkCpuCoolerCompatibility() {
  const compatibilityStatusEl = document.getElementById('compatibility-status');
  const subheaderEl = document.querySelector('.subheader');

  // Clear existing status classes
  subheaderEl.classList.remove('compatibles', 'potential-issues', 'incompatibles');

  // Ensure that both the CPU cooler and motherboard socket are selected
  if (selectedMotherboardSocket && selectedCoolerSupportedSockets) {
    const isCompatible = selectedCoolerSupportedSockets[selectedMotherboardSocket.toLowerCase()] === 1;

    if (isCompatible) {
      // Compatible
      subheaderEl.classList.add('compatibles');
      compatibilityStatusEl.textContent = "Compatibility: CPU cooler is compatible with the motherboard.";
    } else {
      // Incompatible
      subheaderEl.classList.add('incompatibles');
      compatibilityStatusEl.textContent = "Compatibility: CPU cooler is not compatible with the motherboard socket.";
      subheaderEl.title = "Please select a CPU cooler that supports your motherboard's socket.";
    }
  } else {
  }
  return true;
}
async function checkRamCompatibility() {
  const compatibilityStatusEl = document.getElementById('compatibility-status');
  const subheaderEl = document.querySelector('.subheader');

  // Clear existing status classes
  subheaderEl.classList.remove('compatibles', 'potential-issues', 'incompatibles');
  console.log("Checking RAM compatibility...");
  console.log("Selected RAM Type:", selectedRamType);
  console.log("Selected Motherboard RAM Type:", selectedMotherboardRamType);
  // Check if both RAM and motherboard RAM types are selected
  if (selectedRamType && selectedMotherboardRamType) {
    if (selectedRamType.toLowerCase() === selectedMotherboardRamType.toLowerCase()) {
      // Compatible
      subheaderEl.classList.add('compatibles');
      compatibilityStatusEl.textContent = "Compatibility: RAM type is compatible with the motherboard.";
      return true;
    } else {
      // Incompatible
      subheaderEl.classList.add('incompatibles');
      compatibilityStatusEl.textContent = "Compatibility: RAM type is not compatible with the motherboard.";
      return false;
    }
  }

  // If either RAM or motherboard is missing, assume unknown status
  console.log("Missing RAM or motherboard type for compatibility check.");
  return true; // Continue checks if this one is not applicable
}
async function checkCpuCoolerRamClearanceCompatibility() {
  const compatibilityStatusEl = document.getElementById('compatibility-status');
  const subheaderEl = document.querySelector('.subheader');

  // Clear existing status classes
  subheaderEl.classList.remove('compatibles', 'potential-issues', 'incompatibles');

  // Log current values
  console.log("Checking CPU Cooler RAM clearance vs RAM height...");
  console.log("RAM Height:", selectedRamHeight);
  console.log("CPU Cooler RAM Clearance:", selectedCpuCoolerClearance);

  // If both values are null, return true and do not set any status
  if (selectedRamHeight === null && selectedCpuCoolerClearance === null) {
    console.log("Both RAM height and CPU cooler clearance are unknown.");
    return true;  // Continue with other checks without setting compatibility status
  }

  // If one of the values is null, add potential issue but continue
  if (selectedRamHeight === null || selectedCpuCoolerClearance === null) {
    subheaderEl.classList.add('potential-issues');
    compatibilityStatusEl.textContent = "Potential Issue: Unknown RAM height or cooler clearance. Please check both parts.";
    subheaderEl.title = "Please ensure that the RAM height and CPU cooler clearance are known and compatible.";
    potentialIssues.push("Unknown RAM height or cooler clearance.");
    console.log("Potential issue: Unknown RAM height or cooler clearance.");
    return true;  // Continue with other checks
  

  // If both values are available, compare the height and clearance
  }else if (selectedRamHeight > selectedCpuCoolerClearance) {
    // RAM height is too large for cooler clearance
    subheaderEl.classList.add('incompatibles');
    compatibilityStatusEl.textContent = "Compatibility: RAM height exceeds CPU cooler clearance.";
    subheaderEl.title = `The selected RAM height (${selectedRamHeight}mm) exceeds the CPU cooler's clearance (${selectedCpuCoolerClearance}mm).`;
    console.log("Incompatible: RAM height exceeds CPU cooler clearance.");
    return false;  // Stop further checks, as it is incompatible
  } else {
    // RAM fits under the cooler
    subheaderEl.classList.add('compatibles');
    compatibilityStatusEl.textContent = "Compatibility: RAM height is compatible with CPU cooler clearance.";
    subheaderEl.removeAttribute('title');
    console.log("Compatible: RAM height is within CPU cooler clearance.");
    return true;  // Continue to the next checks
  }
}


// Function to run all checks and stop if an incompatibility is found
async function performAllChecks() {
  potentialIssues = [];  // Clear the list of potential issues

  // Check CPU and Motherboard compatibility
  const isCpuMotherboardCompatible = await checkCpuMotherboardCompatibility();
  if (!isCpuMotherboardCompatible) return;  // Stop further checks if incompatible

  // Check VRM core compatibility
  const isVrmCompatible = await checkVrmCoreCompatibility();
  if (!isVrmCompatible) return;  // Stop further checks if incompatible

  // Check PCIe Generation compatibility
  const isPcieCompatible = await checkPcieGenCompatibility();
  if (!isPcieCompatible) return;  // Stop further checks if incompatible

  // Check case compatibility
  const isCaseCompatible = await checkCaseCompatibility();
  if (!isCaseCompatible) return;  // Stop further checks if incompatible
  const isPsuCaseCompatible = await checkPsuCaseCompatibility();
  if (!isPsuCaseCompatible) return;  // Stop further checks if incompatible
  const isGpuLengthCompatible = await checkGpuLengthCompatibility();
  if (!isGpuLengthCompatible) return; 
  const isRamCompatible = await checkRamCompatibility();
  if (!isRamCompatible) return;  // Stop further checks if incompatible
  const isCpuCoolerCompatible = await checkCpuCoolerCompatibility();
  if (!isCpuCoolerCompatible) return; 
  const isRamCoolerCompatible = await checkCpuCoolerRamClearanceCompatibility();
  if (!isRamCoolerCompatible) return;  // Stop further checks if incompatible

  // Final update to display compatibility or potential issues
  updateFinalCompatibilityStatus(potentialIssues.length > 0);
}



// Function to update final compatibility status
// Function to toggle the visibility of the issues popup
function toggleIssuesPopup() {
  const popup = document.getElementById('issues-popup');
  popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
}

// Final status update function with potential issues button
function updateFinalCompatibilityStatus(hasPotentialIssues) {
  const subheaderEl = document.querySelector('.subheader');
  const compatibilityStatusEl = document.getElementById('compatibility-status');
  const issuesButton = document.getElementById('issues-button');
  const issuesPopup = document.getElementById('issues-popup');

  // Clear previous status
  subheaderEl.classList.remove('compatibles', 'potential-issues', 'incompatibles');

  if (potentialIssues.length === 0) {
      console.log("No potential issues found, system is compatible.");
      subheaderEl.classList.add('compatibles');  // Apply compatible class
      compatibilityStatusEl.textContent = "Compatibility: Compatible";
      issuesButton.style.display = 'none';  // Hide the button when no issues
      issuesPopup.style.display = 'none';   // Also hide the popup if no issues
  } else {
      console.log("Potential issues found: ", potentialIssues);
      subheaderEl.classList.add('potential-issues');  // Apply potential issues class
      compatibilityStatusEl.textContent = "Potential Issues found";
      
      // Show the issues button and display issues in the popup
      issuesButton.style.display = 'inline-flex';  // Show the circular button

      // Populate the popup with issues
      issuesPopup.innerHTML = potentialIssues.map(issue => `<p>${issue}</p>`).join('');
  }
}
document.getElementById('issues-button').addEventListener('click', () => {
  const issuesPopup = document.getElementById('issues-popup');
  issuesPopup.style.display = (issuesPopup.style.display === 'none' || issuesPopup.style.display === '') ? 'block' : 'none';
});

// Hide popup when clicking outside of it
window.addEventListener('click', (event) => {
  const issuesPopup = document.getElementById('issues-popup');
  const issuesButton = document.getElementById('issues-button');
  if (!issuesButton.contains(event.target) && !issuesPopup.contains(event.target)) {
    issuesPopup.style.display = 'none';
  }
});
function resetCompatibilityStatus() {
  const compatibilityStatusEl = document.getElementById('compatibility-status');
  const subheaderEl = document.querySelector('.subheader');
  const issuesButton = document.getElementById('issues-button');  // Hide issues button on reset
  const issuesPopup = document.getElementById('issues-popup');    // Hide issues popup on reset

  // Clear existing status classes
  if (subheaderEl) {
    subheaderEl.classList.remove('compatibles', 'potential-issues', 'incompatibles');
  }

  // Reset compatibility status text
  if (compatibilityStatusEl) {
    compatibilityStatusEl.textContent = "Compatibility: Unknown"; 
  }

  // Clear title and hide issues elements
  if (subheaderEl) {
    subheaderEl.title = "";
  }
  
  if (issuesButton) {
    issuesButton.style.display = 'none';  // Hide the circular button on reset
  }

  if (issuesPopup) {
    issuesPopup.style.display = 'none';   // Hide the issues popup on reset
  }
}