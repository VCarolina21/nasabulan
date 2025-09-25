const apiKey = "SihQNkCr2m6fVHvMaTsxHKcnI0bsa2LsyfZxTFTl";

function formatDate(isoDate) {
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
}

document.addEventListener("DOMContentLoaded", () => {
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("tanggal").value = today;
});

async function getAPOD() {
    const dateInput = document.getElementById("tanggal").value;
    let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    if (dateInput) {
        url += `&date=${dateInput}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        const mediaDiv = document.getElementById("gambar");
        mediaDiv.innerHTML = "";

        document.getElementById("judul").innerText = data.title;
        document.getElementById("tanggalText").innerText = `Tanggal: ${formatDate(data.date)}`;
        document.getElementById("penjelasan").innerText = data.explanation;

        const copyrightEl = document.getElementById("copyright");
        copyrightEl.innerText = data.copyright
        ? `Copyright: ${data.copyright}`
        : "Copyright: Public Domain / NASA";

        if (data.media_type === "image") {
        const img = document.createElement("img");
        img.src = data.url;
        img.alt = data.title;
        img.style.maxWidth = "100%";
        mediaDiv.appendChild(img);
        }
        
        else if (data.media_type === "video") {
        const iframe = document.createElement("iframe");
        iframe.src = data.url.includes("youtube.com/watch")
            ? data.url.replace("watch?v=", "embed/")
            : data.url;
        iframe.width = "100%";
        iframe.height = "450";
        iframe.setAttribute("allowfullscreen", "");
        mediaDiv.appendChild(iframe);
        }
    }
    
    catch (error) {
        console.error("Error fetching APOD:", error);
        alert("Gagal mengambil data dari NASA API. Cek console untuk detail error.");
    }
}