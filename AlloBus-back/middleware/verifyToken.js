let jwt=require('jsonwebtoken')


let auth=(req,res,next)=>{
    const token = req.headers.authorization;
    // console.log('token middleware >',token)

    if (!token) {
        return res.json({ message: 'Token manquant ou invalide' });
      }
      try {
        const decoded = jwt.verify(token, 'supersecretjwtkey');
        req.decoded = decoded; 
        next(); 
      } catch (err) {
        console.log(err)
        return res.json({ message: 'Token invalide ou expiré' });
      }
}

module.exports=auth