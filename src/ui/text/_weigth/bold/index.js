import React from 'react'
import {cnText} from "../../text";
import {withBemMod} from "@bem-react/core";
import './style.css'

const withWeightBold = withBemMod(cnText(), { weight: 'bold' },
  (WrappedComponent) => (
    ({ weight, ...props }) => <WrappedComponent {...props} />
  )
);

withWeightBold.propTypes = {
  weight:'bold'
};

export default withWeightBold