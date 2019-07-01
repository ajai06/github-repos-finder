
Run the API testing tool

1.To get all the public and private repositories of github user.

link: http://localhost:3000/repos

  method : POST

Required property

  username : string
  password : password

If its authenticated user
 
(i) total repositories
(ii) all repositories (public & private)

______________________________________________________________________________________________________________________

2. To get all the pulic and private repositories of github user with pagination.

link: http://localhost:3000/pagination

 method : POST

Required property

 username : string
 password : password

Opional property

  page : number
  limit : number    (default limit value = 10) (limit=per page)

If its authenticated user

(i) page no:
(ii) total repositories
(iii) all repositories are displayed according to the default limit or page / limit or page specified by user
(iv) prev link , next link , first page link , last page link.


