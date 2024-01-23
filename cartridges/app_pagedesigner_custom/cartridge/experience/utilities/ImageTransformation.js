var MediaFile = require('dw/content/MediaFile');
var base = module.superModule;


/**
 * Return an object containing the scaled image for mobile, table and desktop.  Other included image details
 * are: alt text, focalPoint x, focalPoint y.
 *
 * @param {Image} image the image for which to be scaled.
 * @param {Object} The object containing the scaled image
 *
 * @return {string} The Absolute url
 */
base.getScaledImage = function (image) {
    var imageFile = image instanceof MediaFile ? image : image.file;
    if (image instanceof MediaFile) {
        return {
            src: {
                mobile: base.url(imageFile, { device: 'mobile' }),
                tablet: base.url(imageFile, { device: 'tablet' }),
                desktop: base.url(imageFile, { device: 'desktop' })
            },
            alt: imageFile.getAlt(),
            focalPointX: '100%',
            focalPointY: '100%'
        };
    } else {
        return {
            src: {
                mobile: base.url(imageFile, { device: 'mobile' }),
                tablet: base.url(imageFile, { device: 'tablet' }),
                desktop: base.url(imageFile, { device: 'desktop' })
            },
            alt: imageFile.getAlt(),
            focalPointX: (image.focalPoint.x * 100) + '%',
            focalPointY: (image.focalPoint.y * 100) + '%'
        };
    }
    
};

module.exports = base;
