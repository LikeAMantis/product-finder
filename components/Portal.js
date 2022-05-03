import { createPortal } from "react-dom";

const Portal = ({ children, portalRef }) => {
    return portalRef ? createPortal(children, portalRef.current) : children;
};
export default Portal;
