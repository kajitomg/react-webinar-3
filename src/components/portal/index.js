import React, {  useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from "prop-types";


function Portal(props) {

  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    }
  }, [])

  return ReactDOM.createPortal(props.children, container);
}

Portal.propTypes = {
  children: PropTypes.node
}


export default React.memo(Portal);