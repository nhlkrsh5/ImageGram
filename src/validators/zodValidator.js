export const validator = (schema) => {
    return async (req,res,next) => {
        try {
            console.log(req.body);
            
            schema.parse(req.body);
        } catch (error) {
            return res.json({
                success: false,
                message: "Validation error",
                error: error.errors,
            })
        }
    }
}