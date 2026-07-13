import { ApiResponse } from '../utils/ApiResponse.js';
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

const healthCheck = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .json(new ApiResponse(200, { status: 'ok' }, 'Server is running fine'));
});

export { healthCheck };
