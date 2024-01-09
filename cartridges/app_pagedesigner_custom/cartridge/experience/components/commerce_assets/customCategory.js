'use strict';
/* global response */

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');
//category.description, .displayName, .ID, .image.url

/**
 * Render logic for storefront.productTile component.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge (must be serializable). This will not be passed in by Commerce Cloud Platform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();

    var content = context.content;

    var newCategoryObject = {};
    var choosenCategory = content.category;

    if (choosenCategory) {
        newCategoryObject.id = choosenCategory.ID;
        newCategoryObject.name = choosenCategory.displayName;

        if (content.categoryShortDescription) {
            newCategoryObject.description = content.categoryShortDescription;
        } else {
            newCategoryObject.description = choosenCategory.description;
        }

        // custom image:
        if (content.categoryImage) {
            newCategoryObject.image = ImageTransformation.getScaledImage(content.categoryImage);
        } else if (choosenCategory.custom.slotBannerImage.url) {
            // catalog image:
            // newCategoryObject.imageURL = choosenCategory.custom.slotBannerImage.getURL().toString();
            newCategoryObject.image = ImageTransformation.getScaledImage(choosenCategory.custom.slotBannerImage);
        }
 
        // newCategoryObject.imageURL = ImageTransformation.getScaledImage(choosenCategory.custom.slotBannerImage.getURL());
        // if (choosenCategory.image) {
        //     newCategoryObject.imageURL = ImageTransformation.getScaledImage(choosenCategory.image); 
        // }
        

        newCategoryObject.url = URLUtils.url('Search-Show', 'cgid', choosenCategory.ID).toString();

        newCategoryObject.ctaTitle = content.categoryCtaTitle;
        newCategoryObject.ctaTitlePosition = content.categoryCtaTitlePosition;
    }
    model.category = newCategoryObject;
    
    var contentCatImage = content.categoryImage;
    var check = model;
    // instruct 24 hours relative pagecache
    var expires = new Date();
    expires.setDate(expires.getDate() + 1); // this handles overflow automatically
    response.setExpires(expires);
    // no need for vary-by as the template is rendered as remote include

    return new Template('experience/components/commerce_assets/customCategory').render(model).text;
};
