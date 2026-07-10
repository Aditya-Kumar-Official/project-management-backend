import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/async-handler.js';

// const healthCheck=(req,res)=>{
//     try{
//         res.status(200)
//         .json(new ApiResponse(200, {status: "ok"}, "Server is running fine"));

//     }
//     catch(err){
//         next(err)
//     }
// }

const healthCheck = asynHandler(async (req, res, next) => {
  res
    .status(200)
    .json(new ApiResponse(200, { status: 'ok' }, 'Server is running fine'));
});
