import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

function UploadImage() {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);

  const uploadImage = (image, setProduct) => {
    const fileName = uuidv4() + "-" + image.label + "-" + image.file.name;
    const storageRef = ref(storage, "images/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, image.file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setIsLoading(true);
      },
      (err) => {
        setIsLoading(false);
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setProduct((prev) => {
            return { ...prev, img: url };
          });
          setCount((prev) => prev + 1);
          setIsLoading(false);
        });
      }
    );
  };
  return { uploadImage, isLoading, count };
}

export default UploadImage;
