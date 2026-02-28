const { Jimp } = require('jimp');

async function removeBlackBg() {
    try {
        const image = await Jimp.read('public/logo-dark.jpg');

        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            // idx is the index of the Red component for pixel at (x, y)
            const red = this.bitmap.data[idx + 0];
            const green = this.bitmap.data[idx + 1];
            const blue = this.bitmap.data[idx + 2];

            // If the pixel is close to black (threshold can be adjusted)
            if (red < 35 && green < 35 && blue < 35) {
                // Set alpha to 0 (transparent)
                this.bitmap.data[idx + 3] = 0;
            }
        });

        await image.write('public/logo-dark.png');
        console.log('Background removed successfully: public/logo-dark.png');
    } catch (err) {
        console.error('Error processing image:', err);
    }
}

removeBlackBg();
