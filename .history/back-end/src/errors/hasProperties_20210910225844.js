/**
 * Check if the form has all the properties needed to create a new item(r)
 * @param  {...any} properties 
 * @returns 
 */
function hasProperties(...properties) {
    return function (req,res,next) {
        const { data = {}} = req.body;

    }
}