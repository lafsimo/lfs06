function caricaFile(input) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
        const righe = reader.result.split("\n");
        const tabella = document.getElementById("tabellaCsv");
        tabella.innerHTML = "";
        const anni = [];
        const sbarchi = [];

        for (let i = 0; i < righe.length; i++) {
            const valori = righe[i].split(",");
            for (let j = 0; j < valori.length; j++) {
                valori[j] = valori[j].replace(/"/g, '').trim();
            }
            const rigaTabella = document.createElement("tr");
            for (let j = 0; j < valori.length; j++) {
                let cella;
                if (i === 0) {
                    cella = document.createElement("th");
                } else {
                    cella = document.createElement("td");
                }
                cella.textContent = valori[j];
                rigaTabella.appendChild(cella);
                if (i > 0) {
                    if (j === 0) anni.push(parseInt(valori[j]));
                    if (j === 1) sbarchi.push(parseInt(valori[j]));
                }
            }
            tabella.appendChild(rigaTabella);
        }

        disegnaGrafico(anni, sbarchi);
    };
}

function disegnaGrafico(anni, sbarchi) {
    const canvas = document.getElementById("grafico");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const margine = 50;
    const larghezza = canvas.width - 2 * margine;
    const altezza = canvas.height - 2 * margine;
    const maxSbarchi = Math.max(...sbarchi);
    const passoX = larghezza / (anni.length - 1);
    const scalaY = altezza / maxSbarchi;

    ctx.beginPath();
    ctx.moveTo(margine, canvas.height - margine);
    ctx.lineTo(canvas.width - margine, canvas.height - margine);
    ctx.moveTo(margine, canvas.height - margine);
    ctx.lineTo(margine, margine);
    ctx.stroke();

    ctx.beginPath();
    for (let i = 0; i < anni.length; i++) {
        const x = margine + i * passoX;
        const y = canvas.height - margine - sbarchi[i] * scalaY;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.strokeStyle = "#2980b9";
    ctx.lineWidth = 2;
    ctx.stroke();

    for (let i = 0; i < anni.length; i++) {
        const x = margine + i * passoX;
        ctx.fillStyle = "#2c3e50";
        ctx.fillText(anni[i], x - 10, canvas.height - margine + 15);
    }
    for (let i = 0; i <= maxSbarchi; i += 10000) {
        const y = canvas.height - margine - i * scalaY;
        ctx.fillText(i, margine - 40, y + 5);
    }
}
