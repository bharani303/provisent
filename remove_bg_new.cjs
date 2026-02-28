const { Jimp } = require('jimp');

async function removeBlackBg() {
    try {
        const image = await Jimp.read('public/logo-dark-original.jpeg');

        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            const red = this.bitmap.data[idx + 0];
            const green = this.bitmap.data[idx + 1];
            const blue = this.bitmap.data[idx + 2];

            // The image is black background with white logo. Make close to black transparent.
            if (red < 35 && green < 35 && blue < 35) {
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
