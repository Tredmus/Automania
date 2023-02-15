export const shortenImageName = (imageName: string) => {
  if (imageName.length > 18) {
    const extension = imageName.slice(-4);
    const shortenedName = imageName.slice(0, 12) + ".." + extension;
    return shortenedName;
  } else {
    return imageName;
  }
};
