import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import useGetOneCarRental from "../../hooks/useGetOneCarRental";
import { useParams } from 'react-router-dom'



const Caresoul = () => {
  const {id} = useParams()

 let getOneCarRental = useGetOneCarRental(id)

//  console.log(getOneCarRental);



let images = getOneCarRental?.busImage?.map(img=>{
  return {
      original:img,
      thumbnail:img,
    }
})
    



  return (
    <>
    <div className="  w-2/3 ">

<ImageGallery
  items={images ?? []}
  renderItem={(item) => (
    <div className="flex justify-center">
      <img
        src={item.original}
        alt={item.description}
        style={{
        // border:'1px solid red',
        maxWidth: "100%", 
        borderRadius: "10px",
        aspectRatio:'3/2',
        width: "100%",
        height:'400px' ,
        objectFit: "contain",
        }}
      />
    </div>
  )}
  
  renderThumbInner={(item) => (
    
    <div className="">  
      <img
        src={item.thumbnail}
        alt={item.description || ""}
        style={{ 
          width: "100px",
          height: "100px",
          objectFit: "contain",
          borderRadius: "4px"  // Optional: Add border radius
        }}
      />
    </div>
  )}



showFullscreenButton={false}
  showNav={false}
thumbnailPosition='left'
showPlayButton={false}
/>

    </div>
    
    </>
  )
}

export default Caresoul