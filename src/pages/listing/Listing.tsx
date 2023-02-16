import { useNavigate, useSearchParams } from "react-router-dom";
import classes from "./Listing.module.scss";
import { useEffect, useRef, useState } from "react";
import { Image } from "../../components/image/Image";
import axios from "axios";

export const Listing = () => {
  const authToken = "Bearer " + localStorage.getItem("token");
  const navigate = useNavigate();

  let url = document.URL;
  if (url.includes("?")) {
    url = url.split("?")[1];
  }

  const checkforEdit = () => {
    let url = document.URL;
    if (url.includes("?")) {
      url = url.split("?")[1];
      return url;
    } else {
      return false;
    }
  };

  const [isForEdit, setIsForEdit] = useState(checkforEdit());
  const [editInfo, setEditInfo] = useState<any>({});

  const mainPhotoInputRef = useRef<HTMLInputElement | null>(null);
  const additionalPhotosInputRef = useRef<HTMLInputElement | null>(null);

  const [mainPhoto, setMainPhoto] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");

  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  const handleMainPhotoClick = () => {
    if (mainPhotoInputRef.current) {
      mainPhotoInputRef.current.click();
    }
  };

  const handleAdditionalPhotosClick = () => {
    if (additionalPhotosInputRef.current) {
      additionalPhotosInputRef.current.click();
    }
  };

  const [mainPhotoFile, setMainPhotoFile] = useState<File | undefined>();
  const [additionalPhotosFile, setAdditionalPhotosFile] = useState<File[]>([]);

  const handleMainPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainPhotoFile(file);
      setMainPhoto(file.name);
    }
  };

  const handleAdditionalPhotosChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files) {
      setAdditionalPhotosFile((prevFiles) => [
        ...prevFiles,
        ...Array.from(files).map((file: File) => file),
      ]);
    }
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

  const photosSubmit = async () => {
    const headers = {
      Authorization: authToken,
    };

    const formData = new FormData();
    const photos = [mainPhotoFile, ...additionalPhotosFile];
    photos.forEach((photo: File) => {
      return formData.append("images", photo);
    });

    try {
      const response = await axios.post(
        "https://automania.herokuapp.com/file/upload",
        formData,
        {
          headers,
        }
      );
      const urls = response.data.payload.map((image: any) => image.url);
      setPhotoUrls(urls);
      return urls;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const photoUrls = await photosSubmit();

    const headers = {
      "Content-Type": "application/json",
      Authorization: authToken,
    };

    const formData = new FormData();
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
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const photoUrls = await photosSubmit();

    const headers = {
      "Content-Type": "application/json",
      Authorization: authToken,
    };

    const data = {
      brand: brand ? brand : editInfo.brand,
      model: model ? model : editInfo.model,
      price: price ? price : editInfo.price,
      mainPhoto: photoUrls[0] ? photoUrls[0] : editInfo.mainPhoto,
      additionalPhotos:
        photoUrls.length > 1 ? photoUrls.slice(1) : editInfo.additionalPhotos,
    };

    if (isForEdit) {
      axios
        .put(`https://automania.herokuapp.com/listing/${isForEdit}`, data, {
          headers,
        })
        .then((response) => {
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post("https://automania.herokuapp.com/listing/create", data, {
          headers,
        })
        .then((response) => {
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    if (isForEdit) {
      axios
        .get(`https://automania.herokuapp.com/listing/${isForEdit}`)
        .then((response) => {
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

        <div className={`${classes.btnDesktop} btn`} onClick={handleSubmit}>
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
                  big={true}
                />
              ) : (
                <div
                  className={`${classes.photoBtn} btn photoBtn`}
                  onClick={handleMainPhotoClick}
                >
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
                  className={`${classes.photoBtn} btn photoBtn`}
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
        <div className={`${classes.btnMobile} btn`} onClick={handleSubmit}>
          Save Listing
        </div>
      </form>
    </div>
  );
};
