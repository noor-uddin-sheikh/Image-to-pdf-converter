let imgElement = [];

document.getElementById('upload').addEventListener('click', function () {
    document.getElementById('fileInput').click();
})

document.getElementById('fileInput').addEventListener('change', function (event) {
    const files = event.target.files;

    const showImg = document.getElementById('showImg');
    showImg.innerHTML = "";

    imgElement = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        imgElement.push(img);
        showImg.appendChild(img);

    }

});

document.getElementById('convert').addEventListener('click', async function pdfDown() {

    if (imgElement.length === 0) {
        alert('select an image first to convert to pdf');
        return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    for (let i = 0; i < imgElement.length; i++) {
        const img = imgElement[i];

        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');

        if (i > 0) {
            pdf.addPage()
        }
        pdf.addImage(imageData, 10, 10, 200, 180);
        URL.revokeObjectURL(imgElement.src);
    }

    // pdf.addImage(imgElement, 'JPEG', 10, 10, 180, 160);
    // pdf.save('ConvertedToPDF.pdf');

    pdf.save('ImageToPdf.pdf')

});
