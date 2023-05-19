import React from 'react'
import {cnText} from "../../text";
import {withBemMod} from "@bem-react/core";
import './style.css'

const withSizeS = withBemMod(cnText(), { size: 's' },
    (WrappedComponent) => (
      ({ size, ...props }) => <WrappedComponent {...props} />
    )
);

withSizeS.propTypes = {
  size:'s'
};

export default withSizeS