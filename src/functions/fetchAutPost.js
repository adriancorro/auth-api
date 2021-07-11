
// Authorization": "Bearer"

const fetchAutPost= (token)  => new Promise(function(resolve) {
 
    fetch('/user/auth', {
      method: 'POST',
      headers: {
          "Authorization": `Bearer ${token}`
      }
  }) 
    .then(res => {
      if (!res) {
        throw new Error(`HTTP error ! status : ${res.ok}`);
      } else {
        return res.json();
      }
    })
    .then(data => {
      if(!data.error){
        resolve(data)
       /* INVESTIGAR SI ESTO ES TAN NECESARIO AQUI  debemos primero esperar que data sea resuelto, luego se le asignara a localStorage IsAuthenticated
        el valor de data. Sin el resolve localStorage IsAuthenticated seria igual a null */
        localStorage.setItem('IsAuthenticated', data.isAuthenticated)
        console.log(data)
        console.log(`aut fetch Status dataStatus.isAuthenticated: ${data}`)
      }else{
        console.log(data)
        resolve(data.error)
        localStorage.setItem('isAuthenticated', data.isAuthenticated);
      }
    })
    .catch(e => console.log(e));   
  })
  
  
  export default fetchAutPost;