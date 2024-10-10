import { recognize } from 'tesseract.js';

window.addEventListener('load', () => {
    (async () => {
        // Select the captcha image element by its ID
        const imgElement = document.getElementById('ContentPlaceHolder1_imgCaptcha');
        
        // Wait for the image to load completely
        await new Promise((resolve) => {
            if (imgElement.complete) {
                resolve();
            } else {
                imgElement.onload = resolve;
            }
        });

        // Create a canvas to draw the image
        const canvas = document.createElement('canvas');
        canvas.width = imgElement.clientWidth;
        canvas.height = imgElement.clientHeight;
        const ctx = canvas.getContext('2d');
        
        // Draw the image onto the canvas
        ctx.drawImage(imgElement, 0, 0, imgElement.clientWidth, imgElement.clientHeight);
        const image = canvas.toDataURL();

        // Select the input field for the captcha text
        const input = document.getElementById('ContentPlaceHolder1_txtCaptcha');

        // Use Tesseract.js to recognize text from the image
        recognize(image, 'eng', {logger: e => console.log(e)})
            .then(out => {
                // Set the recognized text into the input field
                input.value = out.data.text.trim();
            })
            .catch(err => {
                // Log any errors during recognition
                console.error("Error during recognition:", err);
            });
    })();
});