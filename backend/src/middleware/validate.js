const validate = (schema) => async (req, res, next) => {
    // try {
    //   const parseBody = await schema.parseAsync(req.body);
    //   req.body = parseBody;
    //  next();
    // } catch (err) {
    //   const status = 422;
    //   const message = "Fill the input properly";
    //   // const extraDetails = err.issues.map((curElem) => curElem.message+'\n');
    //   const extraDetails =err.errors[0].message
  
    //   const error = {
    //     status,
    //     message,
    //     extraDetails,
    //   };
  
    // //   next(extraDetails);
    // // const errMessage  = err.errors[0].message
    // // console.log(errMessage);
    // // res.status(400).json({msg:errMessage})
    // next(error)
    // }
    try {
      const parse = await schema.parseAsync(req.body);
      req.body = parse;
      next();
  } catch (error) {
      console.log(error);
      return res.status(400).json({
          success: false,
          message : error.errors.map(obj=>obj.message)
      })
  }
  };
  
  module.exports = validate;