 /**
 * Utility method for setting the relative page cache to expire after 24 hours.
 * @param {dw.system.Response} response - The response object to set the cache on.
 */
var pageCache = {
    setPageRelativeCache: function (response) {
        var expires = new Date();
        expires.setDate(expires.getDate() + 1); // this handles overflow automatically
        response.setExpires(expires);
    }
};

module.exports = pageCache;