//used to make http requests from node.js
const axios = require('axios');

/* // reposAction function to get all (public & private) repositories of user from github.
First it will check, username or password fileds are empty or not.
If empty it will send error message if not, it will the pass next function.
axios is used to Make http requests from node.js to github api.
username and password are wrong then it will return the error response. 
If got through, all the data will come to 'response' field.
After that it will pass the required data to the corresponding fields.
*/
exports.reposAction=(req,res)=>{

    let user_id=req.body.username;
    let user_password=req.body.password;
     
    if(!user_id || !user_password){

        res.status(401).json({'message':'Requires authentication'});
        return;
    }

    //to get all(public & private) repositories of github user & authentication
    axios.get('https://api.github.com/user/repos',{
        auth: {
          username: user_id,
          password: user_password
        }
    })
    .then((response)=>{

        res.status(200).json({'data':{
            total_repositories:response.data.length,
            data:response.data
        }
        });
        return;

    }).catch((error)=>{

        res.status(401).json(error.response.data);
        return;
    })
};

/* //paginationAction function to get all(public & private) repos with pagination.
first it will check, username or password fileds are empty or not.
if empty it will send error message.if not, it will pass the next function.
In this paginationAction it has two api requests.
first api request to get all the total repositories.
In the first api async & await function was declared to stop excuting the next api request.
Once total repositories counts then the next axios request will execute.
If authentication failed then it passes error response.
Got through,it will pass the required data to corresponding fields.
*/
exports.paginationAction = async(req,res)=>{

    let user_id=req.body.username;
    let user_password=req.body.password;

    let page=req.body.page?req.body.page:1;
    let per_page=req.body.limit?req.body.limit:10;
    
    if(!user_id || !user_password){
        res.status(401).json({'message':'Requires authentication'});
        return;
    }
    
    //make total as global variable &  to find out total repositories
    let total;
    try {

        total = await axios.get('https://api.github.com/user/repos',{
        auth:{
            username:user_id,
            password:user_password
        }
        });
    } catch (error) {
        res.status(401).json(error.response.data);
        return;
        
    }
    
    //fetch all repositories & pagination
    axios.get('https://api.github.com/user/repos?page='+page+'&per_page='+per_page,{
        auth:{
            username:user_id,
            password:user_password
        }
    })
    .then((response)=>{

        if(response.data.length){

            let prev = "http://localhost:3000/pagination?page="+(+page-1)+"&per_page="+per_page;

            if(+page===1){
                prev=null
            }

            let next ="http://localhost:3000/pagination?page="+(+page+1)+"&per_page="+per_page;

            if(+page===Math.ceil(total.data.length/per_page)){
                next=null
            }

            let first_page="http://localhost:3000/pagination?page=1&per_page="+per_page;

            let last_page="http://localhost:3000/pagination?page="+(Math.ceil(total.data.length/per_page))+"&per_page="+per_page;
            
        res.status(200).json({'data':{
                page_no:page,
                total_repositories:total.data.length,
                data:response.data,
                prev ,next,
                first_page,
                last_page

          }});
          return;
        }
        else{
            res.status(404).json({'message':'Not found'});
            return;
        }
    })
    .catch((error)=>{

        res.status(401).json(error.response.data);
        return;
    })
};
