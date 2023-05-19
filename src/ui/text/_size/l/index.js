import React from 'react'
import {cnText} from "../../text";
import {withBemMod} from "@bem-react/core";
import './style.css'

const withSizeL = withBemMod(cnText(), { size: 'l' },
    (WrappedComponent) => (
      ({ size, ...props }) => <WrappedComponent {...props} />
    )
);

withSizeL.propTypes = {
  size:'l'
};

export default withSizeL