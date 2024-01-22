'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var pageCache = require('*/cartridge/experience/utilities/pageCache.js');
/**
 * Render logic for the component.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    model.title = context.content.title;
    model.image = {
        url: context.content.image.file.url
    };
    model.alt = context.content.alt;
    model.shortDescription = context.content.shortDescription;
    model.ctaTitle = context.content.ctaTitle;

    // instruct 24 hours relative pagecache
    pageCache.setPageRelativeCache(response);

    return new Template('experience/components/commerce_assets/heroSlider').render(model).text;
};
