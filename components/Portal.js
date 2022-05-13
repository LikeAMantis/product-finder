import { createPortal } from "react-dom";

const Portal = ({ children, targetContainer }) => {
    return targetContainer ? createPortal(children, targetContainer) : children;
};
export default Portal;
