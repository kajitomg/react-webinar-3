import React from 'react'
import {cnText} from "../../text";
import {withBemMod} from "@bem-react/core";
import './style.css'

const withSizeM = withBemMod(cnText(), { size: 'm' },
    (WrappedComponent) => (
      ({ size, ...props }) => <WrappedComponent {...props} />
    )
);

withSizeM.propTypes = {
  size:'m'
};

export default withSizeM