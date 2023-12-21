// newsUtils.ts
import { useHistory } from "react-router-dom";

export const openImageModalF = (imageUrl: string, setSelectedImage: Function, setShowModal: Function) => {
  setSelectedImage(imageUrl);
  setShowModal(true);
};

export const closeModalF = (setShowModal: Function) => {
  setShowModal(false);
};

export const handleModalContentClickF = (e: React.MouseEvent) => {
  e.stopPropagation();
};


export const redirectToFarmerProfileF = (farmerId: string) => {
  const history = useHistory();
  console.log("id: ", farmerId);
  history.push({
    pathname: `/farmers/producteurs/${farmerId}`,
    state: { farmerId: farmerId },
  });
};
