import { useNavigate, useSearchParams } from "react-router-dom";
import classes from "./Listing.module.scss";
import { useEffect, useRef, useState } from "react";
import { Image } from "../../components/image/Image";
import axios from "axios";

export const Listing = () => {
  const authToken = "Bearer " + localStorage.getItem("token");
  const navigate = useNavigate();

  let url = document.URL;
  console.log("url", url);
  if (url.includes("?")) {
    url = url.split("?")[1];
  }
  console.log("url2", url);

  const checkforEdit = () => {
    let url = document.URL;
    if (url.includes("?")) {
      url = url.split("?")[1];
      return url;
    } else {
      return false;
    }
  };

  const [isForEdit, setIsForEdit] = useState(checkforEdit);
  const [editInfo, setEditInfo] = useState<any>({});

  // const [searchParams, setSearchParams] = useSearchParams();
  // let params = serializeFormQuery(event.target);
  // setSearchParams(params);
  // console.log("searchParams", searchParams);

  const mainPhotoInputRef = useRef(null);
  const additionalPhotosInputRef = useRef(null);

  const [mainPhoto, setMainPhoto] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");

  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  const handleMainPhotoClick = () => {
    if (mainPhotoInputRef.current) {
      (mainPhotoInputRef.current as HTMLInputElement).click();
    }
  };

  const handleAdditionalPhotosClick = () => {
    if (additionalPhotosInputRef.current) {
      (additionalPhotosInputRef.current as HTMLInputElement).click();
    }
  };

  const [mainPhotoFile, setMainPhotoFile] = useState(undefined);
  const [additionalPhotosFile, setAdditionalPhotosFile] = useState<File[]>([]);

  const handleMainPhotoChange = (e: any) => {
    const file = e.target.files[0];
    setMainPhotoFile(file);
    setMainPhoto(file.name);
  };

  const handleAdditionalPhotosChange = (e: any) => {
    const files = e.target.files;
    setAdditionalPhotosFile((prevFiles: any) => [
      ...prevFiles,
      ...Array.from(files).map((file: any) => file.name),
    ]);
    console.log(additionalPhotosFile);
  };

  const handleRemoveImage = (index: number) => {
    setAdditionalPhotosFile((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleRemoveMainPhoto = () => {
    setMainPhoto("");
    setMainPhotoFile(undefined);
  };

  const photosSubmit = (e: any) => {
    console.log("photosSubmit");
    e.preventDefault();

    const headers = {
      Authorization: authToken,
    };

    const formData = new FormData();
    console.log("mainPhotoFile", mainPhotoFile);
    console.log("additionalPhotosFile", additionalPhotosFile);
    const photos = [mainPhotoFile, ...additionalPhotosFile];
    photos.forEach((photo: any) => {
      return formData.append("images", photo);
    });

    axios
      .post("https://automania.herokuapp.com/file/upload", formData, {
        headers,
      })
      .then((response) => {
        const urls = response.data.payload.map((image: any) => image.url);
        setPhotoUrls(urls);
        console.log("urls", urls);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    photosSubmit(e);

    const data = {
      brand,
      model,
      price,
      mainPhoto: photoUrls[0],
      additionalPhotos: photoUrls.splice(1),
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: authToken,
    };

    axios
      .post("https://automania.herokuapp.com/listing/create", data, {
        headers,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (isForEdit) {
      axios
        .get(`https://automania.herokuapp.com/listing/${isForEdit}`)
        .then((response) => {
          console.log("RESPONSEEE", response.data.payload);
          setEditInfo(response.data.payload);

          const putData = {
            brand: brand ? brand : response.data.payload.brand,
            model: model ? model : response.data.payload.model,
            price: price ? price : response.data.payload.price,
          };
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <div className={classes.listing}>
      <header className={classes.header}>
        <div className="row">
          <div className={classes.x}>
            <img
              src="Images/x-black.svg"
              alt=""
              onClick={() => {
                navigate("/");
              }}
            />
          </div>

          <h4>{isForEdit ? "Edit" : "New"} Listing</h4>
        </div>

        <div className="btn" onClick={handleSubmit}>
          Save Listing
        </div>
      </header>

      <form action="" className="form">
        <div className="formGroup">
          <h5>General Information</h5>

          <div className="formRow">
            <div className="input">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                id="brand"
                className="field"
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
                defaultValue={isForEdit ? editInfo.brand : ""}
              />
            </div>

            <div className="input">
              <label htmlFor="model">Model</label>
              <input
                type="text"
                id="model"
                className="field"
                onChange={(e) => {
                  setModel(e.target.value);
                }}
                defaultValue={isForEdit ? editInfo.model : ""}
              />
            </div>

            <div className="input inputSmall">
              <label htmlFor="price">Price</label>
              <div className={classes.fieldWrapper}>
                <input
                  type="text"
                  id="price"
                  className="field"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  defaultValue={isForEdit ? editInfo.price : ""}
                />

                <div className={classes.currency}>BGN</div>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.line}></div>

        <div className="formGroup">
          <h5>Photos</h5>

          <div className={classes.buttons}>
            <div className="input small">
              <label htmlFor="model">Main Photo</label>
              {mainPhoto ? (
                <Image
                  name={mainPhoto && mainPhoto}
                  onClick={() => handleRemoveMainPhoto()}
                />
              ) : (
                <div className="btn photoBtn" onClick={handleMainPhotoClick}>
                  <input
                    type="file"
                    accept="image/*"
                    id="photo"
                    ref={mainPhotoInputRef}
                    onChange={handleMainPhotoChange}
                  />
                  <img src="Images/plus-blue.svg" alt="" />
                  <span>Upload</span>
                </div>
              )}
            </div>

            <div className="input large">
              <label htmlFor="model">Additional Photos</label>
              <div className={classes.pictures}>
                <div
                  className="btn photoBtn"
                  onClick={handleAdditionalPhotosClick}
                >
                  <img src="Images/plus-blue.svg" alt="" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    id="additional-photos"
                    ref={additionalPhotosInputRef}
                    onChange={handleAdditionalPhotosChange}
                    multiple
                  />
                </div>
                {additionalPhotosFile.map((file: any, index) => (
                  <Image
                    key={file}
                    name={file}
                    onClick={() => handleRemoveImage(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
