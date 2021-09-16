/**
 * Check if the form has all the properties needed to create a new item(reservation or table)
 * @param  {...any} properties 
 * @returns 
 */
function hasProperties(...properties) {
    return function (req,res,next) {
        const { data = {}} = req.body;

        try {
            properties.forEach((property) => {
                if (!data.property) {
                    const error = new Error(`A '${property}' property is required `);
                    error.status = 400;
                    throw error;
                }
            });
            next();
        } catch (error) {
            next()
        }
    }
}