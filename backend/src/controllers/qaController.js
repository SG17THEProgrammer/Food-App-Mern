const qa = require("../models/qaSchema");


const getQuestion =async (req, res) => {
    try {
        const allquestions = await qa.find();
        if(!allquestions) 
             res.status(400).json({msg:"Questions not found"});

        res.status(200).json({ques:allquestions});

    } catch (error) {
        console.log(error)
        res.status(404).json({msg:"Error in fetching api"});

    }
  };
  

  module.exports ={getQuestion}