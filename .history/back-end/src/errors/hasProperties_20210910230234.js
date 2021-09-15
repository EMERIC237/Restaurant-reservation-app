/**
 * Check if the form has all the properties needed to create a new item(reservation or table)
 * @param  {...any} properties 
 * @returns 
 */
function hasProperties(...properties) {
    return function (req,res,next) {
        const { data = {}} = req.body;

        try {
            properties.forEach((property){

            })
        } catch (error) {
            
        }
    }
}