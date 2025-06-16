

export let setLocalStorage =(key,value)=>{
      localStorage.setItem(key,JSON.stringify(value))
}


export let getLocalStorage =(key)=>{
      try {
            const data = localStorage.getItem(key);
           
            return data ? JSON.parse(data) : null;
          } catch (error) {
            console.error("Error parsing localStorage data:", error);
            return null;
          }
      
}


export let removeLocalStorage =(key)=>{
      localStorage.removeItem(key)
}