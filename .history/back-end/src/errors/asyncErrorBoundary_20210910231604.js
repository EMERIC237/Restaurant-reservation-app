function asyncErrorBoundary(delegate, defaultStatus) {
    return(req,res,next) =>{
        Promise.resolve()
        .then(()=>delegate(req,res,next))
        .catch(())
    }
}
