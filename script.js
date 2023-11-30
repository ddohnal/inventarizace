const separator = "#";
const list = [12, 63, 82, 100, 109, 145];
function handleFile() {
    const fileInput = document.getElementById('fileInput');
    const fileContentDisplay = document.getElementById('fileContent');

    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const fileContent = e.target.result;
            fileContentDisplay.textContent = fileContent;




            // Procházení obsahu řádek po řádku
            const lines = fileContent.split('\n');
            // let separator = lines[0][0];
            // let list = [];

            // lines[0].split('').forEach((item, index) => {
            //     console.log(`${item} at ${index}`);
            //     if (item == "x") {
            //         list.push(index);
            //     }
            // });
            // console.log(list)
            // Procházení každého řádku a vložení "#" na nalezené indexy
            lines.forEach((line, lineIndex) => {
                if (lineIndex > 0) {
                    const lineArray = line.split('');
                    list.forEach(index => {
                        if (lineArray[index]) {
                            lineArray[index] = separator;
                        }
                    });
                    lines[lineIndex] = lineArray.join('');
                }


            });
            const resultContent = lines.slice(1).join('\n');;

            saveFile(resultContent, 'result.txt', 'text/plain;charset=UTF-8');

            lines.forEach((line, index) => {
                console.log(`Line ${index + 1}: ${line}`);

                // Zde můžete dělat cokoli s každým řádkem
            });
        };

        // Nastavení kódování na Windows-1250
        reader.readAsText(file, 'windows-1250');
    } else {
        fileContentDisplay.textContent = 'No file selected';
    }
}



function saveFile(content, fileName, contentType) {
    const blob = new Blob([content], { type: contentType });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}
