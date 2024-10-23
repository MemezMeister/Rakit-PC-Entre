// Fetch the prebuild details based on query parameters
function fetchPrebuildDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const pcName = urlParams.get('pcName');

    console.log(`Fetching details for PC: ${pcName}`); // Log the fetched pcName

    fetch(`get_prebuild_details.php?pcName=${pcName}`) // Get details for the specific PC
        .then(response => response.json())
        .then(data => {
            console.log("PCs found:", data); // Log the array of PCs

            // Find the specific prebuild by PCName
            const prebuild = data.find(pc => pc.PCName === pcName);

            if (!prebuild) {
                console.error("No prebuild data found for this PC.");
                return;
            }

            console.log("Prebuild found:", prebuild);  // Log the selected prebuild object

            // Populate the details page with prebuild data
            document.getElementById('pc-name').textContent = prebuild.PCName || "N/A";
            document.getElementById('pc-price').textContent = prebuild.Price ? `Rp ${prebuild.Price}` : "N/A";
            document.getElementById('pc-cpu').textContent = prebuild.CPU || "N/A";
            document.getElementById('pc-cooler').textContent = prebuild.Cooler || "N/A";
            document.getElementById('pc-mobo').textContent = prebuild.Mobo || "N/A";
            document.getElementById('pc-ram').textContent = prebuild.Ram || "N/A";
            document.getElementById('pc-ssd').textContent = prebuild.SSD || "N/A";
            document.getElementById('pc-psu').textContent = prebuild.PSU || "N/A";
            document.getElementById('pc-case').textContent = prebuild.Casing || "N/A";
            document.getElementById('pc-gpu').textContent = prebuild.GPU || "N/A";
            document.getElementById('pc-peripheral').textContent = prebuild.Peripheral || "N/A";

            // Load the image directly from the Prebuilds folder
            const cleanedImage = prebuild.pictures ? prebuild.pictures.trim() : '';
            const imagePath = `/Rakit-PC-Entre/Prebuilds/${cleanedImage}`;
            console.log("Image path:", imagePath);  // Log the image path

            // Load the image
            const pcImage = document.getElementById('pc-picture');
            pcImage.src = imagePath;
            pcImage.onerror = () => console.error("Image not found:", imagePath);
            // Set WhatsApp button link
            const waLink = `https://wa.me/628111813255?text=Halo%20saya%20tertarik%20dengan%20${prebuild.PCName}`;
            document.getElementById('buy-now').onclick = () => {
                window.open(waLink, '_blank');
            };
        })
        .catch(error => console.error('Error fetching prebuild details:', error));
}

// Fetch the details when the page loads
window.onload = fetchPrebuildDetails;
