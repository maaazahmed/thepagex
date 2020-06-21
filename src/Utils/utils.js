import defaultProfile from '../image/default-profile.png';
export const getImageFullUrl = (imageUrl) => {
  if(imageUrl){
    const pic = imageUrl.toLowerCase();
    if(pic.endsWith('.png') || pic.endsWith('.jpg') || pic.endsWith('.jpeg')){
      return `${"http://167.172.166.24:3000"}/${imageUrl.replace('\\','/')}`; 
    }
  }
  return defaultProfile;
}
  