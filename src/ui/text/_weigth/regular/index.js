import React from 'react'
import {cnText} from "../../text";
import {withBemMod} from "@bem-react/core";
import './style.css'

const withWeightRegular = withBemMod(cnText(), { weight: 'regular' },
  (WrappedComponent) => (
    ({ weight, ...props }) => <WrappedComponent {...props} />
  )
);

withWeightRegular.propTypes = {
  weight:'regular'
};

export default withWeightRegular